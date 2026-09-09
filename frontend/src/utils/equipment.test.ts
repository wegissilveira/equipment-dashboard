import { describe, it, expect } from "vitest";
import { isValidEquipmentName } from "./equipment";

describe("isValidEquipmentName", () => {
   it("accepts a valida name", () => {
      expect(isValidEquipmentName("Excavator")).toBe(true);
   });

   it("rejects an empty name", () => {
      expect(isValidEquipmentName("")).toBe(false);
   });
});
