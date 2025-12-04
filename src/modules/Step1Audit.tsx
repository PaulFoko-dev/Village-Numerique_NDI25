// import React, { useState } from "react";

// export interface AuditData {
//   systemCount: number;
//   outdatedSystems: number;
//   budget: number;
// }

// export interface Step1AuditProps {
//   initialData: AuditData;
//   onComplete: (data: AuditData) => void;
// }

// const Step1Audit: React.FC<Step1AuditProps> = ({ initialData, onComplete }) => {
//   const [form, setForm] = useState<AuditData>(initialData);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: Number(value) });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-xl font-bold">Étape 1 : Audit de votre établissement</h2>

//       <div className="flex flex-col space-y-2">
//         <label>Nombre total de systèmes informatiques</label>
//         <input
//           type="number"
//           name="systemCount"
//           value={form.systemCount}
//           onChange={handleChange}
//           className="border rounded px-2 py-1"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label>Nombre de systèmes obsolètes</label>
//         <input
//           type="number"
//           name="outdatedSystems"
//           value={form.outdatedSystems}
//           onChange={handleChange}
//           className="border rounded px-2 py-1"
//         />
//       </div>

//       <div className="flex flex-col space-y-2">
//         <label>Budget informatique disponible (€)</label>
//         <input
//           type="number"
//           name="budget"
//           value={form.budget}
//           onChange={handleChange}
//           className="border rounded px-2 py-1"
//         />
//       </div>

//       <button
//         onClick={() => onComplete(form)}
//         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         Suivant
//       </button>
//     </div>
//   );
// };

// export default Step1Audit;

import React, { useState } from "react";

export type AuditData = {
  systemCount: number;
  outdatedSystems: number;
  budget: number;
};

export interface Step1AuditProps {
  initialData: AuditData;
  onComplete: (data: AuditData) => void;
}

const Step1Audit: React.FC<Step1AuditProps> = ({ initialData, onComplete }) => {
  const [form, setForm] = useState<AuditData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Étape 1 — Audit</h2>
      <p className="text-gray-600">
        Indiquez la taille et la situation matérielle de votre établissement.
      </p>

      <div className="grid grid-cols-1 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Nombre total de systèmes
          </span>
          <input
            name="systemCount"
            type="number"
            min={0}
            value={form.systemCount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Nombre de systèmes obsolètes
          </span>
          <input
            name="outdatedSystems"
            type="number"
            min={0}
            max={form.systemCount || undefined}
            value={form.outdatedSystems}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Budget informatique disponible (€ / an)
          </span>
          <input
            name="budget"
            type="number"
            min={0}
            value={form.budget}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-blue-500 focus:ring"
          />
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            // minor validation: outdated cannot exceed total
            const safeOutdated = Math.min(form.outdatedSystems, form.systemCount || 0);
            onComplete({ ...form, outdatedSystems: safeOutdated });
          }}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Step1Audit;
