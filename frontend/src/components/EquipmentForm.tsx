import { useState } from "react";

interface EquipmentFormProps {
   addEquipment: (name: string, category: string, status: string) => void;
}

export function EquipmentForm({ addEquipment }: Readonly<EquipmentFormProps>) {
   const [name, setName] = useState("");
   const [category, setCategory] = useState("");
   const [status, setStatus] = useState("");

   const handleAddEquipment = (event: React.SubmitEvent) => {
      event?.preventDefault();

      addEquipment(name, category, status);
   };

   return (
      <form className="equipment-form" onSubmit={handleAddEquipment}>
         <label>
            Name
            <input
               name="name"
               type="text"
               onChange={(e) => setName(e.target.value)}
            />
         </label>
         <label>
            Category
            <input
               name="category"
               type="text"
               onChange={(e) => setCategory(e.target.value)}
            />
         </label>
         <label>
            Status
            <select
               name="status"
               defaultValue="available"
               onChange={(e) => setStatus(e.target.value)}
            >
               <option value="available">available</option>
               <option value="rented">rented</option>
            </select>
         </label>
         <button type="submit">Add equipment</button>
      </form>
   );
}
