import { object, string } from "yup";

export const approveSampleSchema = object({
  khccBioSampleCode: string().required("Rejection reason is required!"),
}).required();
