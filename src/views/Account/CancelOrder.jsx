import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  Breadcrumbs,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  FormControl,
  FormLabel,
} from "@mui/material";

const CancelOrder = () => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const orderInfo = {
    id: "#103DDEA",
    date: "10/03/2025",
    status: "Đang xử lý",
    statusColor: "warning",
    items: [
      {
        name: "Bột khử mùi Thiên nhiên",
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    total: "130.000 đ",
  };

  const cancelReasons = [
    "Thay đổi địa chỉ giao hàng",
    "Muốn thay đổi phương thức thanh toán",
    "Áp dụng thêm mã giảm giá/khuyến mãi",
    "Tìm thấy sản phẩm giá tốt hơn",
    "Đổi ý không muốn mua nữa",
    "Lý do khác",
  ];

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleCancel = () => {
    // Handle cancel order logic
    console.log(
      "Cancel order:",
      orderInfo.id,
      "Reason:",
      selectedReason,
      "Other:",
      otherReason
    );
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit">
          Tài khoản
        </Link>
        <Link underline="hover" color="inherit">
          Đơn hàng của tôi
        </Link>
        <Typography color="text.primary">Hủy đơn</Typography>
      </Breadcrumbs>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Đơn hàng của tôi
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Chip label="Tất cả" color="success" />
            <Chip label="Chờ xác nhận" variant="outlined" />
            <Chip label="Đang vận chuyển" variant="outlined" />
            <Chip label="Giao thành công" variant="outlined" />
            <Chip label="Đã hủy" variant="outlined" />
          </Box>

          <Card variant="outlined">
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography variant="h6">{orderInfo.id}</Typography>
                  <Chip
                    label={orderInfo.status}
                    color={orderInfo.statusColor}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {orderInfo.date}
                </Typography>
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Avatar
                  src={orderInfo.items[0].image}
                  variant="rounded"
                  sx={{ width: 60, height: 60 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body1">
                    {orderInfo.items[0].name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Số lượng: {orderInfo.items[0].quantity}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  pt: 2,
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <Typography variant="h6">
                  Tổng tiền: {orderInfo.total}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button variant="outlined" size="small">
                    Hủy đơn
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ backgroundColor: "#4CAF50" }}
                  >
                    Chi tiết
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Hủy đơn hàng #{orderInfo.id}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Ngày đặt hàng:
              </Typography>
              <Typography variant="body1">{orderInfo.date}</Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Tổng tiền:
              </Typography>
              <Typography variant="body1">{orderInfo.total}</Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Trạng thái:
              </Typography>
              <Chip
                label={orderInfo.status}
                color={orderInfo.statusColor}
                size="small"
              />
            </Grid>
          </Grid>

          <FormControl component="fieldset" sx={{ mb: 3 }}>
            <FormLabel component="legend">
              <Typography variant="h6" gutterBottom>
                Lý do hủy đơn hàng
              </Typography>
            </FormLabel>
            <RadioGroup value={selectedReason} onChange={handleReasonChange}>
              {cancelReasons.map((reason, index) => (
                <FormControlLabel
                  key={index}
                  value={reason}
                  control={<Radio />}
                  label={reason}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" gutterBottom>
              Chi tiết lý do
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Vui lòng nhập chi tiết lý do hủy đơn hàng..."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              variant="outlined"
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined">Quay lại</Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4CAF50" }}
              onClick={handleCancel}
            >
              Xác thực hủy đơn
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CancelOrder;
