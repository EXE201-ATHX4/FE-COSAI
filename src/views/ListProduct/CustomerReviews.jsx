import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Avatar,
} from "@mui/material";
import { ThumbUp, ThumbDown } from "@mui/icons-material";

const reviews = [
  {
    id: 1,
    name: "Trương Gia Hung",
    comment: "Sản phẩm vô cùng chất lượng",
    isPositive: true,
  },
  {
    id: 2,
    name: "Ngo Dinh Anh",
    comment: "Hàng giả, chất lượng kém",
    isPositive: false,
  },
  {
    id: 3,
    name: "Nguyễn Việt Hương",
    comment: "Sản phẩm rất tuyệt vời",
    isPositive: true,
  },
  {
    id: 4,
    name: "Minh Hoang Truong",
    comment: "Tư vấn qua AI nhanh, gọn và tiện",
    isPositive: true,
  },
];

function CustomerReviews({ productId }) {
  const [gender, setGender] = useState("male");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(3);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmitReview = () => {
    console.log({ gender, comment, rating, productId });
    setComment("");
  };

  return (
    <Box sx={{ my: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: 1,
            bgcolor: "#0a5c36",
            width: "100%",
            position: "absolute",
            zIndex: 0,
          }}
        />
        <Typography
          variant="h4"
          component="h2"
          sx={{
            color: "#0a5c36",
            fontWeight: "bold",
            textTransform: "uppercase",
            textAlign: "center",
            px: 4,
            bgcolor: "#f5f5f1",
            zIndex: 1,
          }}
        >
          Phản hồi của khách hàng
        </Typography>
      </Box>
      <Box sx={{ px: { xs: 2, sm: 4, md: 10, lg: "200px" } }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {reviews.map((review) => (
            <Grid item size={{ xs: 12, sm: 6 }} key={review.id}>
              <Box
                sx={{
                  display: "flex",
                  p: 3,
                  bgcolor: "#f9f9f9",
                  borderRadius: 1,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: "#0a5c36",
                    mr: 2,
                  }}
                  src="/placeholder.svg?height=40&width=40"
                  alt={review.name}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 0.5, color: "#213547" }}
                  >
                    {review.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1, color: "#213547" }}>
                    {review.comment}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    {review.isPositive ? (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#1976d2",
                        }}
                      >
                        <ThumbUp sx={{ fontSize: 20, mr: 0.5 }} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "#d32f2f",
                        }}
                      >
                        <ThumbDown sx={{ fontSize: 20, mr: 0.5 }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            p: 3,
            bgcolor: "#f9f9f9",
            borderRadius: 1,
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Để lại bình luận của bạn tại đây..."
            value={comment}
            onChange={handleCommentChange}
            sx={{
              mb: 2,
              bgcolor: "#f5f5f1",
              "& .MuiOutlinedInput-root": {
                borderRadius: 1,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RadioGroup row value={gender} onChange={handleGenderChange}>
                <FormControlLabel
                  value="male"
                  control={<Radio size="small" />}
                  label="Anh"
                  sx={{ color: "#213547" }}
                />
                <FormControlLabel
                  value="female"
                  control={<Radio size="small" />}
                  label="Chị"
                  sx={{ color: "#213547" }}
                />
              </RadioGroup>
              <TextField
                placeholder="Họ và tên"
                size="small"
                sx={{
                  ml: 2,
                  width: { xs: "100%", sm: 200 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: { xs: 2, sm: 0 },
              }}
            >
              <Typography variant="body2" sx={{ mr: 1, color: "#213547" }}>
                Đánh giá
              </Typography>
              <Box sx={{ display: "flex" }}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <Box
                    key={value}
                    component="span"
                    onClick={() => handleRatingChange(value)}
                    sx={{
                      cursor: "pointer",
                      color: value <= rating ? "#ffc107" : "#e0e0e0",
                      mx: 0.5,
                    }}
                  >
                    ★
                  </Box>
                ))}
              </Box>
              <Button
                variant="contained"
                onClick={handleSubmitReview}
                sx={{
                  ml: 2,
                  bgcolor: "#0a5c36",
                  "&:hover": { bgcolor: "#084c2d" },
                  borderRadius: 1,
                }}
              >
                Gửi bình luận
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default CustomerReviews;
