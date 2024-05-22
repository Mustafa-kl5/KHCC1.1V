import {
  REQUEST_HEADER_AUTH_KEY,
  ACCESS_TOKEN,
  TOKEN_TYPE,
} from "utils/constant";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { onSignOutSuccess } from "./authService";

class APIService {
  baseApi!: AxiosInstance;
  init() {
    this.baseApi = axios.create({
      baseURL: process.env.REACT_APP_API_URL || "http://localhost:4111/",
    });

    const unauthorizedCode = [400, 401];
    this.baseApi.interceptors.request.use(
      async (config) => {
        const accessToken = await localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
          config.headers[
            REQUEST_HEADER_AUTH_KEY
          ] = `${TOKEN_TYPE}${accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.baseApi.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        if (response && unauthorizedCode.includes(response.status)) {
          onSignOutSuccess();
          return;
        }

        return Promise.reject(error);
      }
    );
  }

  fetchData(param: AxiosRequestConfig = {}) {
    return new Promise((resolve, reject) => {
      this.baseApi(param)
        .then((response) => {
          resolve(response.data);
        })
        .catch((errors) => {
          reject(errors);
        });
    });
  }
}

export default new APIService();
