import { RegestierForm } from "Components/auth/RegestierForm";
import { AuthLayout } from "UI/AuthLayout";
import React from "react";

export const SignUp = () => {
  return (
    <AuthLayout>
      <RegestierForm />
    </AuthLayout>
  );
};
