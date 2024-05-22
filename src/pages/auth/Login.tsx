import { LoginForm } from "Components/auth/LoginForm";
import { AuthLayout } from "UI/AuthLayout";
import React from "react";

export const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
