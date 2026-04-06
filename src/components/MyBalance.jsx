import React from "react";
import { useNavigate } from "react-router-dom";

const MyBalance = ({ balance, role, onAddMoney }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white dark:bg-[#121614] text-black p-6
        rounded-2xl w-full min-[400px]:h-44 border border-gray-300 
        dark:border-gray-700">
            <p className="text-sm opacity-80 dark:text-gray-100">Total Balance</p>
            <div className="flex flex-col min-[400px]:flex-row gap-1 min-[400px]:items-center">
                <h2 className="text-3xl font-bold mt-2 dark:text-gray-100">₹ {balance.toLocaleString()}</h2>
                <div className="flex items-center min-[400px]:mt-3 text-sm dark:text-gray-100">
                    <span className="text-green-600 px-2 py-1 font-bold">
                    +2.5%
                    </span>
                    <span className="opacity-80">vs last month</span>
                </div>
            </div>
            <div className="flex flex-col min-[400px]:flex-row gap-3 items-center mt-5 w-full">
                {role === "admin" && (
                    <button
                        onClick={onAddMoney}
                        className="bg-green-600 text-white text-sm min-[400px]:w-1/2 w-full px-4 py-2 rounded-lg ml-auto hover:bg-green-700 transition-colors duration-300"
                    >
                        Add transaction
                    </button>
                )}
                <button
                    onClick={() => navigate("/transaction")}
                    className="bg-white dark:bg-gray-200 text-green-600 text-sm font-bold
                 min-[400px]:w-1/2 w-full px-4 py-2 rounded-lg border border-gray-300 ml-auto hover:bg-gray-50 
                 hover:dark:bg-gray-300 transition-colors duration-300"
                >
                    Transactions
                </button>
            </div>
        </div>
    )
}
export default MyBalance;