import axiosInstance from "../utils/axiosInstance";

export const categoryGroupService = {
  // ✅ Lấy tất cả ngành hàng
  getAll: () => axiosInstance.get("/category-group"),

  // ✅ Lấy ngành hàng theo ID
  getById: (id: string) => axiosInstance.get(`/category-group/${id}`),

  // ✅ Lấy sản phẩm theo ngành hàng
  getProductsByGroup: (id: string) => axiosInstance.get(`/category-group/${id}/products`),

  // ✅ Tạo ngành hàng mới (admin/staff)
  create: (data: {
    name: string;
    thumbnail?: string;
  }) => axiosInstance.post("/category-group", data),

  // ✅ Cập nhật ngành hàng (admin/staff)
  update: (id: string, data: {
    name?: string;
    thumbnail?: string;
  }) => axiosInstance.put(`/category-group/${id}`, data),

  // ✅ Xóa ngành hàng (admin/staff)
  delete: (id: string) => axiosInstance.delete(`/category-group/${id}`),

  // ✅ Upload thumbnail (admin/staff)
  uploadThumbnail: (id: string, file: File) => {
    const formData = new FormData();
    formData.append("thumbnail", file);
    return axiosInstance.put(`/category-group/thumbnail/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
