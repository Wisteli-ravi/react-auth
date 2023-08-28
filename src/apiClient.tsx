import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import jwtDecode from "jwt-decode";
import moment from "moment";
import {
  UserData,
  ResetPasswordResponse,
  DiagnosesList,
} from "./sharedTypes";

const BASE_URL = process.env["REACT_APP_API_ENDPOINT"];

interface ApiClient {
  readonly getDiagnosesList: (
    loadUpdatedData?: boolean
  ) => Promise<DiagnosesList[]>;
  readonly resetPassword: (userId: string) => Promise<ResetPasswordResponse>;
  readonly getLoggedInUserData: () => Promise<UserData>;
}

const PATHS = Object.freeze({
  GET_DIAGNOSIS_LIST: "billing/diagnose",
  GET_PROVIDER_PROFILE: (providerId: string | number) =>
    `provider/profile/${providerId}`,
  RESET_PASSWORD: (userId: string) =>
    `users/forgot_password?username=${userId}&portal=WebApp`,
    GET_LOGGED_IN_USER_DATA: "users/auth", 
});

export const createApiClient = (accessToken?: string): ApiClient => {
  const config = {
    baseURL: BASE_URL,
    headers: {
      Authorization: accessToken
        ? accessToken
        : sessionStorage.getItem("access_token") || "",
    },
  };

  const checkTokenExpiry = () => {
    //Added logout functionality here rather than the userContext hook since hooks can only be called in components or custom hooks
    const token: any = jwtDecode(sessionStorage.getItem("access_token") || "");
    if (moment().valueOf() >= token.exp * 1000) {
      const rememberMe = sessionStorage.getItem("login_remember");
      const userName = sessionStorage.getItem("login_username");
      sessionStorage.clear();
      sessionStorage.setItem("login_remember", String(rememberMe));
      if (rememberMe) {
        sessionStorage.setItem("login_username", String(userName));
      }
      window.location.pathname = "/";
      message.warning("Your sessions has expired, please login again.");
    }
  };

  const getLoggedInUserData = async () => {
    checkTokenExpiry();
    try {
      const response = await axios.get(PATHS.GET_LOGGED_IN_USER_DATA, config);
      return response.data;
    } catch (error) {
      throw new Error(error as undefined);
    }
  };

  const getDiagnosesList = async (loadUpdatedData?: boolean) => {
    checkTokenExpiry();
    try {
      const response = await axios.get(PATHS.GET_DIAGNOSIS_LIST, {
        ...config,
        params: loadUpdatedData
          ? {
              timeStamp: Date.now(),
            }
          : null,
      });
      return response.data;
    } catch (error) {
      throw new Error(error as undefined);
    }
  };

  const resetPassword = async (userId: string) => {
    try {
      const response = await axios.get(PATHS.RESET_PASSWORD(userId), config);
      return response.data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return {
    getLoggedInUserData,
    getDiagnosesList,
    resetPassword,
  };
};
