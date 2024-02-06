"use client";

import { useAuth } from "@/context/Auth";

const VerifyEmailView = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    document.location.href = "/login";
    return null;
  }

  if (currentUser.emailVerified) {
    document.location.href = "/";
    return null;
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="sm:w-96 w-full sm:border p-3 sm:rounded sm:shadow space-y-3">
        <h1 className="sm:text-3xl text-2xl font-bold text-center">
          Verify your email!
        </h1>
      </div>
    </div>
  );
};

export default VerifyEmailView;
