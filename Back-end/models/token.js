import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  name: { type: String, required: true },
  refreshToken: { type: String, required: true },
});

export default mongoose.model('Token', tokenSchema);
