import User from "../models/user-table.js";
import GPUuser from "../models/gpu-users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Create user
const createUser = async (req, res) => {
  try {
    console.log("user data", req.body);
    const user = new User(req.body);

    await user.save(); // 🔥 This creates the collection if it doesn’t exist
    res.send("user created sucessfully");
    console.log("✅ User inserted, collection created!");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

// {
//     "name": "Robot",
//     "email": "andronicus.lepcha1@keysight.com",
//     "phone": "6294910181",
//     "password": "test",
//     "confirmPassword": "test"
// }

// signup for gpu users.
export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    const user = new GPUuser({ name, email, phone, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login for gpu users
export const login = async (req, res) => {
  // console.log("login triggered");
  // res.send("hello ");
  try {
    console.log(" login api triggered")
    const { phone, password } = req.body;
    console.log("req body",req.body)


    // find user
    const user = await GPUuser.findOne({ phone });
    console.log("user",user)
    if (!user) return res.status(400).json({ message: "User not found" });

    // compare password
    console.log("compare the password")
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("is Matched the password",isMatch)
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get users
const getUsers = async (req, res) => {
  try {
    console.log(req.params);
    const users = await User.find(); // get all users from MongoDB
    res.json(users); // respond with JSON
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createUser, getUsers };
