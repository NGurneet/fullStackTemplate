import React from "react";
import { useForm } from "react-hook-form";
import { useForgotMutation } from "../services/apiSlice"; // API call
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";
import { showSuccessToast, showErrorToast } from "../utils/toast-utils/toast.utils";

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<ForgotPasswordData>();
  const [forgotPassword, { isLoading }] = useForgotMutation();

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      await forgotPassword(data).unwrap();
      showSuccessToast("Reset link sent to your email!");
    } catch (error: any) {
      showErrorToast(error?.data?.message || "Failed to send reset link. Try again.");
    }
  };

  return (
    <FormLayout
      title="Forgot Password"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText={isLoading ? "Sending..." : "Send Reset Link"}
      linkText="Back to Login"
      linkHref="/login"
    >
      <FormField
        name="email"
        label="Enter your email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: "Invalid email address",
          },
        }}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />
    </FormLayout>
  );
};

export default ForgotPassword;
