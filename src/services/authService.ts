import { ACCESS_TOKEN } from "utils/constant";
import ApiService from "./api";
import { NavigateFunction } from "react-router-dom";
const baseURL = "api/v1";
export const login = (email: string, password: string) => {
  return ApiService.fetchData({
    url: `${baseURL}/auth/login`,
    method: "POST",
    data: {
      email,
      password,
    },
  });
};
export const registration = (
  employeeId: string,
  position: string,
  department: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  return ApiService.fetchData({
    url: `${baseURL}/auth/registration/`,
    method: "POST",
    data: {
      email,
      password,
      employeeId,
      position,
      department,
      firstName,
      lastName,
    },
  });
};

export const isLoggedIn = () => !!localStorage.getItem(ACCESS_TOKEN);

export const onSignOutSuccess = () => {
  localStorage.clear();
};
export const Logout = (navigate: NavigateFunction) => {
  localStorage.clear();
  navigate("/Login");
};
