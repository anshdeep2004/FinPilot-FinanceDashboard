import React from "react";

const CategoryWiseBreak = ({ transactions }) => {

  const map = {};

  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  const total = Object.values(map).reduce((a, b) => a + b, 0);

  const data = Object.keys(map).map(k => ({
    name: k,
    value: total ? Math.round((map[k] / total) * 100) : 0
  }));

  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h2 className="text-lg font-semibold mb-4">Category Breakdown</h2>

      {data.map((d, i) => (
        <div key={i} className="flex justify-between text-sm mb-2">
          <span>{d.name}</span>
          <span>{d.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryWiseBreak;