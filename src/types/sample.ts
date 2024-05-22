import { iPatient } from "./Patient";
import { iStudy } from "./study";

export interface iSample {
  _id: string;
  containerType: string;
  sampleType: string;
  drawnAt: string;
  numberOfSamples: string;
  sampleSerial: string;
  author: string;
  createAt: string;
  Study: iStudy;
  patient: iPatient;
  rejectReason: string;
  isRejected: boolean;
  isApproved: boolean;
  khccBioSampleCode: string;
  storageType: string;
}

export interface iSampleList {
  samples: iSample[];
}
export interface iSampleExport {
  _id: string;
  storageType: string;
  containerType: string;
  sampleType: string;
  drawnAt: string;
  numberOfSamples: string;
  studyNumber: string;
  patientName: string;
  mrn: string;
  ssn: string;
  birthDate: string;
  gender: string;
  sampleDrawing: string;
  sampleSerial: string;
  khccBioSampleCode: string;
  cell: string;
  mainBoxId: string;
  subBoxId: string;
  mainBoxType: string;
  subBoxType: string;
  createdAt: string;
  updatedAt: string;
  FreezerId: string;
}

export interface iFreezerExport {
  _id: string;
  freezerName: string;
  freezerModel: string;
  freezerLocation: string;
  freezerType: string;
  NumberOfShelves: number;
  BoxesPerShelf: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  samples: iSampleExport[];
}
export interface iFreezerExportBackUp {
  _id: string;
  freezerName: string;
  freezerModel: string;
  freezerLocation: string;
  freezerType: string;
  NumberOfShelves: number;
  BoxesPerShelf: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  samplesBackUp: iSampleExport[];
}
export interface iFreezerExportList {
  freezers: iFreezerExport[];
}
export interface iFreezerExportListBackUp {
  freezers: iFreezerExportBackUp[];
}

export interface iSampleToExport {
  _id: string;
  sampleSerial: string;
  khccBioSampleCode: string;
  storageType: string;
  containerType: string;
  sampleType: string;
  patientGender: string;
  patientBirthDate: string;
}
