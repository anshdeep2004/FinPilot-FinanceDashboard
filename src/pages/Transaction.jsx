// import React, { useState, useEffect } from "react";
// import TransactionList from "../components/TransactionList";
// import Filters from "../components/Filters";
// import AddTransaction from "../components/AddTransaction";
// import ConfirmDelete from "../components/ConfirmDelete";
// import { Plus, FileDown } from "lucide-react";

// const Transaction = () => {
  
//   const role = localStorage.getItem("role") || "admin";

//   const [transactions, setTransactions] = useState(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // Save to localStorage (IMPORTANT)
//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const [filters, setFilters] = useState({
//     search: "",
//     category: "all",
//     type: "all",
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [deleteData, setDeleteData] = useState(null);

//   // 🔍 Filtering
//   const filteredTransactions = transactions.filter((t) => {
//     const search = filters.search.toLowerCase();

//     const matchesSearch =
//       t.description.toLowerCase().includes(search) ||
//       t.category.toLowerCase().includes(search) ||
//       t.type.toLowerCase().includes(search);

//     const matchesCategory =
//       filters.category === "all" ||
//       t.category.toLowerCase() === filters.category;

//     const matchesType =
//       filters.type === "all" ||
//       t.type.toLowerCase() === filters.type;

//     return matchesSearch && matchesCategory && matchesType;
//   });

//   // ➕ Add / Edit
//   const handleSave = (data) => {
//     if (role !== "admin") return;
//     if (editData) {
//       // ✅ EDIT using ID
//       setTransactions((prev) =>
//         prev.map((t) =>
//           t.id === editData.id ? { ...data, id: editData.id } : t
//         )
//       );
//       setEditData(null);
//     } else {
//       // ✅ ADD with unique ID
//       const newTransaction = {
//         ...data,
//         id: Date.now(),
//       };
//       setTransactions((prev) => [newTransaction, ...prev]);
//     }
//     setShowModal(false);
//   };

//   // ✏️ Edit click
//   const handleEdit = (t) => {
//     setEditData(t);
//     setShowModal(true);
//   };

//   // 🗑 Delete click
//   const handleDelete = (t) => {
//     setDeleteData(t);
//   };

//   // ✅ Confirm delete using ID
//   const confirmDelete = () => {
//     if (role !== "admin") return;
//     setTransactions((prev) =>
//       prev.filter((t) => t.id !== deleteData.id)
//     );
//     setDeleteData(null);
//   };

//   // 📥 CSV Export
//   const handleExportCSV = () => {
//     const headers = ["Date", "Description", "Category", "Type", "Amount"];

//     const rows = transactions.map((t) => [
//       t.date,
//       t.description,
//       t.category,
//       t.type,
//       t.amount,
//     ]);

//     const csv =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((e) => e.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csv);
//     link.download = "transactions.csv";
//     link.click();
//   };

//   return (
//     <div className="px-6 flex flex-col gap-4 pb-10 dark:bg-gray-950 py-4">

//       {/* Buttons */}
//       <div className="flex flex-col min-[400px]:flex-row gap-4 justify-end">
//         <button
//           onClick={handleExportCSV}
//           className="group flex justify-center items-center gap-2 bg-white text-gray-600 dark:bg-gray-200 
//           border border-gray-300 px-6 py-2 rounded-lg hover:bg-orange-500 text-sm dark-text-gray-300
//           hover:text-white transition-colors duration-200 dark:border-gray-700"
//         >
//           <FileDown size={16} className="group-hover:text-white" />
//           Export CSV
//         </button>

//         {role === "admin" && (
//           <button
//             onClick={() => {
//               setEditData(null);
//               setShowModal(true);
//             }}
//             className="bg-green-600 text-white text-sm px-6 py-2 rounded-lg 
//             hover:bg-green-700 transition-colors duration-200 flex items-center 
//             justify-center gap-2"
//           >
//             <Plus size={16} />
//             Add Transaction
//           </button>
//         )}
//       </div>

//       {/* Filters */}
//       <Filters filters={filters} setFilters={setFilters} />

//       {/* List */}
//       <TransactionList
//         transactions={filteredTransactions}
//         onEdit={role === "admin" ? handleEdit : null}
//         onDelete={role === "admin" ? handleDelete : null}
//       />

//       {/* Modals */}
//       {showModal && (
//         <AddTransaction
//           onClose={() => setShowModal(false)}
//           onSave={handleSave}
//           editData={editData}
//         />
//       )}

