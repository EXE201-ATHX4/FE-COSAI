import { Box, Container, Grid, Typography, Button } from "@mui/material";
import React from "react";

export const HeroSection = () => (
    <Box
        sx={{
            background: "white",
            minHeight: "700px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
        }}
    >
        {/* Dải màu xanh ở giữa */}
        <Box
            sx={{
                background: "#329066",
                width: "100%",
                height: { xs: "350px", md: "400px", lg: "450px" },
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
            }}
        />

        {/* Nội dung bên trong Container (văn bản và nút) */}
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={5} lg={4}>
                    {/* Phần "Tư vấn mỹ phẩm thông minh với AI" được chia làm hai dòng */}
                    <Typography
                        variant="h3"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: { xs: "2rem", md: "2.5rem" },
                            lineHeight: 1.2,
                            mb: 0.5,
                        }}
                    >
                        Tư vấn mỹ phẩm thông
                    </Typography>
                    <Typography
                        variant="h4"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: { xs: "1.7rem", md: "2.2rem" },
                            lineHeight: 1.2,
                            mb: 2,
                        }}
                    >
                    minh với AI
                    </Typography>
                        <Box sx={{
                            width: "100%",
                            maxWidth: "200px",
                        }}>
                        <Typography
                        variant="body1"
                        sx={{
                            color: "#fdf5f3",
                            mb: 4,
                            fontSize: { xs: "0.9rem", md: "1rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        Trải nghiệm tư vấn mỹ phẩm cá nhân hóa với công nghệ AI tiên tiến, giúp bạn tìm được sản phẩm phù hợp nhất
                    </Typography>
                        </Box>
                    
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: "#2a7a59",
                                color: "#fdf5f3",
                                fontWeight: "bold",
                                px: 3,
                                py: 1,
                                "&:hover": { bgcolor: "#256a4c" },
                            }}
                        >
                            Bắt Đầu Ngay
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: "#2a7a59",
                                color: "#2a7a59",
                                fontWeight: "bold",
                                px: 3,
                                py: 1,
                                bgcolor: "transparent",
                                "&:hover": {
                                    borderColor: "#256a4c",
                                    color: "#256a4c",
                                    bgcolor: "rgba(42, 122, 89, 0.1)"
                                },
                            }}
                        >
                            Tìm hiểu thêm
                        </Button>
                    </Box>
                </Grid>
                {/* Grid item bên phải không chứa ảnh nữa, ảnh được định vị tuyệt đối riêng */}
                <Grid item xs={12} md={7} lg={8} />
            </Grid>
        </Container>

        {/* Chữ COSAI được đặt riêng để dễ dàng điều chỉnh kích thước và vị trí so với văn bản */}
        <Typography
            variant="h1"
            sx={{
                color: "#fdf5f3",
                fontWeight: "800",
                fontSize: "140px",
                position: "absolute",
                top: { xs: "35%", md: "40%" },
                left: { xs: "50%", md: "55%", lg: "58%" },
                transform: "translate(-135%, -20%)",
                zIndex: 1,
                whiteSpace: "nowrap",
                fontFamily: "Antontone, sans-serif",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",

            }}
        >
            COSAI
        </Typography>
        {/* Hình ảnh được định vị tuyệt đối so với HeroSection */}
        <Box
            component="img"
            src="https://c.animaapp.com/mbs5h78mOlSTof/img/ellipse-106-1.png"
            alt="COSAI AI Assistant"
            sx={{
                width: "100%",
                maxWidth: { xs: "350px", md: "550px", lg: "650px" },
                height: "auto",
                position: "absolute",
                right: { xs: '5%', md: '5%', lg: '10%' },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                borderRadius: "20px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            }}
        />
    </Box>
);