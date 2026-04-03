// import { useState, useEffect } from "react";

// const AddTransaction = ({ onClose, onSave, editData }) => {
//   const [form, setForm] = useState({
//     date: new Date().toLocaleDateString(),
//     description: "",
//     category: "Groceries",
//     type: "expense",
//     amount: "",
//   });

//   useEffect(() => {
//     if (editData) setForm(editData);
//   }, [editData]);

//   return (
//     <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-xl w-96">
//         <h2 className="text-lg font-bold">
//           {editData ? "Edit" : "Add"} Transaction
//         </h2>
//         <p className="text-gray-600 text-sm font-medium mb-4">Fill the details to add the transaction</p>

//         <input
//           placeholder="Description"
//           value={form.description}
//           onChange={(e) =>
//             setForm({ ...form, description: e.target.value })
//           }
//           className="border p-2 w-full mb-2"
//         />

//         <input
//           placeholder="Amount"
//           type="number"
//           value={form.amount}
//           onChange={(e) =>
//             setForm({ ...form, amount: Number(e.target.value) })
//           }
//           className="border p-2 w-full mb-2"
//         />

//         <div className="flex justify-end gap-10 mt-4">
//           <button className="px-6 py-2 text-gray-600 text-sm bg-white hover:bg-gray-100 transition-colors duration-200 border border-gray-300 rounded-lg" onClick={onClose}>Cancel</button>
//           <button className="px-6 py-2 bg-green-600 text-sm text-white rounded-lg hover:bg-green-700" onClick={() => onSave(form)}>Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddTransaction;

import { useState, useEffect } from "react";

const AddTransaction = ({ onClose, onSave, editData }) => {

  const categories = ["Groceries", "Shopping", "Healthcare", "Entertainment", "Utilities", "Others"];
  const types = ["income", "expense"];

  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0], // better for input type="date"
    description: "",
    category: "Groceries",
    type: "expense",
    amount: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        ...editData,
        date: editData.date || new Date().toISOString().split("T")[0],
      });
    }
  }, [editData]);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-lg font-bold">
          {editData ? "Edit" : "Add"} Transaction
        </h2>

        <p className="text-gray-600 text-sm font-medium mb-4">
          Fill the details to add the transaction
        </p>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="border border-gray-300 p-2 w-full mb-2 rounded-lg"
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border border-gray-300 p-2 w-full mb-2 rounded-lg"
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border border-gray-300 p-2 w-full mb-2 rounded-lg bg-white"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="border border-gray-300 p-2 w-full mb-2 rounded-lg bg-white"
        >
          {types.map((tp, index) => (
            <option key={index} value={tp}>
              {tp.charAt(0).toUpperCase() + tp.slice(1)}
            </option>
          ))}
        </select>

        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: Number(e.target.value) })
          }
          className="border border-gray-300 p-2 w-full mb-2 rounded-lg"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-6 py-2 text-gray-600 text-sm bg-white hover:bg-gray-100 transition border border-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 bg-green-600 text-sm text-white rounded-lg hover:bg-green-700"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTransaction;