import "@testing-library/jest-dom/vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { EquipmentList } from "./EquipmentList";
import { EquipmentForm } from "./EquipmentForm";
import App from "../App";

const equipment = [
   {
      id: 1,
      name: "Excavator",
      model: "CAT 320",
      status: "available",
   },
   {
      id: 2,
      name: "Bulldozer",
      model: "D6",
      status: "rented",
   },
];

test("displays App", async () => {
   vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => equipment,
   } as Response);

   render(<App />);

   expect(await screen.findByText("Excavator")).toBeInTheDocument();
   expect(await screen.findByText("Bulldozer")).toBeInTheDocument();
});

test("displays equipment", () => {
   render(<EquipmentList equipment={equipment} deleteEquipmentFn={() => {}} />);

   expect(screen.getByText("Excavator")).toBeInTheDocument();
   expect(screen.getByText("Bulldozer")).toBeInTheDocument();
});

test("form is submitted", async () => {
   const user = userEvent.setup();
   const addEquipmentFn = vi.fn();

   render(<EquipmentForm addEquipment={addEquipmentFn} />);

   await user.type(screen.getByLabelText("Name"), "Test equipment");
   await user.type(screen.getByLabelText("Category"), "T5");
   await user.selectOptions(screen.getByRole("combobox"), ["rented"]);

   await user.click(
      screen.getByRole("button", {
         name: "Add equipment",
      }),
   );

   expect(addEquipmentFn).toHaveBeenCalledWith(
      "Test equipment",
      "T5",
      "rented",
   );
});

test("equipment is removed", async () => {
   const user = userEvent.setup();

   render(<App />);

   const equipment = await screen.findByRole("listitem", {
      name: /equipment-list-excavator/i,
   });
   const deleteButton = within(equipment).getByRole("button", {
      name: "Remove",
   });

   await user.click(deleteButton);

   expect(equipment).not.toBeInTheDocument();
});
