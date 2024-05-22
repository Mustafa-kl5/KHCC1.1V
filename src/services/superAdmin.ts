import ApiService from "./api";
const baseURL = "api/v1";

export const getPendingUsers = (filter?: { employeeId: string }) => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/userPermission`, {
    params: { ...filter },
  });
};
export const hotSearch = (filter: {
  searchType: string;
  searchWith: string;
}) => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/hotSearch`, {
    params: { ...filter },
  });
};
export const getFreezerStatistics = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getFreezerStatistics`);
};
export const getStudiesStatistics = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getStudiesStatistics`);
};
export const givePermission = (userId: string, permission: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/givePermission`,
    method: "PUT",
    data: {
      userId,
      permission,
    },
  });
};
export const approveStudy = (studyId: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/approveStudy`,
    method: "PUT",
    data: {
      studyId,
    },
  });
};
export const addStudy = (
  studyName: string,
  piName: string,
  studyNumber: string,
  studyKeywords: string,
  studyInitDate: string,
  files: string[]
) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/addStudy`,
    method: "POST",
    data: {
      studyName,
      piName,
      studyNumber,
      studyKeywords,
      studyInitDate,
      files,
    },
  });
};

export const getStudies = (filter?: { study: string }) => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getStudies`, {
    params: { ...filter },
  });
};
export const getPendingStudies = (filter?: { study: string }) => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getPendingStudies`, {
    params: { ...filter },
  });
};

export const addFreezer = (
  freezerName: string,
  freezerModel: string,
  freezerLocation: string,
  freezerType: string,
  NumberOfShelves: number,
  BoxesPerShelf: number
) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/addFreezer`,
    method: "POST",
    data: {
      freezerName,
      freezerModel,
      freezerLocation,
      freezerType,
      NumberOfShelves,
      BoxesPerShelf,
    },
  });
};

export const getFreezers = () => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getFreezers`);
};

export const DeleteFreezer = (Id: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/superAdmin/giveDeleteFreezerReason`,
    method: "DELETE",
    data: {
      Id,
    },
  });
};
export const getLogs = (filter?: { name: string }) => {
  return ApiService.baseApi.get(`${baseURL}/superAdmin/getLogs`, {
    params: { ...filter },
  });
};
