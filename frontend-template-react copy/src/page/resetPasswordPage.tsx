import React from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateMutation } from "../services/apiSlice"; // API call
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";
import { showSuccessToast, showErrorToast } from "../utils/toast-utils/toast.utils";

type ResetPasswordData = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Get token from URL
  const navigate = useNavigate();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordData>();
  const [resetPassword, { isLoading }] = useUpdateMutation();

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      await resetPassword({ token, password: data.password }).unwrap();
      showSuccessToast("Password reset successful! Please log in.");
      navigate("/login");
    } catch (error: any) {
      showErrorToast(error?.data?.message || "Failed to reset password. Try again.");
    }
  };

  return (
    <FormLayout
      title="Reset Password"
      onSubmit={handleSubmit(onSubmit)}
      submitButtonText={isLoading ? "Resetting..." : "Reset Password"}
      linkText="Back to Login"
      linkHref="/login"
    >
      <FormField
        name="password"
        label="New Password"
        control={control}
        type="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message : ""}
      />

      <FormField
        name="confirmPassword"
        label="Confirm Password"
        control={control}
        type="password"
        rules={{
          required: "Confirm password is required",
          validate: (value:any) => value === watch("password") || "Passwords do not match",
        }}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
      />
    </FormLayout>
  );
};

export default ResetPassword;
