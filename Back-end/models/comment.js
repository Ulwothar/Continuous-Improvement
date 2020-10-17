import { ObjectId } from 'bson';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  projectId: { type: String, required: true }, //for testing, will probably be changed for ObjectId type
  comment: { type: String, required: true },
});

export default mongoose.model('Comment', commentSchema);
