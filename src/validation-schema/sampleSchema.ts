import { object, string, array } from "yup";

export const sampleSchema = object().shape({
  samples: array().of(
    object().shape({
      sampleType: string().required("Sample type is required"),
      containerType: string().required("Container type is required"),
      numberOfSamples: string().required("Number of samples is required"),
      drawnAt: string().required("Drawn time is required"),
      sampleSerial: string().required("sample Serial is required"),
      storageType: string().required("sample Serial is required"),
    })
  ),
});
