import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
    description: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo