import React, { useEffect, useState } from "react";
import Summary from "../components/Summary";
import CategoryWiseBreak from "../components/CategoryWiseBreak";
import SentenceInsights from "../components/SentenceInsights";
import { NavLink } from "react-router-dom";

const Insights = () => {

  const API_URL = "http://localhost:3001/transactions";

  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());

  const isEmpty = transactions.length === 0;

  useEffect(() => {
      fetch(API_URL)
        .then(res => res.json())
        .then(data => setTransactions(Array.isArray(data) ? data : []))
        .catch(err => {
          console.error("Error fetching:", err);
          setTransactions([]);
        });
    }, []);

  // useEffect(() => {
  //   const saved = localStorage.getItem("transactions");
  //   if (saved) {
  //     setTransactions(JSON.parse(saved));
  //   }
  // }, []);

  const filtered = transactions.filter(
    t => new Date(t.date).getMonth() === month
  );

    return (
      <div className="px-6 flex flex-col gap-6 dark:bg-gray-950 py-4 mb-15 min-h-screen">

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-700 dark:bg-[#121614] dark:text-gray-100 px-4 py-2 rounded-lg w-48"
        >
          {["January","February","March","April","May","June","July","August","September","October","November","December"]
            .map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
        </select>

        <div className="flex flex-col min-[900px]:flex-row gap-4 w-full">
          <div className="min-[900px]:w-1/3">
            <Summary transactions={filtered} />
          </div>

          <div className="min-[900px]:w-1/3">
            <CategoryWiseBreak transactions={filtered} />
          </div>

          <div className="min-[900px]:w-1/3">
            <SentenceInsights transactions={filtered} />
          </div>

        </div>

        {isEmpty && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            
            <div className="bg-white dark:bg-[#121614] rounded-2xl p-8 w-[90%] max-w-md text-center border border-gray-300 dark:border-gray-700 shadow-xl">

              <div className="text-5xl mb-4">📭</div>

              <h2 className="text-xl font-semibold mb-2 dark:text-gray-100">
                No transactions yet
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                Start tracking your expenses to see insights here.
              </p>

              <NavLink
                to="/"
                className="block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full text-center"
              >
                Return to Dashboard
              </NavLink>

            </div>
          </div>
        )}

      </div>
    );
};

export default Insights;