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
    if (response.status === 401) window.location.href = "/auth";

    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProfile(data: IUser) {
  try {
    const response = await fetch(API_URL + `/user/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) window.location.href = "/auth";

    if (!response.ok) throw new Error(response.statusText);

  } catch (error) {
    console.error(error);
  }
}
