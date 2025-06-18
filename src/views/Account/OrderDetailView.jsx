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
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { LocalShipping, Payment, LocationOn, Phone } from "@mui/icons-material";

const OrderDetailView = ({ order, onBack }) => {
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
        <Typography color="text.primary">Chi tiết đơn hàng</Typography>
      </Breadcrumbs>

      {/* Order Status */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h5">Đơn hàng {order.id}</Typography>
            <Chip
              label={order.status}
              size="large"
              sx={{
                backgroundColor:
                  order.statusColor === "warning" ? "#FFF3E0" : "#E8F5E8",
                color: order.statusColor === "warning" ? "#F57C00" : "#2E7D32",
                fontWeight: "bold",
                fontSize: "1rem",
                height: "32px",
              }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            Đặt hàng vào {order.date}
          </Typography>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sản phẩm đã đặt
          </Typography>
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell align="center">Số lượng</TableCell>
                  <TableCell align="right">Đơn giá</TableCell>
                  <TableCell align="right">Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={item.image}
                          variant="rounded"
                          sx={{ width: 50, height: 50 }}
                        />
                        <Typography variant="body1">{item.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right">{order.total}</TableCell>
                    <TableCell align="right">{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Box sx={{ minWidth: 200 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Tạm tính:</Typography>
                <Typography>{order.total}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Phí vận chuyển:</Typography>
                <Typography>Miễn phí</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Tổng cộng:</Typography>
                <Typography variant="h6" color="primary">
                  {order.total}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Shipping & Payment Info */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <LocalShipping sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Thông tin giao hàng</Typography>
              </Box>
              <Typography variant="body2" gutterBottom>
                <strong>Người nhận:</strong> Nguyễn Văn Tèo
              </Typography>
              <Typography variant="body2" gutterBottom>
                <Phone sx={{ fontSize: 16, mr: 0.5 }} />
                0903783442
              </Typography>
              <Typography variant="body2">
                <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                Số 45 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP.HCM
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Payment sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Phương thức thanh toán</Typography>
              </Box>
              <Typography variant="body2" gutterBottom>
                Thanh toán khi nhận hàng (COD)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bạn sẽ thanh toán bằng tiền mặt khi nhận được hàng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={onBack}>
          Quay lại danh sách đơn hàng
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          {order.status === "Đang xử lý" && (
            <Button variant="outlined" color="error">
              Hủy đơn hàng
            </Button>
          )}
          {order.status === "Đã giao" && (
            <>
              <Button variant="outlined">Đánh giá sản phẩm</Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  "&:hover": { backgroundColor: "#45a049" },
                }}
              >
                Mua lại
              </Button>
            </>
          )}
          <Button variant="outlined">Liên hệ hỗ trợ</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderDetailView;
