import { Box, Container, Grid, Typography, Button, Paper, Avatar, TextField, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
const ProcessStepsSection = () => {
  const steps = [
    {
      number: "1",
      title: "BẮT ĐẦU TRÒ CHUYỆN",
      description: "Khởi động cuộc trò chuyện với COSAI",
    },
    {
      number: "2",
      title: "PHÂN TÍCH NHU CẦU",
      description: "COSAI phân tích thông tin của bạn",
    },
    {
      number: "3",
      title: "ĐỀ XUẤT SẢN PHẨM",
      description: "Nhận gợi ý sản phẩm phù hợp",
    },
    {
      number: "4",
      title: "THEO DÕI KẾT QUẢ",
      description: "Đánh giá và điều chỉnh sản phẩm",
    },
  ];

  return (
    <Box sx={{ py: 8, bgcolor: "#fdf5f3" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Box sx={{ textAlign: "center", position: "relative" }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "#1E1E1E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: "white", fontWeight: "bold" }}
                  >
                    {step.number}
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#023a15", mb: 1 }}
                >
                  {step.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {step.description}
                </Typography>
                {index < steps.length - 1 && (
                  <Box
                    sx={{
                      display: "block",
                      position: "absolute",
                      right: "-15%",
                      top: "10px",
                      fontSize: "40px",
                      color: "#FDF5F3",
                      fontFamily: "Anton, Helvetica",
                    }}
                  >
                    →
                  </Box>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#329066",
              color: "white",
              fontWeight: "bold",
              borderRadius: "20px",
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              "&:hover": { bgcolor: "#277553" },
            }}
          >
            QUY TRÌNH TƯ VẤN RÕ RÀNG
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
export default ProcessStepsSection;