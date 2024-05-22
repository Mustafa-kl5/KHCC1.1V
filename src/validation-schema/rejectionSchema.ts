import { object, string } from "yup";

export const rejectionSchema = object({
  rejectionReason: string().required("Rejection reason is required!"),
}).required();
