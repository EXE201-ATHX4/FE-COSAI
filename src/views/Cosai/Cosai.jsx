import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { HeroSection } from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import ChatDemoSection from "./sections/ChatbotSection";
import ProcessStepsSection from "./sections/ProcessOverviewSection";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { motion } from "framer-motion";
import Chatbox from "./ChatBox";

export const Cosai = () => {
  // Testimonials Section Component
  const TestimonialsSection = () => {
    const testimonials = [
      {
        name: "Trương Gia Hưng",
        comment: "Tư vấn nhanh - hỗ trợ ngay lập tức",
      },
      {
        name: "Trần Viết Hội",
        comment: "Xác định được vấn đề khách hàng gặp",
      },
      {
        name: "Nguyễn Viết Hường",
        comment: "Tuyệt vời có thể tư vấn rất cụ thể",
      },
      {
        name: "Minh Hoang Truong",
        comment: "THẬT TUYỆT VỜI !!!",
      },
    ];

    return (
      <Box sx={{ py: 8, bgcolor: "#f2eee5" }}>
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box sx={{ textAlign: "center", mb: 6, position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: "200px",
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
                width: "200px",
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
              KHÁCH HÀNG NÓI GÌ{" "}
              <Box component="span" sx={{ color: "#329066" }}>
                VỀ COSAI
              </Box>
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    bgcolor: "white",
                    borderRadius: "10px",
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: "#329066",
                      mr: 2,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#023a15", mb: 0.5 }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#666" }}>
                      {testimonial.comment}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Comment Input */}
          <Box sx={{ mt: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "white",
                borderRadius: "10px",
                border: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body1" sx={{ color: "#828282" }}>
                <Box component="span" sx={{ fontWeight: 400 }}>
                  Để lại{" "}
                </Box>
                <Box component="span" sx={{ fontWeight: "bold" }}>
                  đánh giá COSAI
                </Box>
                <Box component="span" sx={{ fontWeight: 400 }}>
                  {" "}
                  của bạn tại đây...
                </Box>
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#329066",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": { bgcolor: "#277553" },
                }}
              >
                Gửi bình luận
              </Button>
            </Paper>
          </Box>
        </Container>
      </Box>
    );
  };

  // CTA Section Component
  const CTASection = () => (
    <Box
      sx={{ py: 8, bgcolor: "#329066", color: "white", textAlign: "center" }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2rem", md: "3rem" },
          }}
        >
          Bắt đầu tư vấn ngay hôm nay
        </Typography>
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            color: "#fdf5f3",
            fontSize: "1.2rem",
          }}
        >
          Khám phá giải pháp chăm sóc cơ thể phù hợp nhất dành cho bạn
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "#fdf5f3",
            color: "#329066",
            fontWeight: "bold",
            px: 6,
            py: 2,
            fontSize: "1.2rem",
            "&:hover": { bgcolor: "#f0ebe3" },
          }}
        >
          Tư vấn miễn phí
        </Button>
      </Container>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: "#fdf5f3" }}>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: "100vh", background: "#f2eee5" }}
      >
        <HeroSection />
        <FeaturesSection />
        <ChatDemoSection />
        <ProcessStepsSection />
        <TestimonialsSection />
        <CTASection />
      </motion.div>
      <Chatbox/>

      <Footer />
    </Box>
  );
};
