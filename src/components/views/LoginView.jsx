"use client";
import { useAuth } from "@/context/Auth";
import Link from "next/link";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Spinner from "../elements/Spinner";
import { login, signInWithGoogle } from "@/lib/firebase.services";

const LoginView = () => {
  const { currentUser } = useAuth();
  if (currentUser !== null) {
    document.location.href = "/";
    return null;
  }

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
  });

  const handleSignInWithGoogle = async () => {
    setValues({ ...values, loading: true, error: "" });
    const request = await signInWithGoogle();
    if (request.error) {
      setValues({ ...values, error: request.error });
      setValues({ ...values, loading: false });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    try {
      const request = await login(values.email, values.password);

      if (request.user) {
        return (window.location.href = "/");
      }
    } catch (error) {
      setValues({ ...values, loading: false });
    }
    setValues({ ...values, error: "Email or password is incorrect!" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        action=""
        onSubmit={handleSignIn}
        className="sm:w-96 w-full sm:border p-3 sm:rounded sm:shadow space-y-3"
      >
        <h1 className="sm:text-3xl text-2xl font-bold text-center">Sign In</h1>
        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="p-2 rounded-sm border font-semibold w-full flex items-center gap-3 justify-center"
        >
          <span>Sign In with Google</span>{" "}
          <span className="text-2xl">
            <FaGoogle />
          </span>
        </button>
        <p className="text-center text-slate-500 font-semibold my-3">or</p>

        {values.error && (
          <p className="text-red-500 text-center">{values.error}</p>
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
        <Link href={"/forgotpassword"} className="text-blue-500 text-sm">
          Forget Password?
        </Link>
        <button
          disabled={values.loading}
          className="p-2 rounded-sm disabled:bg-white disabled:border disabled:text-slate-800 bg-slate-800 text-white font-semibold w-full flex justify-center"
        >
          {values.loading ? <Spinner /> : "Sign In"}
        </button>
        <p className="text-center text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginView;
