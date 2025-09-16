import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  certificateType:String,
  name: String,
  contact: String,
  documentUrls:  [
    {
      key: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  userId: String,
});

const FormModel = mongoose.models.applicantdata || mongoose.model("applicantdata", FormSchema);

export default FormModel;