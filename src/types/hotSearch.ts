import { iPatient } from "./Patient";
import { iFreezerExport } from "./sample";
import { iStudy } from "./study";

export interface iHotSearch {
  study: iStudy;
  patient: iPatient[];
  freezers: iFreezerExport[];
}
