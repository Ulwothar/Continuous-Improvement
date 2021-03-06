import { ObjectId } from 'bson';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  projectId: { type: String, required: true },
  comment: { type: String, required: true },
});

export default mongoose.model('Comment', commentSchema);
