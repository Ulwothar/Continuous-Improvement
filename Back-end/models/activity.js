import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const activitySchema = new Schema({
  taskId: { type: String, required: true },
  activity: { type: String, required: true },
});

export default mongoose.model('Activity', activitySchema);
