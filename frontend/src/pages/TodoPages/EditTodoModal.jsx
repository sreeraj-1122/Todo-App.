import React, { useState, useEffect } from "react";

const EditTodoModal = ({ showModal, setShowModal, todo, updateTodo }) => {
  const [description, setDescription] = useState("");

  // Sync the modal state with the todo prop whenever it changes
  useEffect(() => {
    if (showModal && todo) {
      setDescription(todo.description);
    }
  }, [showModal, todo]); // Depend on showModal and todo to reset when modal opens or todo changes

  const handleSave = () => {
    if (description !== todo.description) {
      updateTodo(todo._id, description); // Update the todo description via API call
    }
    setShowModal(false); // Close the modal after saving
  };

  if (!todo) {
    // If there's no todo, return nothing or a loading state.
    return null;
  }

  return (
    showModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
          <h2 className="text-xl font-semibold mb-4">Edit Todo</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditTodoModal;
