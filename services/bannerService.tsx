import axios from '../utils/axiosInstance';

const bannerService = {
  // 🟢 Lấy tất cả banner
  getAll: async (params = {}) => {
    return await axios.get('/banner', { params });
  },

  // 🆕 Tạo mới banner
  create: async (data: {
    title: string;
    imageUrl: string;
    redirectUrl: string;
    isDisplayed?: boolean;
  }) => {
    return await axios.post('/banner', data);
  },

  // ✏️ Cập nhật banner
  update: async (id: string, data: Partial<{
    title: string;
    imageUrl: string;
    redirectUrl: string;
    isDisplayed: boolean;
  }>) => {
    return await axios.put(`/banner/${id}`, data);
  },

  // ❌ Xoá banner
  delete: async (id: string) => {
    return await axios.delete(`/banner/${id}`);
  },

  // 👁️ Toggle hiển thị banner
  toggleDisplay: async (bannerId: string) => {
    return await axios.patch(`/banner/display/${bannerId}`);
  },
};

export default bannerService;