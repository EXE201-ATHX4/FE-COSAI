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
  Tabs,
  Tab,
} from "@mui/material";

const OrderDetail = ({ order, onBack }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const cancelReasons = [
    "Thay đổi địa chỉ giao hàng",
    "Muốn thay đổi phương thức thanh toán",
    "Áp dụng thêm mã giảm giá/khuyến mãi",
    "Tìm thấy sản phẩm giá tốt hơn",
    "Đổi ý không muốn mua nữa",
    "Lý do khác",
  ];

  const tabs = [
    "Tất cả",
    "Chờ xác nhận",
    "Đang vận chuyển",
    "Giao thành công",
    "Đã hủy",
  ];

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleCancel = () => {
    console.log(
      "Cancel order:",
      order.id,
      "Reason:",
      selectedReason,
      "Other:",
      otherReason
    );
    // Handle cancel order logic here
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={onBack}
          sx={{ cursor: "pointer" }}
        >
          Tài khoản
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={onBack}
          sx={{ cursor: "pointer" }}
        >
          Đơn hàng của tôi
        </Link>
        <Typography color="text.primary">Hủy đơn</Typography>
      </Breadcrumbs>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Đơn hàng của tôi
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{ mb: 3 }}
          >
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab} />
            ))}
          </Tabs>

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
                  <Typography variant="h6">{order.id}</Typography>
                  <Chip
                    label={order.status}
                    color={order.statusColor}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {order.date}
                </Typography>
              </Box>

              {order.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
                >
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Số lượng: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}

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
                <Typography variant="h6">Tổng tiền: {order.total}</Typography>
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
            Hủy đơn hàng {order.id}
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Ngày đặt hàng:
              </Typography>
              <Typography variant="body1">{order.date}</Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Tổng tiền:
              </Typography>
              <Typography variant="body1">{order.total}</Typography>
            </Grid>
            <Grid item size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="text.secondary">
                Trạng thái:
              </Typography>
              <Chip
                label={order.status}
                color={order.statusColor}
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
            <Button variant="outlined" onClick={onBack}>
              Quay lại
            </Button>
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

export default OrderDetail;
