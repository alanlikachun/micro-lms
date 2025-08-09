import type { Role } from "../types/user";
import api from "./api";

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
  societies?: string[];
}) => {
  const { data } = await api.post("/user", userData);
  return data;
};

export const getUsers = async (filter?: {
  page?: number;
  limit?: number;
  role?: Role;
}) => {
  const { data } = await api.get("/user", { params: filter });
  return data;
};

export const getUser = async (id: string) => {
  const { data } = await api.get(`/user/${id}`);
  return data;
};

export const updateUser = async (
  id: string,
  userData: {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    societies?: string[];
  }
) => {
  const { data } = await api.patch(`/user/${id}`, userData);
  return data;
};

export const deleteUsers = async (idList: string[]) => {
  const { data } = await api.delete("/user", { data: { idList } });
  return data;
};
