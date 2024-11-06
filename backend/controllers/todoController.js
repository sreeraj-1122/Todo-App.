import Project from "../models/projectModel.js";
import Todo from "../models/todoModel.js";


// Add a new todo to a project
const addTodo = async (req, res, next) => {
    const { id } = req.params;
    const { description } = req.body;

    try {
        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        const newTodo = new Todo({
            description,
            status: "pending",
        });

        await newTodo.save();

        project.todos.push(newTodo._id);
        await project.save();

        // Return the created todo with its status
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        next(error);
    }
};


// Mark a todo as complete or pending
const markTodo = async (req, res, next) => {
    const { todoId } = req.params;
    
    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        todo.status = todo.status === "pending" ? "completed" : "pending";
        await todo.save();

        res.status(200).json({ success: true, message: 'Todo status updated', data: todo });
    } catch (error) {
        next(error);
    }
};


// Update  todo
const updateTodo = async (req, res, next) => {
    const { todoId } = req.params;
    const { description, status } = req.body;

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }

        if (description) todo.description = description;
        if (status) {
            if (!['pending', 'complete'].includes(status)) {
                return res.status(400).json({ success: false, message: 'Invalid status value' });
            }
            todo.status = status;
        }
        
        todo.updatedDate = new Date();
        await todo.save();

        res.status(200).json({ success: true, message: 'Todo updated', data: todo });
    }  catch (error) {
        next(error);
    }
}

// Delete todo
const deleteTodo = async (req, res, next) => {
    const { todoId } = req.params;
    try {
        const todo = await Todo.findByIdAndDelete(todoId);
        if (!todo) {
            return res.status(404).json({ success: false, message: 'Todo not found' });
        }
        await Project.updateOne({ todos: todoId }, { $pull: { todos: todoId } });
        res.status(200).json({ success: true, message: 'Todo deleted successfully' });
    }  catch (error) {
        next(error);
    }
}

export {addTodo,markTodo,updateTodo,deleteTodo}
