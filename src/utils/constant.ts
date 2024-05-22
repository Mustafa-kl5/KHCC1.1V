export const PASSWORD_PATTERN = /^().{8,}$/;
export const ACCESS_TOKEN = "access-token";
export const USER_ROLE = "user-role";
export const REQUEST_HEADER_AUTH_KEY = "Authorization";
export const TOKEN_TYPE = "Bearer ";
export const SHOW_TOAST_MESSAGE = "SHOW_TOAST_MESSAGE";
export const Permissions = [
  { id: 1, label: "SuperAdmin", value: "superAdmin" },
  { id: 2, label: "Nursing", value: "nursing" },
  { id: 3, label: "Technician", value: "technician" },
];
export interface HotSearchPlaceholders {
  Study: string;
  Patient: string;
  Sample: string;
}

export const allowedTypes = [
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

export const sampleTypes = [
  {
    id: 1,
    sampleType: "Blood samples",
  },
  {
    id: 2,
    sampleType: "Body fluids",
  },
  {
    id: 3,
    sampleType: "ABG’s sample",
  },
  {
    id: 4,
    sampleType: "24 hours urine collection",
  },
  {
    id: 5,
    sampleType: "Bone marrow",
  },
  {
    id: 6,
    sampleType: "Biopsy",
  },
  {
    id: 7,
    sampleType: "Sputum",
  },
  {
    id: 8,
    sampleType: "Spot urine",
  },
  {
    id: 9,
    sampleType: "CSF",
  },
  {
    id: 10,
    sampleType: "Stool",
  },
  {
    id: 11,
    sampleType: "Swaps",
  },
];
export const containerTypes = [
  {
    id: 1,
    containerType: "Plain tube",
    colorCode: "#FF0000",
  },
  {
    id: 2,
    containerType: "K2 EDTA",
    colorCode: "#800080",
  },
  {
    id: 3,
    containerType: "Lithium or sodium HEPARIN",
    colorCode: "#008000",
  },
  {
    id: 4,
    containerType: "SODIUM CITRATE",
    colorCode: "#0000FF",
  },
  {
    id: 5,
    containerType: "Dry tube K EDTA",
    colorCode: "#FFC0CB",
  },
  {
    id: 6,
    containerType: "Urine cup",
    colorCode: "#FFFF00",
  },
  {
    id: 7,
    containerType: "Sodium fluoride",
    colorCode: "#808080",
  },
  {
    id: 8,
    containerType: "Eppendorf tube",
    colorCode: "#FFA500",
  },
  {
    id: 9,
    containerType: "Cryotube",
    colorCode: "#A52A2A",
  },
];
export const storageTypes = [
  {
    id: 1,
    storageType: "Room temperature",
  },
  {
    id: 2,
    storageType: "Refrigerator 4°C",
  },
  {
    id: 3,
    storageType: "Freezer -20°C",
  },
  {
    id: 4,
    storageType: "Freezer -80°C",
  },
  {
    id: 5,
    storageType: "Freezer -120°C",
  },
  {
    id: 6,
    storageType: "Incubator +37.0°C",
  },
];
export const mainBoxsType = [
  {
    id: 1,
    boxType: "Small Iron Rack",
  },
  {
    id: 2,
    boxType: "Large Iron Rack",
  },
  {
    id: 3,
    boxType: "Plastic Container",
  },
];
export const subBoxsType = [
  {
    id: 1,
    boxType: "Small Box",
  },

  {
    id: 2,
    boxType: "Large Box",
  },
];

export const hotSearchPlaceHolders: HotSearchPlaceholders = {
  Study: "Search by Study Name, Study Number, Study Keyword",
  Patient: "Search by Patient Name, MRN, SSN",
  Sample: "Search by Sample Serial, KHCC Code",
};