//       {deleteData && (
//         <ConfirmDelete
//           onConfirm={confirmDelete}
//           onCancel={() => setDeleteData(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Transaction;


import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import Filters from "../components/Filters";
import AddTransaction from "../components/AddTransaction";
import ConfirmDelete from "../components/ConfirmDelete";
import { Plus, FileDown } from "lucide-react";

const API_URL = "http://localhost:3001/transactions";

const Transaction = () => {
  
  const role = localStorage.getItem("role") || "admin";

  const [transactions, setTransactions] = useState([]);

  // ✅ FETCH from API
  useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const result = Array.isArray(data) ? data : [];
      const sorted = result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setTransactions(sorted);
    })
    .catch(err => {
      console.error("Error fetching:", err);
      setTransactions([]);
    });
}, []);

  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    type: "all",
  });

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  // 🔍 Filtering
  const filteredTransactions = transactions.filter((t) => {
    const search = filters.search.toLowerCase();

    const matchesSearch =
      t.description.toLowerCase().includes(search) ||
      t.category.toLowerCase().includes(search) ||
      t.type.toLowerCase().includes(search);

    const matchesCategory =
      filters.category === "all" ||
      t.category.toLowerCase() === filters.category;

    const matchesType =
      filters.type === "all" ||
      t.type.toLowerCase() === filters.type;

    return matchesSearch && matchesCategory && matchesType;
  });

  // ➕ Add / Edit (API)
  const handleSave = async (data) => {
    if (role !== "admin") return;

    try {
      if (editData) {
        // ✅ UPDATE
        const res = await fetch(`${API_URL}/${editData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, id: editData.id }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const updated = await res.json();

        setTransactions((prev) =>
          prev.map((t) => (t.id === editData.id ? updated : t))
        );

        setEditData(null);
      } else {
        // ✅ CREATE
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const newTransaction = await res.json();

        setTransactions((prev) => [newTransaction, ...prev]);
        
        // Refetch to ensure data consistency
        const refetchRes = await fetch(API_URL);
        if (refetchRes.ok) {
          const refetchedData = await refetchRes.json();
          const result = Array.isArray(refetchedData) ? refetchedData : [];
          const sorted = result.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTransactions(sorted);
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error saving transaction. Please try again.");
    }
  };

  // ✏️ Edit click
  const handleEdit = (t) => {
    setEditData(t);
    setShowModal(true);
  };

  // 🗑 Delete click
  const handleDelete = (t) => {
    setDeleteData(t);
  };

  // ✅ DELETE (API)
  const confirmDelete = async () => {
    if (role !== "admin") return;

    try {
      await fetch(`${API_URL}/${deleteData.id}`, {
        method: "DELETE",
      });

      setTransactions((prev) =>
        prev.filter((t) => t.id !== deleteData.id)
      );

      setDeleteData(null);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // 📥 CSV Export (unchanged)
  const handleExportCSV = () => {
    const headers = ["Date", "Description", "Category", "Type", "Amount"];

    const rows = transactions.map((t) => [
      t.date,
      t.description,
      t.category,
      t.type,
      t.amount,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="px-6 flex flex-col gap-4 pb-10 dark:bg-gray-950 py-4">

      {/* Buttons */}
      <div className="flex flex-col min-[400px]:flex-row gap-4 justify-end">
        <button
          onClick={handleExportCSV}
          className="group flex justify-center items-center gap-2 bg-white text-gray-600 dark:bg-gray-200 
          border border-gray-300 px-6 py-2 rounded-lg hover:bg-orange-500 text-sm dark-text-gray-300
          hover:text-white transition-colors duration-200 dark:border-gray-700"
        >
          <FileDown size={16} className="group-hover:text-white" />
          Export CSV
        </button>

        {role === "admin" && (
          <button
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
            className="bg-green-600 text-white text-sm px-6 py-2 rounded-lg 
            hover:bg-green-700 transition-colors duration-200 flex items-center 
            justify-center gap-2"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <Filters filters={filters} setFilters={setFilters} />

      {/* List */}
      <TransactionList
        transactions={filteredTransactions}
        onEdit={role === "admin" ? handleEdit : null}
        onDelete={role === "admin" ? handleDelete : null}
      />

      {/* Modals */}
      {showModal && (
        <AddTransaction
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          editData={editData}
        />
      )}

      {deleteData && (
        <ConfirmDelete
          onConfirm={confirmDelete}
          onCancel={() => setDeleteData(null)}
        />
      )}
    </div>
  );
};

export default Transaction;