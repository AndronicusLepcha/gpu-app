import mongoose from "mongoose";

const gpuUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
});

const GPUuser = mongoose.models.GPUUser || mongoose.model("GPUUser", gpuUserSchema);

export default GPUuser;