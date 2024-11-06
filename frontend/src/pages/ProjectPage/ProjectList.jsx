import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../baseUrl/baseUrl";
import { FaPlus, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import CreateProjectModal from "./CreateProjectModal";
import toast from "react-hot-toast";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid date";
    }
    return format(date, "MMMM dd, yyyy, h:mm a");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('authToken');

      try {
        if (token) {
          setAuthToken(token);
        }
        const response = await axios.get(`${baseUrl}/projects`, {
          headers: {
              Authorization: `Bearer ${token}`,
          }
      });
        setProjects(response.data.data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [showForm]);

  const createProject = async () => {
    if (!newProjectTitle) return;

    try {
      const response = await axios.post(
        `${baseUrl}/projects`, 
        { title: newProjectTitle },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setNewProjectTitle("");
      setShowForm(false);
      toast.success("Project created successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
    }
};


const deleteProject = async (projectId) => {
  try {
    await axios.delete(`${baseUrl}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    setProjects(projects.filter((project) => project._id !== projectId));
    toast.success("Project deleted successfully!");
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-600">All Projects</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-3 bg-green-700 text-white rounded-full hover:bg-green-600 text-lg flex items-center justify-center shadow md:mr-4 mr-0"
        >
          <FaPlus />
        </button>
      </div>

      <CreateProjectModal
        showForm={showForm}
        setShowForm={setShowForm}
        newProjectTitle={newProjectTitle}
        setNewProjectTitle={setNewProjectTitle}
        createProject={createProject}
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects?.length === 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-4 p-4 text-center text-lg font-semibold text-gray-500">
            No projects available
          </div>
        ) : (
          projects?.map((project, index) => (
            <li
            key={project._id}
            className="p-4 border border-gray-300 rounded-lg shadow-md bg-white relative cursor-pointer"
            onClick={() => navigate(`/projects/${project._id}`)}

          >
            <div
              className="flex justify-between items-center"
            >
              <h4 className="font-semibold text-lg">{project?.title}</h4>
              <span
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation on delete click
                  deleteProject(project._id);
                }}
                className="text-red-500 cursor-pointer hover:text-red-700 transition-opacity duration-300"
              >
                <FaTrash />
              </span>
            </div>
            
            <p
              className="font-semibold text-xs mt-4"
              onClick={() => navigate(`/projects/${project._id}`)}
            >
              {formatDate(project?.createdDate)}
            </p>
          </li>
          
          ))
        )}
      </ul>
    </div>
  );
};

export default ProjectList;
