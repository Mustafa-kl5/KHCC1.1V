import { object, string, number } from "yup";

export const saveSampleSchema = object({
  freezerId: string().required("Freezer is required!"),
  cells: string().required("Please Choose Cells!"),
  numberOfSamples: string()
    .required("Number of samples is required!")
    .test(
      "numberOfSamples",
      "Number of samples exceeds maximum allowed",
      function (value, context) {
        const { subBoxType } = context.parent;
        if (subBoxType === "Large Box" && Number.parseInt(value) > 81) {
          return false;
        }
        if (subBoxType === "Small Box" && Number.parseInt(value) > 96) {
          return false;
        }
        return true;
      }
    ),
  mainBoxType: string().required("Main box type is required!"),
  subBoxType: string()
    .test(
      "subBoxType",
      "Sub box type must be large box for Small/Large Iron Containers",
      function (value, context) {
        const { mainBoxType } = context.parent;
        if (
          (mainBoxType === "Small Iron Container" ||
            mainBoxType === "Large Iron Container") &&
          value !== "Large Box"
        ) {
          return false;
        }
        return true;
      }
    )
    .required("Sub box type is required!"),
  subBoxId: string().required("Main box ID is required!"),
  mainBoxId: string().required("Sub box ID is required!"),
}).required();
