import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import cartService, { Confirmation } from "../../services/cartService";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirmed?: () => void;
}

const ConfirmCheckoutModal: React.FC<Props> = ({ open, onClose, onConfirmed }) => {
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  useEffect(() => {
    if (open) {
      setLoading(true);
      cartService
        .confirmCheckout()
        .then((data) => setConfirmation(data))
        .catch((err) => console.error("❌ Lỗi khi xác nhận:", err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  const handleConfirm = async () => {
    await cartService.checkout();
    onConfirmed?.();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Xác nhận đơn hàng</DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <CircularProgress />
        ) : !confirmation ? (
          <Typography>Không thể xác nhận đơn hàng.</Typography>
        ) : (
          <>
            {confirmation.items.map((item) => (
              <Box key={item.productId} sx={{ mb: 2 }}>
                <Typography fontWeight={600}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.variant?.name && `Biến thể: ${item.variant.name}`}
                </Typography>
                <Typography>Số lượng: {item.quantity}</Typography>
                <Typography>Giá: ₫{item.price.toLocaleString()} → Tổng: ₫{item.subTotal.toLocaleString()}</Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))}

            <Box sx={{ mt: 2 }}>
              <Typography>Tổng tiền hàng: ₫{confirmation.totalAmount.toLocaleString()}</Typography>
              <Typography>Phí vận chuyển: ₫{confirmation.shippingFee.toLocaleString()}</Typography>
              <Typography>Giảm giá: ₫{confirmation.discount.toLocaleString()}</Typography>
              <Typography fontWeight={700} mt={1}>
                Tổng thanh toán: ₫{confirmation.totalPayable.toLocaleString()}
              </Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary" disabled={loading || !confirmation}>
          Xác nhận thanh toán
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmCheckoutModal;