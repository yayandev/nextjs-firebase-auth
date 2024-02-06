"use client";
import { useAuth } from "@/context/Auth";
import { useState } from "react";

const HomeView = () => {
  const { currentUser, logout } = useAuth();
  if (!currentUser) {
    document.location.href = "/login";
    return null;
  }

  if (!currentUser.emailVerified) {
    document.location.href = "/verifyemail";
    return null;
  }

  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="sm:w-96 w-full sm:border p-3 sm:rounded sm:shadow space-y-3">
        <h1 className="sm:text-3xl text-2xl font-bold text-center">
          Welcome Back!
        </h1>
        {values.error && (
          <p className="text-red-500 text-center">{values.error}</p>
        )}
        {values.message && (
          <p className="text-green-500 text-center">{values.message}</p>
        )}
        <form action="" className="w-full space-y-3">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 rounded-sm border focus:outline-dashed"
            value={currentUser.displayName || values.displayName}
            disabled
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 rounded-sm border focus:outline-dashed"
            value={currentUser.email || values.email}
            disabled
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </form>
        <button
          onClick={logout}
          className="p-2 rounded-sm text-white bg-red-500 font-semibold w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeView;
