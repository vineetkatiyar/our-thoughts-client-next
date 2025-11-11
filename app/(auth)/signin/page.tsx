import LoginForm from "@/components/auth/signin-form";
import React from "react";

const SigninPage = () => {
  return (
    <div className="mt-20 px-5 md:px-0 max-w-xl mx-auto shadow-md py-8 rounded-md">
      <LoginForm />
    </div>
  );
};

export default SigninPage;
