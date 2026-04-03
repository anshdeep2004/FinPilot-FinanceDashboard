import React, { useEffect, useState } from "react";
import Summary from "../components/Summary";
import CategoryWiseBreak from "../components/CategoryWiseBreak";
import SentenceInsights from "../components/SentenceInsights";

const Insights = () => {

  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const filtered = transactions.filter(
    t => new Date(t.date).getMonth() === month
  );

  return (
    <div className="px-6 flex flex-col gap-6">

      {/* Month Selector */}
      <select
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
        className="border px-4 py-2 rounded-lg w-48"
      >
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
          .map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
      </select>

      {/* Summary */}
      <Summary transactions={filtered} />

      {/* Category */}
      <CategoryWiseBreak transactions={filtered} />

      {/* Smart Insights */}
      <SentenceInsights transactions={filtered} />

    </div>
  );
};

export default Insights;