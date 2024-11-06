import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
