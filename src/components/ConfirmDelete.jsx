import { React, useEffect, useRef } from "react";

const ConfirmDelete = ({ onConfirm, onCancel }) => {
  const modalRef = useRef()

  useEffect(() => {
      const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
          onCancel();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
  
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/40 flex justify-center items-center">
      <div ref={modalRef} className="bg-white dark:bg-[#121614] p-6 rounded-xl w-80">
        <p className="mb-4 text-base dark:text-gray-100">Are you sure you want to delete this transaction?</p>

        <div className="flex justify-between">
          <button className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 " onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;