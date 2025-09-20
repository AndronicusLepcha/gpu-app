import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import userRoutes from "./routes/userRoutes.js";
import userRoute from "./routes/user.js";
//cors
import cors from "cors";
// middleware
import { authMiddleware } from "./middleware/authMiddleware.js";

// Load env vars
dotenv.config();

// Connect DB
connectDB();

const app = express();

// cors setup
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
// all routes after this require JWT
// app.use(authMiddleware);
// for only the protected route
// app.use("/api/users", authMiddleware, userRoute);

// Middleware to parse JSON
app.use(express.json());
// Routes
app.use("/api/users", authMiddleware, userRoute);
// route to signup
app.use("/api/signup", userRoute);
// route to login
app.use("/api/login", userRoute);
// route to save form data
// app.use("/api",authMiddleware, userRoute);
app.use("/api", authMiddleware, userRoute);

// proxy url
// Proxy endpoint
app.get("/proxy", async (req, res) => {
  const fileUrl = req.query.url; // e.g. https://s3-bucket-url/file.pdf

  if (!fileUrl) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await fetch(fileUrl);
    const buffer = await response.arrayBuffer();

    // Set the correct content type
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "application/octet-stream"
    );
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching file");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
