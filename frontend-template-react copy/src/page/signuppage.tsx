import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import FormField from "../components/FormField";
import FormLayout from "../components/FormLayout";
import { showSuccessToast, showErrorToast } from "../utils/toast-utils/toast.utils";
import { useSignupMutation } from "../services/apiSlice";  // Assuming the API slice is in the 'services' folder

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [signup, { isLoading, isError, error }] = useSignupMutation();

  const onSubmit = async (data: FormData) => {
    try {
      // Call the signup mutation
      await signup(data).unwrap();
      showSuccessToast("Account created successfully!");

      // Navigate to login page
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      showErrorToast("An error occurred during signup.");
    }
  };

  return (
    <div>
      <Header title="Welcome" />
      <FormLayout
        title="Sign Up"
        onSubmit={handleSubmit(onSubmit)}
        submitButtonText="Sign Up"
        linkText="Already have an account?"
        linkHref="/login"
      >
        <FormField
          name="name"
          label="Full Name"
          control={control}
          rules={{
            required: "Full Name is required",
            minLength: {
              value: 3,
              message: "Full Name must be at least 3 characters",
            },
          }}
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        
        <FormField
          name="email"
          label="Email"
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
        <FormField
          name="password"
          label="Password"
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
        {isError && <p>{error?.data?.message || "Signup failed"}</p>}
      </FormLayout>
    </div>
  );
};

export default Signup;
