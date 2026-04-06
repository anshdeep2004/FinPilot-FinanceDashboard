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

  useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const result = Array.isArray(data) ? data : [];
      const sorted = result.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        // First sort by date descending (newest dates first)
        if (dateA.getTime() !== dateB.getTime()) {
          return dateB - dateA;
        }
        
        // For same dates, sort by createdAt descending (most recent first)
        const timeA = a.createdAt ? new Date(a.createdAt) : new Date(0);
        const timeB = b.createdAt ? new Date(b.createdAt) : new Date(0);
        return timeB - timeA;
      });
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
    month: "all",
  });

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

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

    const matchesMonth =
      filters.month === "all" ||
      new Date(t.date).getMonth() === parseInt(filters.month);

    return matchesSearch && matchesCategory && matchesType && matchesMonth;
  });

  const handleSave = async (data) => {
    if (role !== "admin") return;

    try {
      if (editData) {
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
        
        const refetchRes = await fetch(API_URL);
        if (refetchRes.ok) {
          const refetchedData = await refetchRes.json();
          const result = Array.isArray(refetchedData) ? refetchedData : [];
          const sorted = result.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            
            // First sort by date descending (newest dates first)
            if (dateA.getTime() !== dateB.getTime()) {
              return dateB - dateA;
            }
            
            // For same dates, sort by createdAt descending (most recent first)
            const timeA = a.createdAt ? new Date(a.createdAt) : new Date(0);
            const timeB = b.createdAt ? new Date(b.createdAt) : new Date(0);
            return timeB - timeA;
          });
          setTransactions(sorted);
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error saving transaction. Please try again.");
    }
  };

  const handleEdit = (t) => {
    setEditData(t);
    setShowModal(true);
  };

  const handleDelete = (t) => {
    setDeleteData(t);
  };

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

  const handleExportCSV = () => {
    if (!transactions || transactions.length === 0) {
      alert("Add at least one transaction before exporting.");
      return;
    }

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
    <div className="px-6 flex flex-col gap-4 pb-10 dark:bg-gray-950 py-4 mb-15 min-h-screen">

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

      <Filters filters={filters} setFilters={setFilters} />

      <TransactionList
        transactions={filteredTransactions}
        onEdit={role === "admin" ? handleEdit : null}
        onDelete={role === "admin" ? handleDelete : null}
      />

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