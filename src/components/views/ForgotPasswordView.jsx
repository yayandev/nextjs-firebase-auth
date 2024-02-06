"use client";
import Link from "next/link";
import { useState } from "react";
import Spinner from "../elements/Spinner";
import { forgotPassword } from "@/lib/firebase.services";

const ForgotPasswordView = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await forgotPassword(email);
      setMessage("Password reset link sent");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action=""
        onSubmit={handleSubmit}
        className="sm:w-96 w-full sm:border p-3 sm:rounded sm:shadow space-y-5"
      >
        <h1 className="sm:text-2xl text-xl font-bold text-center">
          Forgot Password
        </h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border focus:outline-dashed rounded-sm"
        />
        <Link href={"/login"} className="text-blue-500 text-sm">
          back to login
        </Link>
        <button
          disabled={loading}
          className="p-2 rounded-sm disabled:bg-white disabled:border disabled:text-slate-800 bg-slate-800 text-white font-semibold w-full flex justify-center"
        >
          {loading ? <Spinner /> : "Send Password Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordView;
