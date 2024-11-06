import React, { useState } from "react";

const AddTodoModal = ({ showModal, setShowModal, addTodo }) => {
  const [todoDescription, setTodoDescription] = useState("");

  const handleSubmit = () => {
    if ( todoDescription) {
      addTodo({  description: todoDescription });
      setShowModal(false);  
      setTodoDescription("")
    }
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
        <div className="relative p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-md w-full z-20">
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-4 text-3xl text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>

          <h3 className="text-xl font-semibold mb-4">Add New Todo</h3>
          <textarea
            placeholder="Todo Description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Todo
          </button>
        </div>
      </div>
    )
  );
};

export default AddTodoModal;
