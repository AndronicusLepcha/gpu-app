import mongoose from "mongoose";

const CFUploadSchema = new mongoose.Schema({
  userId: String,
  certificateType: String,
  name: String,
  contact: String,
  documentUrls: { type: String, required: true },
});

const UploadedCF =
  mongoose.models.certificates || mongoose.model("certificates", CFUploadSchema);

export default UploadedCF;
