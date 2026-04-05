import { useState, useEffect, useRef } from "react";

const AddTransaction = ({ onClose, onSave, editData }) => {

  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

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
      <div ref={modalRef} className="bg-white dark:bg-[#121614] p-6 rounded-xl w-96">

        <h2 className="text-lg font-bold dark:text-gray-100">
          {editData ? "Edit" : "Add"} Transaction
        </h2>

        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">
          Fill the details to add the transaction
        </p>

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="border border-gray-300 dark:border-gray-700 p-2 w-full mb-2 rounded-lg dark:text-gray-100"
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="border border-gray-300 dark:border-gray-700 dark:text-gray-100 p-2 w-full mb-2 rounded-lg"
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border border-gray-300 dark:border-gray-700 p-2 w-full mb-2 rounded-lg bg-white
          dark:text-gray-100 dark:bg-[#121614]"
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
          className="border border-gray-300 dark:border-gray-700 dark:bg-[#121614] p-2 w-full mb-2 rounded-lg
          bg-white dark:text-gray-100"
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
          className="border border-gray-300 dark:border-gray-700 dark:text-gray-100 p-2 w-full mb-2 rounded-lg"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-6 py-2 text-gray-600 text-sm bg-white hover:bg-gray-100 transition border
            border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-200 hover:dark:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-6 py-2 bg-green-600 text-sm text-white rounded-lg hover:bg-green-700"
            onClick={() => {
              if (!form.description || !form.amount) {
                alert("Please fill all fields");
                return;
              }
              onSave(form);
            }}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddTransaction;