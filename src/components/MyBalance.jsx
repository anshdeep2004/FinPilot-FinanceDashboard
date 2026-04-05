// import react from "react";
// import { useState, useEffect } from "react";

// const MyBalance = ({ balance }) => {
//     const API_URL = "http://localhost:3001/transactions";

//     const [highlight, setHighlight] = useState(true);

//     const [transactions, setTransactions] = useState([]);

//     useEffect(() => {
//         fetch(API_URL)
//             .then(res => res.json())
//             .then(data => setTransactions(data))
//             .catch(err => console.error("Error fetching:", err));
//     }, []);

    
//     useEffect(() => {
//         if (transactions.length === 0) {
//             let count = 0;

//             const interval = setInterval(() => {
//             setHighlight(prev => !prev);
//             count++;

//             if (count === 10) clearInterval(interval); // 5 blinks
//             }, 400);

//             return () => clearInterval(interval);
//         }
//     }, [transactions]);

//     return (
//         <div className="bg-white dark:bg-[#121614] text-black p-6 rounded-2xl w-full min-[400px]:h-44 border border-gray-300 dark:border-gray-700">
//             <p className="text-sm opacity-80 dark:text-gray-100">Total Balance</p>
//             <div className="flex flex-col min-[400px]:flex-row gap-1 min-[400px]:items-center">
//                 <h2 className="text-3xl font-bold mt-2 dark:text-gray-100">₹ {balance.toLocaleString()}</h2>
//                 <div className="flex items-center min-[400px]:mt-3 text-sm dark:text-gray-100">
//                     <span className="text-green-600 px-2 py-1 font-bold">
//                     +2.5%
//                     </span>
//                     <span className="opacity-80">vs last month</span>
//                 </div>
//             </div>
//             <div className="flex flex-col min-[360px]:flex-row gap-3 items-center mt-5 w-full">
//                 <button className={`${highlight ? "animate-pulse" : ""} bg-green-600 text-white text-sm min-[360px]:w-1/2 w-full px-4 py-2 rounded-lg ml-auto hover:bg-green-700 transition-colors duration-300`}>
//                     Add Money
//                     {transactions.length === 0 && (
//                         <span className="absolute -top-6 left-0 text-xs text-green-600">
//                             Add your first transaction
//                         </span>
//                     )}
//                 </button>
//                 <button className="bg-white dark:bg-gray-200 text-green-600 text-sm font-bold
//                  min-[360px]:w-1/2 w-full px-4 py-2 rounded-lg border border-gray-300 ml-auto hover:bg-gray-50 
//                  hover:dark:bg-gray-300 transition-colors duration-300">
//                     Transaction
//                 </button>
//             </div>
//         </div>
//     )
// }
// export default MyBalance;


import react from "react";

const MyBalance = ({ balance }) => {
    return (
        <div className="bg-white dark:bg-[#121614] text-black p-6 rounded-2xl w-full min-[400px]:h-44 border border-gray-300 dark:border-gray-700">
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
            <div className="flex flex-col min-[360px]:flex-row gap-3 items-center mt-5 w-full">
                <button className= "bg-green-600 text-white text-sm min-[360px]:w-1/2 w-full px-4 py-2 rounded-lg ml-auto hover:bg-green-700 transition-colors duration-300">
                    Add Money
                </button>
                <button className="bg-white dark:bg-gray-200 text-green-600 text-sm font-bold
                 min-[360px]:w-1/2 w-full px-4 py-2 rounded-lg border border-gray-300 ml-auto hover:bg-gray-50 
                 hover:dark:bg-gray-300 transition-colors duration-300">
                    Transaction
                </button>
            </div>
        </div>
    )
}
export default MyBalance;