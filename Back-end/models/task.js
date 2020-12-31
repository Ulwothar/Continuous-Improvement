import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
});

export default mongoose.model('Task', taskSchema);
