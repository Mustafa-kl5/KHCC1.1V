import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, login } from "services/authService";
import { getStudiesOptions } from "services/publicService";
import { iStudyOption } from "types/study";
import { ACCESS_TOKEN, SHOW_TOAST_MESSAGE, USER_ROLE } from "utils/constant";
import { loginSchema } from "validation-schema/loginSchema";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [options, setOptions] = useState<iStudyOption[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setIsSubmitting(true);
      const res = (await login(data.email, data.password)) as {
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

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      study: "",
      password: "",
    },
    mode: "onChange",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getStudiesOptions();
      setOptions(res.data.options);
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
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);
  return (
    <form className="auth-form">
      <h1 className="auth-heading">Login</h1>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            error={errors.email && true}
            {...field}
            autoFocus
            label="Email"
            className="input"
            helperText={errors.email && errors.email.message}
          />
        )}
      />

      <Controller
        name="study"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl error={errors.study && true} fullWidth>
            <InputLabel id="demo-simple-select-label">Study</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              label="study"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                localStorage.setItem("study", e.target.value as string);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <MenuItem disabled value={""}>
                  <strong>Loading...</strong>
                </MenuItem>
              ) : (
                options?.map((study) => (
                  <MenuItem key={study._id} value={JSON.stringify(study)}>
                    <div className="flex  gap-2">
                      <strong>{study.studyName} / </strong>
                      <strong>{study.studyNumber}</strong>
                    </div>
                  </MenuItem>
                ))
              )}
            </Select>

            <FormHelperText>
              {errors.study && errors.study.message}
            </FormHelperText>
          </FormControl>
        )}
      />

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
      <p>
        Don't have an account?
        <Link to="/signup" className="text-button-100">
          Register
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
