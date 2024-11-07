import { API_URL } from "@/app/constants";
import { IOrder } from "@/app/types/types";
import { getAccessToken } from "./auth/auth.helper";

export async function getOrders() {
  try {
    const response = await fetch(API_URL + `/orders/active`, {
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

export async function createOrder(data: IOrder) {
  try {
    const response = await fetch(API_URL + `/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(response.statusText);

    console.log(await response.json());
  } catch (error) {
    console.error(error);
  }
}

export async function getOrdersByUser() {
  try {
    const response = await fetch(API_URL + `/orders/user`, {
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

export async function updateOrder(orderId: number) {
  try {
    const response = await fetch(API_URL + `/orders/${orderId}/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
}
