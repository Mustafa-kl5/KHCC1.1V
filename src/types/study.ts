export interface iStudyOption {
  _id: string;
  studyName: string;
  studyNumber: string;
}
export interface iStudy {
  _id: string;
  studyName: string;
  piName: string;
  studyNumber: string;
  studyKeywords: string;
  studyInitDate: string;
  files: {
    StudyId: string;
    createdAt: string;
    filename: string;
    id: number;
    updatedAt: string;
  }[];
  closeData: string;
  isClosed: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface iStudyList {
  studies: iStudy[];
}
