import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  projectId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: String, required: false },
  finishDate: { type: String, required: false },
});

export default mongoose.model('Task', taskSchema);
