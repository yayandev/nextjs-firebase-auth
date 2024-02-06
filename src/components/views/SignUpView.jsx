"use client";
import { useAuth } from "@/context/Auth";
import { signInWithGoogle, signUp, verifyEmail } from "@/lib/firebase.services";
import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Spinner from "../elements/Spinner";
const SignUpView = () => {
  const { currentUser } = useAuth();
  if (currentUser !== null) {
    document.location.href = "/";
    return null;
  }

  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    message: "",
    loading: false,
  });

  const handleSignUp = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: "", message: "" });
    if (values.password !== values.confirmPassword) {
      setValues({ ...values, error: "Passwords do not match" });
      return;
    }

    try {
      await signUp(values.email, values.password);
      await verifyEmail(request.user);
      setValues({
        ...values,
        message: "Registration successful, please verify your email!",
      });
      setValues({ ...values, loading: false });
      return;
    } catch (error) {
      setValues({ ...values, loading: false });
    }
    setValues({ ...values, error: "Email is already in use!" });
  };

  const handleSignUpWithGoogle = async () => {
    setValues({ ...values, loading: true, error: "" });
    const request = await signInWithGoogle();
    if (request.error) {
      setValues({ ...values, error: request.error });
      setValues({ ...values, loading: false });
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action=""
        onSubmit={handleSignUp}
        className="sm:w-96 w-full sm:border p-3 sm:rounded sm:shadow space-y-3"
      >
        <h1 className="sm:text-3xl text-2xl font-bold text-center">Sign Up</h1>
        <button
          type="button"
          onClick={handleSignUpWithGoogle}
          className="p-2 rounded-sm border font-semibold w-full flex items-center gap-3 justify-center"
        >
          <span>Sign Up with Google</span>{" "}
          <span className="text-2xl">
            <FaGoogle />
          </span>
        </button>
        <p className="text-center text-slate-500 font-semibold my-3">or</p>

        {values.error && (
          <p className="text-red-500 text-center">{values.error}</p>
        )}
        {values.message && (
          <p className="text-red-500 text-center">{values.message}</p>
        )}
        <input
          type="email"
          required
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          className="w-full p-2 border focus:outline-dashed rounded-sm"
          placeholder="Email"
        />
        <input
          type="password"
          required
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          className="w-full p-2 border focus:outline-dashed rounded-sm"
          placeholder="Password"
        />
        <input
          type="password"
          required
          value={values.confirmPassword}
          onChange={(e) =>
            setValues({ ...values, confirmPassword: e.target.value })
          }
          className="w-full p-2 border focus:outline-dashed rounded-sm"
          placeholder="Confirm Password"
        />
        <button
          disabled={values.loading}
          className="p-2 rounded-sm disabled:bg-white disabled:border disabled:text-slate-800 bg-slate-800 text-white font-semibold w-full flex justify-center"
        >
          {values.loading ? <Spinner /> : "Sign Up"}
        </button>
        <p className="text-center text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpView;
