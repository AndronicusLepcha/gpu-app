"use client";

import { useEffect, useState } from "react";
import LogoutButton from "./logoutButton";

export default function AuthWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      {<LogoutButton />}
    </>
  );
}