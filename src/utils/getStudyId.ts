import { iStudyOption } from "types/study";

export const getStudyId = () => {
  const study = JSON.parse(localStorage.getItem("study") || "");
  return study as iStudyOption;
};
