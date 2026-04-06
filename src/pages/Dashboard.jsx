import React, { useEffect, useState } from "react";
import MyBalance from "../components/MyBalance";
import AddTransaction from "../components/AddTransaction";
import IncomeExpence from "../components/IncomeExpence";
import AllExpenses from "../components/AllExpences";
import IncomeExpenseGraph from "../components/IncomeExpenseGraph";
import Ad from "../components/Ad";
import { Plus, Lock } from "lucide-react";

const Dashboard = () => {

    const API_URL = "http://localhost:3001/transactions";

    const role = localStorage.getItem("role") || "admin";

    const [transactions, setTransactions] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const isEmpty = transactions.length === 0;

    const handleSave = async (data) => {
        try {
            const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            });

            const newTransaction = await res.json();
            setTransactions((prev) => [newTransaction, ...prev]);
            setShowModal(false);
        } catch (err) {
            console.error("Error saving:", err);
        }
    };

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

    // useEffect(() => {
    //     const saved = localStorage.getItem("transactions");
    //     if (saved) {
    //         setTransactions(JSON.parse(saved));
    //     }
    // }, []);

    const totalIncome = transactions
        .filter(t => t.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    const balance = totalIncome - totalExpense;

    const currentMonth = new Date().getMonth();

    const monthlyIncome = transactions
        .filter(t => new Date(t.date).getMonth() === currentMonth && t.type === "income")
        .reduce((a, b) => a + b.amount, 0);

    const monthlyExpense = transactions
        .filter(t => new Date(t.date).getMonth() === currentMonth && t.type === "expense")
        .reduce((a, b) => a + b.amount, 0);

    const categoryMap = {};

    transactions
        .filter(t => t.type === "expense")
        .forEach(t => {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
        });

    const totalExp = Object.values(categoryMap).reduce((a, b) => a + b, 0);

    const colors = ["#22c55e", "#ef4444", "#f97316", "#06b6d4", "#8b5cf6", "#14b8a6"];

    const expenseData = Object.keys(categoryMap).map((key, index) => ({
        name: key,
        value: totalExp ? Math.round((categoryMap[key] / totalExp) * 100) : 0,
        color: colors[index % colors.length],
    }));

    return (
        <div className="px-6 dark:bg-gray-950 py-4 mb-15 min-h-screen">
            <div className="flex flex-col min-[1300px]:flex-row gap-4 w-full">
                <div className={`${isEmpty ? "w-full" : "min-[1300px]:w-7/10"} w-full flex flex-col gap-4`}>
                    <div className="w-full flex flex-col min-[900px]:flex-row gap-4">
                        <div className="min-[900px]:w-2/5 w-full">
                            <MyBalance balance={balance} role={role} onAddMoney={() => setShowModal(true)} />
                        </div>
                        <div className="flex flex-col min-[600px]:flex-row gap-4 min-[900px]:w-3/5 w-full">
                            <IncomeExpence 
                                inc_exp="Income"
                                money={monthlyIncome.toLocaleString()}
                                inc_dec="+2.5%"
                            />
                            <IncomeExpence 
                                inc_exp="Expense"
                                money={monthlyExpense.toLocaleString()}
                                inc_dec="-1.8%"
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        {!isEmpty && (
                            <IncomeExpenseGraph transactions={transactions} />
                        )}

                        {isEmpty && (
                            <div className="flex flex-col w-full min-[750px]:w-125 items-center border border-gray-300 
                            dark:border-gray-700 dark:bg-[#121614] rounded-lg py-6 justify-center text-center mt-10 gap-8">
                                <div className="flex items-center justify-center p-2 bg-green-600 rounded-full">
                                    {role === "admin" ? (
                                        <Plus className="text-white dark:text-gary-100 font-semibold" size={24}/>
                                    ) : (
                                        <Lock className="text-white dark:text-gary-100 font-semibold" size={24}/>
                                    )}
                                </div>
                                <p className="text-gray-500 text-lg dark:text-gray-300">
                                    {role === "admin" 
                                        ? "Get started with your first transaction !!" 
                                        : "Only Admin can add the transactions."}
                                </p>

                                {role === "admin" && (
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                    >
                                        Add Transaction
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {!isEmpty && (
                    <div className="min-[1300px]:w-3/10 w-full">
                        <div className="flex flex-col gap-4">
                        <AllExpenses
                            data={expenseData}
                            daily={(monthlyExpense / 30).toFixed(0)}
                            weekly={(monthlyExpense / 4).toFixed(0)}
                            monthly={monthlyExpense}
                        />
                        <Ad />
                        </div>
                    </div>
                )}
            </div>
            {showModal && (
                <AddTransaction
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default Dashboard;