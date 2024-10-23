import { API_URL } from "@/app/constants";
import { getAccessToken } from "./auth/auth.helper";
import { IUser } from "@/app/types/types";

export async function getProfile() {
  try {
    const response = await fetch(API_URL + `/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(data: IUser) {
  try {
    const request = await fetch(API_URL + `/user/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });
    if (!request.ok) {
      throw new Error(request.statusText);
    }
    const response = await request.json();
  } catch (error) {
    console.error(error);
  }
}