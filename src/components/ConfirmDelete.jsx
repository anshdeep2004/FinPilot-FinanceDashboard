const ConfirmDelete = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-80">
        <p className="mb-4 text-base">Are you sure you want to delete this transaction?</p>

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