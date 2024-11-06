import React, { useState, useEffect } from "react";

const EditTitleModal = ({ showModal, setShowModal, project, saveTitle }) => {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (project) {
      setNewTitle(project.title);
    }
  }, [project]);

  const handleSave = () => {
    saveTitle(newTitle); 
    setShowModal(false);
  };

  return (
    showModal && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-10">
        <div className="relative p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-md w-full z-20">
          <button
            onClick={() => setShowModal(false)} 
            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>

          <h3 className="text-xl font-semibold mb-4">Edit Project Title</h3>

          {project && (
            <input
              type="text"
              placeholder="Enter new project title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border p-3 rounded w-full mb-4"
              required
            />
          )}

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
        </div>
      </div>
    )
  );
};

export default EditTitleModal;
