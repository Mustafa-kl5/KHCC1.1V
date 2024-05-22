import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, registration } from "services/authService";
import { iSignUpForm } from "types/signup";
import { ACCESS_TOKEN, SHOW_TOAST_MESSAGE, USER_ROLE } from "utils/constant";
import { registrationSchema } from "validation-schema/registrationSchema";

export const RegestierForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      employeeId: "",
      position: "",
      department: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: iSignUpForm) => {
    const {
      employeeId,
      position,
      department,
      firstName,
      lastName,
      email,
      password,
    } = data;
    try {
      setIsSubmitting(true);
      const res = (await registration(
        employeeId,
        position,
        department,
        firstName,
        lastName,
        email,
        password
      )) as {
        token: string;
        role: string;
      };
      localStorage.setItem(ACCESS_TOKEN, res.token);
      localStorage.setItem(USER_ROLE, res.role);
      navigate("/");
    } catch (err: any) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message:
            err?.response?.data?.message ||
            "Something is going Wrong , Try again later",
          isOpen: true,
          severity: "error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="auth-form">
      <h1 className="auth-heading">SignUp</h1>

      <Controller
        name="employeeId"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.employeeId && true}
            {...field}
            autoFocus
            type="text"
            label="Employee Id"
            className="input"
            helperText={errors.employeeId && errors.employeeId.message}
          />
        )}
      />
      <div className="grid grid-col-1 gap-x-1 md:grid-cols-2">
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.position && true}
              {...field}
              type="text"
              label="Position"
              className="input"
              helperText={errors.position && errors.position.message}
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.department && true}
              {...field}
              type="text"
              label="Department"
              className="input"
              helperText={errors.department && errors.department.message}
            />
          )}
        />
      </div>
      <div className="grid grid-col-1 gap-x-1 md:grid-cols-2">
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ my: 2 }}
              error={errors.firstName && true}
              {...field}
              type="text"
              label="First Name"
              className="input"
              helperText={errors.firstName && errors.firstName.message}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ my: 2 }}
              error={errors.lastName && true}
              {...field}
              type="text"
              label="Last Name"
              className="input"
              helperText={errors.lastName && errors.lastName.message}
            />
          )}
        />
      </div>

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.email && true}
            {...field}
            type="text"
            label="Email"
            className="input"
            helperText={errors.email && errors.email.message}
          />
        )}
      />
      <div className="grid grid-col-1 gap-x-1 md:grid-cols-2">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.password && true}
              {...field}
              type="password"
              label="Password"
              className="input"
              helperText={errors.password && errors.password.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.confirmPassword && true}
              {...field}
              type="password"
              label="Confirm Password"
              className="input"
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
        />
      </div>
      <p>
        Already have an account?
        <Link to="/login" className="text-button-100">
          Login
        </Link>
      </p>

      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
      >
        <div className="flex gap-2 items-center">
          <span>Join</span>
          {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
        </div>
      </Button>
    </form>
  );
};
