"use client"
export default function isTokenPrsent() {
  const token = localStorage.getItem("token");
  return true ? token : false
}