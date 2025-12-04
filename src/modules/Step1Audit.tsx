import React, { useState } from "react";

export interface AuditData {
  systemCount: number;
  outdatedSystems: number;
  budget: number;
}

export interface Step1AuditProps {
  initialData: AuditData;
  onComplete: (data: AuditData) => void;
}

const Step1Audit: React.FC<Step1AuditProps> = ({ initialData, onComplete }) => {
  const [form, setForm] = useState<AuditData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: Number(value) });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Étape 1 : Audit de votre établissement</h2>

      <div className="flex flex-col space-y-2">
        <label>Nombre total de systèmes informatiques</label>
        <input
          type="number"
          name="systemCount"
          value={form.systemCount}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Nombre de systèmes obsolètes</label>
        <input
          type="number"
          name="outdatedSystems"
          value={form.outdatedSystems}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <label>Budget informatique disponible (€)</label>
        <input
          type="number"
          name="budget"
          value={form.budget}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        />
      </div>

      <button
        onClick={() => onComplete(form)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Suivant
      </button>
    </div>
  );
};

export default Step1Audit;
