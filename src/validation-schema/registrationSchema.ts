import { PASSWORD_PATTERN } from "utils/constant";
import { object, string, ref } from "yup";

export const registrationSchema = object({
  employeeId: string().required("Employee id is Required !"),
  position: string().required("Position id is Required !"),
  department: string().required("Department id is Required !"),
  firstName: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: string()
    .required("email is required!")
    .email("please enter a valid email"),
  password: string()
    .required("password is required!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
  confirmPassword: string()
    .required("confirm the password please")
    .oneOf([ref("password")], "password does not match!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
}).required();
