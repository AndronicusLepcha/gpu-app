import FormModel from "../models/upload.js";
import s3 from "../config/aws.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import UploadedCF from "../models/certificatesUploaded.js";

const uploadFormData = async (req, res) => {
  console.log("Text fields:", req.body);
  const files = req.files; // array of files
  const { name, contact, certificateType, userId } = req.body;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  try {
    console.log("inside the try bolck", files);
    // Upload all files to S3
    const uploadPromises = Object.values(req.files)
      .flat()
      .map((file) => {
        const key = `documents/${Date.now()}_${file.originalname}`;
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        };
        // return s3.send(new PutObjectCommand(params));
        return s3.send(new PutObjectCommand(params)).then(() => {
          return {
            key,
            url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
          };
        });
      });

    // const uploadResults = await Promise.all(uploadPromises);
    // const documentUrls = uploadResults.map((result) => result.Location);
    // console.log("upload detials", uploadResults);

    const documentUrls = await Promise.all(uploadPromises);
    console.log("✅ Upload details:", documentUrls);

    // Save to MongoDB
    const doc = await FormModel.create({
      userId,
      name,
      contact,
      documentUrls,
      certificateType,
    });

    res.status(200).json({ message: "Success", data: doc });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
    console.error("❌ Error:", err.message);
  }
};

const getAllRequestApplicantData = async (req, res) => {
  // res.status(200).json({ message: "Success" });
  try {
    if (req) {
      console.log("Request body", req);
    }
    const data = await FormModel.find();
    console.log("All forms:", data);
    res.status(200).json({ message: "Success", data: data });
  } catch (err) {
    console.error("Error fetching applicants data:", err);
  }
};

// to upload cf by the admin
const uploadCF = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const file = req.file;
  try {
    // S3 upload
    const key = `requestCFs/${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    await s3.send(new PutObjectCommand(params));
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    // save the url to db
    const savedCF = await UploadedCF.create({
      userId: req.body.userId, // or however you identify the user
      certificateType: req.body.certificateType,
      name: req.body.name,
      contact: req.body.contact,
      documentUrls: fileUrl,
    });

    res
      .status(200)
      .json({ message: "File Upload Successfully", data: savedCF });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
// fetch certificates for the logged in user
const getCF = async (req, res) => {
   const { userID } = req.body;
   console.log("userID is",userID)
    if (!userID) {
      return res.status(400).json({ message: "Missing userID" });
    }
  try {
    const data = await UploadedCF.find({ userId: userID });
    res.status(200).json({ message: "Success", data: data });
  } catch (err) {
    console.error("Error fetching applicants data:", err);
  }
};

export { uploadFormData, getAllRequestApplicantData, uploadCF, getCF };
