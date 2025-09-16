// Import the required modules
import express from "express"
const userRoute = express.Router()
import {createUser,getUsers,signup,login} from "../controller/User.js"
import {uploadFormData,getAllRequestApplicantData,uploadCF,getCF} from "../controller/Upload.js"
import multer from "multer"


const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for user login
userRoute.post("/createUser", createUser)
// userRoute.get("/getUsers/:id", getUsers) // it accept the parms
userRoute.get("/getUsers/:id", getUsers)
// gpu user signup
userRoute.post("/gpu", signup)
// login route
userRoute.post("/user",login)
// save form data
userRoute.post("/saveFormData",upload.fields([
  { name: "aadhar", maxCount: 1 },
  { name: "dobProof", maxCount: 1 },
]),uploadFormData)

// fetch applicant data
userRoute.get("/getApplicantData",getAllRequestApplicantData)
// upload CF 
userRoute.post("/uploadCF",upload.single("file"),uploadCF)
// get CF
userRoute.post("/getCF",getCF)







export default userRoute