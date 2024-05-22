import { object, string } from "yup";

export const studySchema = object({
  studyName: string().required("Study name is required!"),
  piName: string().required("Pi name is required!"),
  studyNumber: string().required("Study number is required!"),
  studyKeywords: string().required("Study keyword is required!"),
  studyInitDate: string().required("Initiate date is required!"),
}).required();
