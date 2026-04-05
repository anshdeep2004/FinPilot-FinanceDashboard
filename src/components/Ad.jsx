import React from "react";

const Ad = () => {
    return (
            <div className="flex flex-col gap-10 bg-linear-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg w-full mb-4">
                <p className="text-xl">Secure yours and your family's future with our life insuarance policy plans. 
                    Everyone has to retire one day.</p>
                <button onClick={"#"} className="bg-white text-black hover:bg-gray-50 font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 w-32">
                    Learn more
                </button>
            </div>
        
    );
}
export default Ad;