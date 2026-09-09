import { test as base, expect } from "@playwright/test";

const APP_URL = "http://localhost:5173";
const API_URL = "http://localhost:3001/api/equipment";

type EquipmentFixtures = {
   createdEquipment: { id: number; name: string };
   newEquipmentName: string;
};

const test = base.extend<EquipmentFixtures>({
   createdEquipment: async ({ request }, use) => {
      const name = `E2E Equipment ${Date.now()}`;
      const res = await request.post(API_URL, {
         data: {
            name,
            category: "E2E Model",
            status: "rented",
         },
      });

      const created = await res.json();

      await use({ id: created.id, name: created.name });

      await request.delete(`${API_URL}/${created.id}`);
   },
   newEquipmentName: async ({ page, request }, use) => {
      const name = `E2E Equipment ${Date.now()}`;
      const created = page.waitForResponse(
         (response) =>
            response.url() === API_URL &&
            response.request().method() === "POST" &&
            response.ok(),
      );

      await use(name);

      const res = await created;
      const { id } = await res.json();
      await request.delete(`${API_URL}/${id}`);
   },
});

test("user can see equipment", async ({ page }) => {
   await page.goto(APP_URL);

   await expect(page.getByText("Excavator")).toBeVisible();
});

test("user can add equipment", async ({ page, newEquipmentName }) => {
   await page.goto(APP_URL);

   const nameInput = page.getByRole("textbox", { name: "name" });
   const categoryInput = page.getByRole("textbox", { name: "category" });
   const statusOption = page.getByRole("combobox", { name: "status" });
   const submitButton = page.getByRole("button", { name: "Add equipment" });

   await nameInput.fill(newEquipmentName);
   await categoryInput.fill("E2E Model");
   await statusOption.selectOption({ label: "rented" });

   await submitButton.click();

   const newEquipment = page.getByRole("listitem", { name: newEquipmentName });

   await expect(newEquipment).toBeVisible();
});

test("user can delete equipment", async ({ page, createdEquipment }) => {
   await page.goto(APP_URL);

   const equipment = page.getByRole("listitem", {
      name: createdEquipment.name,
   });
   const removeButton = equipment.getByRole("button");

   await removeButton.click();

   await expect(equipment).not.toBeVisible();
});
