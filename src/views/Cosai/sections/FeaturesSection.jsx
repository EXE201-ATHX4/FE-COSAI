import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import React from "react";

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: "🔍",
      title: "PHÂN TÍCH THÓI QUEN MUA SẮM",
      description:
        "Sử dụng AI để theo dõi và phân tích thói quen mua sắm của khách hàng để đề xuất sản phẩm phù hợp.",
    },
    {
      icon: "💬",
      title: "TƯ VẤN KHÁCH HÀNG 24/7",
      description:
        "Hỗ trợ tư vấn về tất cả các câu hỏi về sản phẩm thông qua chatbot thông minh 24/7.",
    },
    {
      icon: "👁️",
      title: "THEO DÕI TIẾN TRÌNH",
      description:
        "Cập nhật và ghi nhận tình trạng sản phẩm trong quá trình sử dụng sản phẩm cho khách hàng.",
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: "#fdf5f3" }}>
      <Container maxWidth="lg">
        {/* Section Title with lines on both sides */}
        <Box sx={{ textAlign: "center", mb: 6, position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              width: "300px",
              height: "2px",
              bgcolor: "#023a15",
              transform: "translateY(-50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              width: "300px",
              height: "2px",
              bgcolor: "#023a15",
              transform: "translateY(-50%)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Anton', Helvetica",
              fontSize: "45px",
              fontWeight: "normal",
              lineHeight: "normal",
              color: "#023a15",
              position: "relative",
              zIndex: 1,
              display: "inline-block",
              padding: "0 20px",
            }}
          >
            TÍNH NĂNG{" "}
            <Box component="span" sx={{ color: "#329066" }}>
              NỔI BẬT
            </Box>
          </Typography>
        </Box>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "left",
                  bgcolor: "white",
                  borderRadius: "15px",
                  border: "1px solid #e0e0e0",
                  height: "100%",
                  width: "100%", // Đảm bảo chiều rộng tự động điều chỉnh
                  maxWidth: "300px", // Giới hạn chiều rộng tối đa cho từng feature
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 10px 30px rgba(50, 144, 102, 0.1)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ fontSize: "3rem", mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#023a15",
                    mb: 2,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    lineHeight: 1.6,
                    flexGrow: 1,
                  }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
