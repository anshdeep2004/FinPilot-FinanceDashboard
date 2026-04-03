import React from "react";

const Summary = ({ transactions }) => {

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;
  const savingsRate = income ? ((savings / income) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white p-6 rounded-2xl border">
      <h2 className="text-lg font-semibold mb-4">Monthly Summary</h2>

      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>Income: ₹{income.toLocaleString()}</div>
        <div>Expense: ₹{expense.toLocaleString()}</div>
        <div>Savings: ₹{savings.toLocaleString()}</div>
        <div>Savings Rate: {savingsRate}%</div>
      </div>
    </div>
  );
};

export default Summary;