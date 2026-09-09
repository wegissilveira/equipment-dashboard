export interface Equipment {
   id: number;
   name: string;
}

interface EquipmentListProps {
   equipment: Equipment[];
   deleteEquipmentFn: (id: number) => void;
}

export function EquipmentList({
   equipment,
   deleteEquipmentFn,
}: Readonly<EquipmentListProps>) {
   return (
      <ul className="equipment-list">
         {equipment.map((item) => (
            <li key={item.id} aria-label={`equipment-list-${item.name}`}>
               <span>{item.name}</span>
               <button type="button" onClick={() => deleteEquipmentFn(item.id)}>
                  Remove
               </button>
            </li>
         ))}
      </ul>
   );
}
