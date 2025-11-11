import LoginForm from "@/components/auth/signin-form";
import RegisterForm from "@/components/auth/signup-form";

const SignupPage = () => {
  return (
    <div className="mt-20 px-5 md:px-0 max-w-xl mx-auto shadow-md py-8 rounded-md">
      <RegisterForm />
    </div>
  );
};

export default SignupPage;
