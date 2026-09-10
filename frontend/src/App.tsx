import { useEffect, useState } from "react";
import { EquipmentForm } from "./components/EquipmentForm";
import { EquipmentList, type Equipment } from "./components/EquipmentList";
import "./equipment.css";

export const BASE_URL =
   import.meta.env.VITE_API_URL ?? "http://localhost:3001/api/equipment";

function App() {
   const [equipment, setEquipment] = useState<Equipment[]>([]);

   const handleAddEquipment = async (
      name: string,
      category: string,
      status: string,
   ) => {
      try {
         const res = await fetch(BASE_URL, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name,
               category,
               status,
            }),
         });

         if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
         }

         const data = await res.json();

         setEquipment((current) => [...current, data]);
      } catch (error) {
         console.log(error);
         console.error({ error: "Failed to add the equipment" });
      }
   };

   const handleDeleteEquipment = async (id: number) => {
      try {
         const res = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
         });

         if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
         }

         setEquipment((current) => current.filter((item) => item.id !== id));
      } catch (error) {
         console.error("Failed to delete equipment: ", error);
      }
   };

   useEffect(() => {
      const fetchEquipment = async () => {
         try {
            const res = await fetch(BASE_URL);

            if (!res.ok) {
               throw new Error(`HTTP error: ${res.status}`);
            }

            const data = await res.json();

            console.log("fetch: ", data);

            setEquipment(data);
         } catch (error) {
            console.error("Failed to fetch equipment", error);
         }
      };

      fetchEquipment();
   }, []);

   return (
      <main className="equipment-page">
         <h1>Equipment</h1>
         <EquipmentForm
            addEquipment={(name, category, status) =>
               handleAddEquipment(name, category, status)
            }
         />
         <EquipmentList
            equipment={equipment}
            deleteEquipmentFn={(id) => handleDeleteEquipment(id)}
         />
      </main>
   );
}

export default App;
