import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../baseUrl/baseUrl";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddTodoModal from "../TodoPages/AddTodoModal";
import EditTitleModal from "./EditTitleModal";
import EditTodoModal from "../TodoPages/EditTodoModal";
import toast from "react-hot-toast";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [todos, setTodos] = useState([]);
  const [showAddTodoModal, setShowAddTodoModal] = useState(false);
  const [showEditTitleModal, setShowEditTitleModal] = useState(false);
  const [showEditTodoModal, setShowEditTodoModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchProjectDetails = async () => {
      try {
        if (token) {
          setAuthToken(token);
        }
        const response = await axios.get(`${baseUrl}/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProject(response.data.data);
        setTodos(response.data.data.todos);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  // Count completed todos and total todos
  const completedTodosCount = todos.filter(
    (todo) => todo.status === "completed"
  ).length;
  const totalTodosCount = todos.length;


  const addTodo = async (newTodo) => {
    const todoWithStatus = {
      ...newTodo,
      status: "pending",
    };
    try {
      const response = await axios.post(
        `${baseUrl}/api/projects/${id}/todos`,
        todoWithStatus,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setTodos([...todos, response.data.data]);
      toast.success("Todo created successfully!");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${baseUrl}/api/projects/${id}/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== todoId));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleTodoStatus = async (todoId) => {
    const updatedTodo = todos.find((todo) => todo._id === todoId);
    updatedTodo.status =
      updatedTodo.status === "pending" ? "completed" : "pending";

    try {
      await axios.patch(
        `${baseUrl}/api/projects/${id}/todos/${todoId}/status`,
        {
          status: updatedTodo.status,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, status: updatedTodo.status } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo status:", error);
    }
  };

  const updateTodo = async (todoId, newDescription) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/projects/${id}/todos/${todoId}`,
        { description: newDescription },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setTodos(
        todos.map((todo) =>
          todo._id === todoId ? { ...todo, description: newDescription } : todo
        )
      );
      toast.success("Todo updated successfully!");

      setCurrentTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const saveTitle = async (newTitle) => {
    try {
      const response = await axios.put(
        `${baseUrl}/api/projects/${id}`,
        {
          title: newTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProject((prev) => ({ ...prev, title: newTitle }));
      toast.success("Updated successfully!");
    } catch (error) {
      console.error("Error saving project title:", error);
    }
  };

  return (
    <div className="p-2 md:p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate("/projects")}
          className="px-4 py-2 text-gray-600 font-semibold underline rounded-full mb-4"
        >
          &#8592; Back to Projects
        </button>

        <button
          onClick={() => setShowAddTodoModal(true)}
          className="bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white text-sm rounded-md"
        >
          Add Todo
        </button>
      </div>

      <div className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white mb-6">
        <div className="mb-4">
          <div className="flex-col sm:flex sm:flex-row   justify-between items-center mb-4">
            <h3
              className="md:text-3xl text-2xl  font-semibold  cursor-pointer hover:text-gray-700 md:mb-0 mb-3"
              onClick={() => setShowEditTitleModal(true)}
            >
              {project?.title}
            </h3>
            <p className="font-semibold text-gray-700">
              {" "}
              Summary: {completedTodosCount} / {totalTodosCount} completed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="border rounded-lg shadow-md p-4 bg-gray-100 "
                >
                  <div className="flex items-center mb-2 text-lg">
                    <input
                      type="checkbox"
                      checked={todo.status === "completed"}
                      onChange={() => toggleTodoStatus(todo._id)}
                      className="mr-2 mt-1"
                    />
                    <span
                      className={
                        todo.status === "completed"
                          ? "line-through text-gray-600 text-xl"
                          : "text-gray-800 text-xl"
                      }
                    >
                      {todo.description}
                    </span>
                  </div>

                  <div
                    className={`${
                      todo?.status === "completed"
                        ? "text-green-800"
                        : "text-red-700"
                    }`}
                  >
                    <span className="font-semibold text-gray-700">
                      Status:{" "}
                    </span>
                    {todo?.status === "completed" ? "Completed" : "Pending"}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Date: </span>
                    {new Date(todo.createdDate).toLocaleDateString()}
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-700 mt-4 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Delete
                    </button>
                    <button
                      onClick={() => {
                        setCurrentTodo(todo);
                        setShowEditTodoModal(true);
                      }}
                      className="text-green-700 hover:text-green-600 mt-4 flex items-center"
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center m-auto text-gray-600 mt-4">
                No todos available. Add a new todo to get started!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Todo Modal */}
      <AddTodoModal
        showModal={showAddTodoModal}
        setShowModal={setShowAddTodoModal}
        addTodo={addTodo}
      />

      {/* Edit Title Modal */}
      <EditTitleModal
        showModal={showEditTitleModal}
        setShowModal={setShowEditTitleModal}
        project={project}
        saveTitle={saveTitle}
      />

      {/* Edit Todo Modal */}
      <EditTodoModal
        showModal={showEditTodoModal}
        setShowModal={setShowEditTodoModal}
        todo={currentTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};

export default ProjectDetails;
