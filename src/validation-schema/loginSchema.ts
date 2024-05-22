import { PASSWORD_PATTERN } from "utils/constant";
import { object, string } from "yup";

export const loginSchema = object({
  email: string()
    .required("email is required!")
    .email("please enter a valid email"),
  study: string().required("study is required!"),
  password: string()
    .required("password is required!")
    .matches(PASSWORD_PATTERN, "the password at least should be 8 characters"),
}).required();
