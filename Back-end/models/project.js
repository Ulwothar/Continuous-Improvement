import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  shift: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, required: true },
  currentSituation: { type: String, required: true },
  improvementSuggestion: { type: String, required: true },
  comments: { type: String, required: false },
});

export default mongoose.model('Project', projectSchema);
