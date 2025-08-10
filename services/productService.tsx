import axios from "../utils/axiosInstance";

// 📦 Kiểu dữ liệu cơ bản (có thể mở rộng thêm nếu cần)
export interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  images?: string[];
  // ...thêm nếu cần
}

export interface Rating {
  id: string;
  userId: string;
  score: number;
  comment?: string;
}

const productService = {
  // Lấy tất cả sản phẩm
  getAll: async (params: Record<string, any> = {}) => {
    return await axios.get("/products", { params });
  },

  // Lấy sản phẩm theo ID
  getById: (id: string) => axios.get(`/products/${id}`),

  // Tìm kiếm sản phẩm
  searchGlobal: async ({
    keyword,
    page = 1,
    limit = 20,
  }: {
    keyword: string;
    page?: number;
    limit?: number;
  }) => {
    console.log("📡 Gọi tìm kiếm toàn hệ thống:", { keyword, page, limit });

    return await axios.get("/products/search", {
      params: { name: keyword, page, limit },
    });
  },

  // Tạo mới sản phẩm (không có ảnh)
  create: async (data: Partial<Product>) => {
    return await axios.post("/products", data);
  },

  // Cập nhật sản phẩm (không có ảnh)
  update: async (id: string, data: Partial<Product>) => {
    return await axios.put(`/products/${id}`, data);
  },

  // Upload ảnh sản phẩm
  uploadImages: async (id: string, formData: FormData) => {
    return await axios.patch(`/products/${id}/upload-images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Xoá sản phẩm
  delete: async (id: string) => {
    return await axios.delete(`/products/${id}`);
  },

  // Lấy sản phẩm phổ biến
  getPopular: async () => {
    return await axios.get("/products/popular");
  },

  // Đánh giá sản phẩm
  rate: async (productId: string, data: any) => {
    return await axios.post(`/products/${productId}/rate`, data);
  },

  // Lấy tất cả đánh giá của sản phẩm
  getRatings: async (productId: string) => {
    return await axios.get(`/products/${productId}/ratings`);
  },

  // Sửa đánh giá sản phẩm
  updateRating: async (
    productId: string,
    ratingId: string,
    data: Partial<Rating>
  ) => {
    return await axios.patch(`/products/${productId}/ratings/${ratingId}`, data);
  },

  // Xoá đánh giá sản phẩm
  deleteRating: async (productId: string, ratingId: string) => {
    return await axios.delete(`/products/${productId}/ratings/${ratingId}`);
  },

  // Lấy sản phẩm theo cấp độ shop
  getByShopLevel: async (level: string) => {
    return await axios.get("/products-by-shop-level", {
      params: { level },
    });
  },
};

export default productService;