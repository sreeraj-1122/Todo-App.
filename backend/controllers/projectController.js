import Todo from '../models/todoModel.js';
import Project from './../models/projectModel.js';

// Create a new project
const createProject = async (req, res, next) => {
    const { title } = req.body;
    try {
        const newProject = new Project({
            title,
            user: req.user.id, 
        });
        await newProject.save();
        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        next(error);
    }
};

// List all projects for the logged-in user
const listProjects = async (req, res, next) => {
    console.log('User in request:', req.user);
    try {
        const projects = await Project.find({ user: req.user.id }).populate('todos');
        console.log(projects);
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        next(error);
    }
};

// Get details of a specific project for the logged-in user
const getProjects = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.findOne({ _id: id, user: req.user.id }).populate('todos');
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

// Update project details 
const updateProjects = async (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const project = await Project.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { title },
            { new: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
    } catch (error) {
        next(error);
    }
};

// Delete  project 
const deleteProjects = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Project.findOneAndDelete({ _id: id, user: req.user.id });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        await Todo.deleteMany({ _id: { $in: project.todos } }); // Delete associated todos

        res.status(200).json({ success: true, message: 'Project and associated todos deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export { createProject, listProjects, getProjects, updateProjects, deleteProjects };
