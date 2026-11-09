import { api } from "./client";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  picture: string | null;
  createdAt: string;
}

interface GoogleLoginResponse {
  statusCode: number;
  data: {
    user: AuthUser;
    token: string;
  };
  message: string;
  success: boolean;
}

export const googleLogin = async (credential: string) => {
  const response = await api.post<GoogleLoginResponse>(
    "/users/google",
    { credential }
  );

  return response.data.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<{
    statusCode: number;
    data: AuthUser;
    message: string;
    success: boolean;
  }>("/users/me");

  return response.data.data;
};

export const updateCurrentUser = async (data: {
  name: string;
}) => {
  const response = await api.patch<{
    statusCode: number;
    data: AuthUser;
    message: string;
    success: boolean;
  }>("/users/me", data);

  return response.data.data;
};

export const deleteCurrentUser = async () => {
  const response = await api.delete("/users/me");
  return response.data;
};