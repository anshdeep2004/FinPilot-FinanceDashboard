import React, { useEffect, useState } from "react";
import { PieChart } from "lucide-react";

const CategoryWiseBreak = ({ transactions }) => {

  const categories = ["Groceries", "Shopping", "Healthcare", "Entertainment", "Utilities", "Others"];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100); 
  }, []);

  const map = {};

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  const total = Object.values(map).reduce((a, b) => a + b, 0);

  const data = categories
  .map(cat => ({
    name: cat,
    value: total ? Math.round(((map[cat] || 0) / total) * 100) : 0
  }))
  .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-300 h-full 
    dark:border-gray-700 dark:bg-[#121614] dark:text-gray-100">
      
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold">Category Breakdown</h2>
        <PieChart className="text-gray-500 dark:text-gray-300" size={24} />
      </div>

      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={i}>

            {/* Labels */}
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 dark:text-gray-300">{d.name}</span>
              <span className="font-medium">{d.value}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`bg-green-600 h-2 rounded-full transition-all duration-1000 ease-out ${
                  d.value === 0 ? "opacity-40" : ""
                }`}
                style={{
                  width: animate ? `${d.value}%` : "0%",
                }}
              ></div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

export default CategoryWiseBreak;