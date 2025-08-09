import api from "./api";

export const createSociety = async (societyData: {
  name: string;
  managedBy?: string[];
}) => {
  const { data } = await api.post("/society", societyData);
  return data;
};

export const getSocieties = async () => {
  const { data } = await api.get("/society");
  return data;
};

export const getSociety = async (id: string) => {
  const { data } = await api.get(`/society/${id}`);
  return data;
};

export const updateSociety = async (
  id: string,
  societyData: {
    name?: string;
    managedBy?: string[];
  }
) => {
  const { data } = await api.patch(`/society/${id}`, societyData);
  return data;
};

export const deleteSocieties = async (idList: string[]) => {
  const { data } = await api.delete("/society", { data: { idList } });
  return data;
};
