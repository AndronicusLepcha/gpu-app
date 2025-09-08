import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  documentUrl: [String],
});

const FormModel = mongoose.models.Form || mongoose.model("Form", FormSchema);

export default FormModel;