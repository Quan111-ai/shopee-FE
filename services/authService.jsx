import axios from "../utils/axiosInstance";

const authService = {
  // 🔸 Đăng nhập bằng email và password
  login: async (email, password) => {
    const response = await axios.post("/login", { email, password });
    return response;
  },

  // 🔸 Kiểm tra trạng thái đăng nhập
  getStatus: async () => {
    const response = await axios.get("/login/status");
    return response;
  },

  // 🔸 Đăng nhập bằng Google (gọi URL, không dùng axios)
  loginWithGoogle: () => {
    window.location.href = "http://localhost:3000/login/google";
  },

  // 🔸 Đăng nhập bằng Facebook
  loginWithFacebook: () => {
    window.location.href = "http://localhost:3000/login/facebook";
  },

  // 🟡 (Tuỳ) Logout hoặc gọi profile sau này
};

export default authService;