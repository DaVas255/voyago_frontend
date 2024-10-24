import { IFormData } from "@/app/types/types";
import { API_URL } from "@/app/constants";
import { getAccessToken, removeFromStorage, saveTokenStorage } from "./auth.helper";
import toast from "react-hot-toast";

export enum EnumTokens {
  'ACCESS_TOKEN' = 'accessToken',
  'REFRESH_TOKEN' = 'refreshToken'
}

export async function userAuth(type: "login" | "register", data: IFormData) {
  delete data.confirm_password;
  try {
    const request = await fetch(API_URL + `/auth/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log(request);

    if (request.status === 401) {
      toast.error("Неправильный логин или пароль");
    }


    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    if (response.accessToken) saveTokenStorage(response.accessToken);
  } catch (error) {
    console.error(error);
  }
}

export async function getNewTokens() {
  try {
    const request = await fetch(API_URL + `/auth/access-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
    });
    if (!request.ok) {
      throw new Error(request.statusText);
    }

    const response = await request.json();
    if (response.accessToken) saveTokenStorage(response.accessToken);

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  try {
    const request = await fetch(API_URL + `/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      credentials: "include",
    });
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
    if (response) removeFromStorage();
  } catch (error) {
    console.error(error);
  }
}
