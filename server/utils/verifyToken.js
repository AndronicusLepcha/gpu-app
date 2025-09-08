import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    if (!token) throw new Error("No token provided");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded }; // token is valid
  } catch (err) {
    return { valid: false, error: err.message }; // token invalid/expired
  }
};