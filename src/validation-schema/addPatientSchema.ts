import { object, string } from "yup";

export const addPatientSchema = object({
  patientName: string().required("Patient Name is required!"),
  ssn: string().when("mrn", {
    is: (val: string) => val.toString().length === 0,
    then: (schema) => schema.required("At least one of them is required!"),
    otherwise: (schema) => schema.notRequired(),
  }),
  mrn: string().notRequired(),
  dayCode: string().required("dayCode is required!"),
  researchId: string().required("researchId is required!"),
  gender: string().required("researchId is required!"),
  admitionRecDate: string().required("admitionRecDate is required!"),
  birthDate: string().required("birthDate is required!"),
  sampleDrawing: string().required("sampleDrawing is required!"),
});
