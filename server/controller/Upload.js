import FormModel from "../models/upload.js";
import s3 from "../config/aws.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const uploadFormData = async (req, res) => {
  console.log("Text fields:", req.body);
  // Files
  // console.log("Files:", req.files);
  // res.status(200).json({ message: "Success" });

  const files = req.files; // array of files
  const { name, contact } = req.body;
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
      name,
      contact,
      documentUrls,
    });

    res.status(200).json({ message: "Success", data: doc });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
    console.error("❌ Error:", err.message);
  }
};

export { uploadFormData };
