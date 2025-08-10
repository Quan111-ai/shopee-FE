import axiosInstance from "../utils/axiosInstance";

export type Seller = {
  _id: string;
  name: string;
  level: string;
  [key: string]: any;
};

export const sellerService = {
  // ✅ Lấy seller theo ID
  getById: (id: string) => axiosInstance.get(`/seller/${id}`),

  // ✅ Lấy danh sách seller theo cấp độ
  getByLevel: (level: string) =>
    axiosInstance.get("/seller/level", {
      params: { level },
    }),

  // ✅ Gán cấp độ cho seller (admin/staff)
  setLevel: (id: string, level: string) =>
    axiosInstance.put(`/seller/${id}/level`, { level }),
};