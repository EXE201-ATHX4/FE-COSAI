import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";

export const CallToActionSection = () => {
  // Testimonial data for mapping
  const testimonials = [
    {
      id: 1,
      name: "Trương Gia Hưng",
      comment: "Tư vấn nhanh - hỗ trợ ngay lập tức",
    },
    {
      id: 2,
      name: "Trần Viết Hội",
      comment: "Xác định được vấn đề khách hàng gặp",
    },
    {
      id: 3,
      name: "Nguyễn Viết Hường",
      comment: "Tuyệt vời có thể tư vấn rất cụ thể",
    },
    {
      id: 4,
      name: "Minh Hoang Truong",
      comment: "THẬT TUYỆT VỜI !!!",
    },
  ];

  return (
    <Box sx={{ width: "100%", my: 4 }}>
      <Box>
        {/* Testimonial Grid */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={6} key={testimonial.id}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: "#f2eee5",
                  borderRadius: 2,
                  border: "1px solid #c8c8c8c7",
                  height: "104px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#329066",
                    mr: 2.5,
                  }}
                >
                  <PersonIcon sx={{ width: 39, height: 42 }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="#252525"
                    sx={{ mb: 0.5 }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body1" color="#252525">
                    {testimonial.comment}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Comment Input Section */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            bgcolor: "#f2eee5",
            borderRadius: 2,
            border: "1px solid #c8c8c8c7",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body1" color="#828282" sx={{ ml: 1 }}>
            <span style={{ fontWeight: 500 }}>Để lại </span>
            <span style={{ fontWeight: 700 }}>đánh giá COSAI</span>
            <span style={{ fontWeight: 500 }}> của bạn tại đây...</span>
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#329066",
              color: "#f2eee5",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#277553" },
              px: 2.5,
            }}
          >
            Gửi bình luận
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};
export default CallToActionSection;