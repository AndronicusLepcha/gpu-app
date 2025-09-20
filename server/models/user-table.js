import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },      // String field, required
  email: { type: String, required: true, unique: true }, // Unique email
  age: { type: Number, default: 18 },          // Default value
  createdAt: { type: Date, default: Date.now }, // Auto timestamp
  isAdmin:{type:Boolean,default:false}
});

// Create a model (this maps to a "users" collection)
const User = mongoose.models.User ||  mongoose.model("User", userSchema);

export default User;