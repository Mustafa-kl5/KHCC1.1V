import { number, object, string } from "yup";

export const freezerSchema = object({
  freezerName: string().required("Freezer Name is Required!"),
  freezerModel: string().required("Freezer Model is Required!"),
  freezerLocation: string().required("Freezer Location is Required!"),
  freezerType: string().required("Freezer Type is Required!"),
  NumberOfShelves: number().min(0).required("Number Of Shelves is Required!"),
  BoxesPerShelf: number().min(0).required("Boxes Per Shelf is Required!"),
}).required();
