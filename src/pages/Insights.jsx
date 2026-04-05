import React, { useEffect, useState } from "react";
import Summary from "../components/Summary";
import CategoryWiseBreak from "../components/CategoryWiseBreak";
import SentenceInsights from "../components/SentenceInsights";

const Insights = () => {

  const API_URL = "http://localhost:3001/transactions";

  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());

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
      <div className="px-6 flex flex-col gap-6 dark:bg-gray-950 py-4">

        {/* Month Selector */}
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

        {/* Cards Layout */}
        <div className="flex flex-col min-[900px]:flex-row gap-4 w-full">

          {/* LEFT SIDE */}
          <div className="min-[900px]:w-1/3">
            <Summary transactions={filtered} />
          </div>

          {/* MIDDLE */}
          <div className="min-[900px]:w-1/3">
            <CategoryWiseBreak transactions={filtered} />
          </div>

          {/* RIGHT SIDE */}
          <div className="min-[900px]:w-1/3">
            <SentenceInsights transactions={filtered} />
          </div>

        </div>

      </div>
    );
};

export default Insights;