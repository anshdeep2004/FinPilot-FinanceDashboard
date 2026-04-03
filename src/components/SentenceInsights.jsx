import React from "react";

const SentenceInsights = ({ transactions }) => {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const map = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  const topCategory = Object.keys(map).reduce(
    (a, b) => (map[a] > map[b] ? a : b),
    Object.keys(map)[0]
  );

  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h2 className="text-lg font-semibold mb-4">Insights</h2>

      <ul className="text-sm space-y-2">
        <li>💰 You earned ₹{income.toLocaleString()} this month</li>
        <li>💸 You spent ₹{expense.toLocaleString()}</li>
        <li>📊 Savings: ₹{(income - expense).toLocaleString()}</li>
        {topCategory && <li>🔥 Highest spending on {topCategory}</li>}
        {income > expense && <li>✅ You are saving money this month</li>}
        {expense > income && <li>⚠️ Your expenses exceeded income</li>}
      </ul>
    </div>
  );
};

export default SentenceInsights;