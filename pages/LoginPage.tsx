import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import authService from "../services/authService";
import qr1 from "../assets/images/qr-code.png";

const qrList: string[] = [qr1];

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [showQR, setShowQR] = useState<boolean>(false);
  const [qrSrc, setQrSrc] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      console.log("🎯 Đăng nhập thành công:", user);
      setSuccessMsg("✅ Đăng nhập thành công!");
      setTimeout(() => {
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "seller") navigate("/seller");
        else navigate("/");
      }, 1500);
    } catch (error) {
      setErrorMsg("Thông tin không chính xác hoặc tài khoản không tồn tại.");
      console.error("❌ Lỗi đăng nhập:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenQR = () => {
    const random = Math.floor(Math.random() * qrList.length);
    setQrSrc(qrList[random]);
    setShowQR(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        position: "relative",
        maxWidth: 420,
        mx: "auto",
        mt: 10,
        p: 4,
        boxShadow: 4,
        borderRadius: 2,
        bgcolor: "#fff",
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={3}>
        Đăng nhập Clone Shopee
      </Typography>

      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <TextField
        label="Mật khẩu"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 2, bgcolor: "#ee4d2d", fontWeight: 600 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
      </Button>

      {/* 🔸 QR biểu tượng Shopee */}
      <Box
        onClick={handleOpenQR}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          bgcolor: "#fff8e1",
          borderRadius: 1.5,
          px: 1.5,
          py: 1,
          mt: 3,
          cursor: "pointer",
          boxShadow: 1,
          justifyContent: "center",
          "&:hover": { bgcolor: "#fff3c0" },
        }}
      >
        <QrCode2Icon sx={{ fontSize: 24, color: "#ee4d2d" }} />
        <Typography fontSize={14} fontWeight={500} color="#333">
          Đăng nhập với mã QR
        </Typography>
      </Box>

      {/* 🔸 Nút đăng nhập Google & Facebook */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<GoogleIcon />}
          sx={{
            borderColor: "#4285F4",
            color: "#4285F4",
            fontWeight: 600,
            textTransform: "none",
            ":hover": { bgcolor: "#e8f0fe", borderColor: "#4285F4" },
          }}
          href="http://localhost:3000/auth/google"
        >
          Google
        </Button>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FacebookIcon />}
          sx={{
            borderColor: "#1877F2",
            color: "#1877F2",
            fontWeight: 600,
            textTransform: "none",
            ":hover": { bgcolor: "#ebf3ff", borderColor: "#1877F2" },
          }}
          href="http://localhost:3000/auth/facebook"
        >
          Facebook
        </Button>
      </Box>

      {/* 🔸 Popup hiển thị mã QR */}
      {showQR && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowQR(false)}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              bgcolor: "#fff",
              p: 3,
              borderRadius: 2,
              boxShadow: 5,
              textAlign: "center",
              position: "relative",
              minWidth: 280,
            }}
          >
            <IconButton
              size="small"
              onClick={() => setShowQR(false)}
              sx={{ position: "absolute", top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography fontWeight={600} mb={2}>
              Quét mã bằng ứng dụng Shopee
            </Typography>
            <Box
              component="img"
              src={qrSrc}
              alt="Mã QR"
              sx={{ width: 160, height: 160 }}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginPage;