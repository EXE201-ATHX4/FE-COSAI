import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Breadcrumbs,
  Link,
  Avatar,
} from "@mui/material";
import {
  CardGiftcard as GiftIcon,
  Percent as PercentIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import Cocoon from "../../assets/Brand/Cocoon.png";
import CoMem from "../../assets/Brand/CoMem.png";
import ThoRaKao from "../../assets/Brand/ThoRaKao.png";

const LoyaltyPoints = () => {
  const pointsHistory = [
    {
      date: "01/02/2025",
      activity: "Đổi điểm lấy Voucher",
      points: -100,
      status: "Đã sử dụng",
      statusColor: "info",
    },
    {
      date: "28/06/2024",
      activity: "Mua hàng #HD456AABB",
      points: +200,
      status: "Hoàn thành",
      statusColor: "success",
    },
    {
      date: "15/05/2024",
      activity: "Mua hàng #HD286BBAA",
      points: +500,
      status: "Hoàn thành",
      statusColor: "success",
    },
  ];

  const vouchers = [
    {
      brand: "Cocoon",
      title: "Voucher Cocoon 100.000 đ",
      points: 100,
      image: Cocoon,
      hot: true,
    },
    {
      brand: "Cocoon",
      title: "Voucher Cocoon 10.000 đ",
      points: 10,
      image: Cocoon,
      hot: true,
    },
    {
      brand: "Thorakao",
      title: "Voucher Thorakao 30.000 đ",
      points: 20,
      image: ThoRaKao,
      hot: true,
    },
    {
      brand: "Cỏ Mềm",
      title: "Voucher Cỏ Mềm 50.000 đ",
      points: 50,
      image: CoMem,
    },
    {
      brand: "Cỏ Mềm",
      title: "Voucher Cỏ Mềm 60.000 đ",
      points: 60,
      image: CoMem,
    },
  ];

  const benefits = [
    {
      icon: <GiftIcon sx={{ color: "#f44336" }} />,
      title: "ĐỔI QUÀ",
      description: "Đổi điểm lấy voucher giảm giá hoặc quà tặng hấp dẫn",
      bgColor: "#ffebee",
    },
    {
      icon: <PercentIcon sx={{ color: "#9c27b0" }} />,
      title: "ƯU ĐÃI ĐẶC BIỆT",
      description: "Được hưởng những ưu đãi đặc biệt dành riêng cho thành viên",
      bgColor: "#f3e5f5",
    },
    {
      icon: <StarIcon sx={{ color: "#ff9800" }} />,
      title: "NÂNG HẠNG",
      description: "Tích điểm để nâng hạng và nhận thêm nhiều đặc quyền",
      bgColor: "#fff3e0",
    },
  ];

  const getPointsStatusChipProps = (status) => {
    switch (status) {
      case "Đã sử dụng":
        return {
          sx: {
            backgroundColor: "#E3F2FD",
            color: "#1976D2",
            fontWeight: "bold",
          },
        };
      case "Hoàn thành":
        return {
          sx: {
            backgroundColor: "#E8F5E8",
            color: "#2E7D32",
            fontWeight: "bold",
          },
        };
      default:
        return {
          sx: {
            backgroundColor: "#F5F5F5",
            color: "#757575",
            fontWeight: "bold",
          },
        };
    }
  };

  return (
    <Box>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit">
          Tài khoản
        </Link>
        <Typography color="text.primary">Điểm tích lũy</Typography>
      </Breadcrumbs>

      {/* Points Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              backgroundColor: "#81D4FA",
              color: "white",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Typography variant="body2">Tổng điểm đã có</Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                2,860
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              backgroundColor: "#AED581",
              color: "white",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Typography variant="body2">Hạng thành viên</Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Vàng
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              backgroundColor: "#FFAB91",
              color: "white",
              textAlign: "center",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Typography variant="body2">Điểm sắp hết hạn</Typography>
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                200
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Points History */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lịch sử điểm thưởng
          </Typography>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Hoạt động</TableCell>
                  <TableCell>Tích điểm</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pointsHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.activity}</TableCell>
                    <TableCell
                      sx={{ color: item.points > 0 ? "green" : "red" }}
                    >
                      {item.points > 0 ? "+" : ""}
                      {item.points}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        size="small"
                        {...getPointsStatusChipProps(item.status)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Voucher Exchange */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Đổi điểm lấy Voucher
          </Typography>

          <Grid container spacing={2}>
            {vouchers.map((voucher, index) => (
              <Grid item size={{ xs: 12, sm: 6, md: 2.4 }} key={index}>
                <Card variant="outlined" sx={{ position: "relative" }}>
                  {voucher.hot && (
                    <Chip
                      label="HOT"
                      color="error"
                      size="small"
                      sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                    />
                  )}
                  <CardContent sx={{ textAlign: "center", p: 2 }}>
                    <Avatar
                      src={voucher.image}
                      variant="rounded"
                      sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, fontSize: "0.8rem" }}
                    >
                      {voucher.title}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      sx={{
                        backgroundColor: "#4CAF50",
                        fontSize: "0.7rem",
                        "&:hover": {
                          backgroundColor: "#45a049",
                        },
                      }}
                    >
                      Đổi {voucher.points} điểm
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Member Benefits */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quyền lợi Thành viên
          </Typography>

          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={index}>
                <Card sx={{ backgroundColor: benefit.bgColor, height: "100%" }}>
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2">
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoyaltyPoints;
