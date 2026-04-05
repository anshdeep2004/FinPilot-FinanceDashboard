import React from "react";
import { Search, X } from "lucide-react";

const Filters = ({ filters, setFilters }) => {

    const categories = ["Groceries", "Shopping", "Healthcare", "Entertainment", "Utilities", "Others"];
    const types = ["Income", "Expense"];

    const handleReset = () => {
        setFilters({
            search: "",
            category: "all",
            type: "all"
        });
    };

    return (
        <div className="bg-white border border-gray-300 dark:border-gray-700 dark:bg-[#121614] rounded-2xl p-4 mb-5 w-full">
            <div className="flex flex-col min-[1000px]:flex-row gap-4 items-center">
                <div className="flex flex-col min-[600px]:flex-row items-center gap-4 min-[1000px]:w-1/2 w-full">
                    <div className="relative w-full min-[600px]:w-1/2 dark:bg-gray-900">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-100"
                        />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={filters.search}
                            onChange={(e) =>
                                setFilters({ ...filters, search: e.target.value })
                            }
                            className="w-full border border-gray-300 dark:border-gray-700 
                            rounded-lg pl-9 pr-3 py-2 text-sm dark:text-gray-100 focus:outline-none
                            focus:ring-2 focus:ring-gray-300"
                        />
                    </div>

                    <select
                        value={filters.category}
                        onChange={(e) =>
                            setFilters({ ...filters, category: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full min-[600px]:w-1/2
                        dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cg, index) => (
                            <option key={index} value={cg.toLowerCase()}>
                                {cg}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div className="flex flex-col min-[600px]:flex-row items-center gap-4 min-[1000px]:w-1/2 w-full">
                    <select
                        value={filters.type}
                        onChange={(e) =>
                            setFilters({ ...filters, type: e.target.value })
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white w-full min-[600px]:w-1/2
                        dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-100 focus:outline-none"
                    >
                        <option value="all">All Types</option>
                        {types.map((tp, index) => (
                            <option key={index} value={tp.toLowerCase()}>
                                {tp}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleReset}
                        className="flex items-center text-sm px-3 py-2 border border-gray-300 
                        rounded-lg hover:bg-green-600 transition-colors duration-200 min-[600px]:w-1/2 w-full
                        justify-center font-medium hover:text-white dark:bg-gray-900 
                        dark:border-gray-700 dark:text-gray-100"
                    >
                        <X size={14} />
                        Reset Filters
                    </button>
                </div>
                

            </div>
        </div>
    );
};

export default Filters;