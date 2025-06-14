import { Box, Typography, Grid, Button, CardMedia } from "@mui/material";
import BiDao from "../../assets/BiDao.png";
import Buoi from "../../assets/Buoi.png";
import HoaHong from "../../assets/HoaHong.png";
import CaPhe from "../../assets/CaPhe.png";

const blogPosts = [
  {
    id: 1,
    title: "BÍ ĐAO",
    image: BiDao,
    content:
      "Giàu vitamin B, C và chất xơ, bí đao giúp thanh nhiệt, giải độc cơ thể, hỗ trợ tiêu hóa và giảm cân hiệu quả. Trong chăm sóc da, bí đao có khả năng dưỡng ẩm, làm dịu da, giảm viêm và hỗ trợ điều trị mụn nhờ đặc tính kháng khuẩn tự nhiên. Ngoài ra, các chất chống oxy hóa trong bí đao còn giúp ngăn ngừa lão hóa, mang lại làn da tươi sáng và khỏe mạnh.",
  },
  {
    id: 2,
    title: "VỎ BƯỞI",
    image: Buoi,
    content:
      "Nhờ chứa nhiều tinh dầu, flavonoid và vitamin C, vỏ bưởi giúp kích thích mọc tóc, ngăn rụng và làm tóc chắc khỏe. Trong chăm sóc da, nó có tác dụng kháng khuẩn, giảm viêm, hỗ trợ làm sáng da và mờ thâm. Ngoài ra, vỏ bưởi còn giúp thanh lọc cơ thể, hỗ trợ tiêu hóa, giảm cân và tăng cường miễn dịch. Hương thơm tự nhiên của vỏ bưởi cũng giúp thư giãn, giảm căng thẳng hiệu quả.",
  },
  {
    id: 3,
    title: "HOA HỒNG",
    image: HoaHong,
    content:
      "Nước hoa hồng giúp cân bằng độ ẩm, se khít lỗ chân lông, làm dịu da và giảm viêm nhờ đặc tính kháng khuẩn, chống oxy hóa. Tinh dầu hoa hồng còn có tác dụng dưỡng da, làm mềm mịn, ngăn ngừa lão hóa và hỗ trợ làm mờ vết thâm. Hương thơm giúp thư giãn tinh thần, giảm căng thẳng và cải thiện giấc ngủ.",
  },
  {
    id: 4,
    title: "CÀ PHÊ",
    image: CaPhe,
    content:
      "Cà phê giúp tăng cường tập trung, cải thiện trí nhớ và thúc đẩy trao đổi chất, hỗ trợ giảm cân. Trong chăm sóc da, bã cà phê có tác dụng tẩy tế bào chết, làm sáng da, giảm sần vỏ cam và kích thích tuần hoàn máu, giúp da săn chắc hơn. Ngoài ra, hương thơm cà phê còn giúp giảm căng thẳng, tạo cảm giác thư giãn và cải thiện tâm trạng.",
  },
];

function BlogSection() {
  return (
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          bgcolor: "#0a5c36",
          py: 3,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "white",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Bạn có biết
        </Typography>
        <Typography variant="body1" sx={{ color: "white", mt: 1, px: 2 }}>
          Những nguyên liệu thiên nhiên như tinh dầu thảo mộc, bơ hạt mỡ, trà
          xanh... không chỉ dịu nhẹ mà còn nuôi dưỡng làn da an toàn, hiệu quả.
          Hãy cùng khám phá các thành phần thiên nhiên tuyệt vời trong chăm sóc
          cơ thể!
        </Typography>
      </Box>
      <Box sx={{ px: { xs: 2, sm: 4, md: 10, lg: "200px" } }}>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item size={{ xs: 12 }} key={post.id} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                }}
              >
                <Box
                  sx={{ width: "30%", position: "relative", minHeight: 240 }}
                >
                  <CardMedia
                    component="img"
                    image={post.image || "/placeholder.svg"}
                    alt={post.title}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
                <Box sx={{ width: "70%", px: 4 }}>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ fontWeight: "bold", mb: 2, color: "#0a5c36" }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ color: "#213547" }}
                  >
                    {post.content}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: "#e0e0e0",
                      color: "#333",
                      "&:hover": { bgcolor: "#d5d5d5" },
                      borderRadius: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Xem thêm
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default BlogSection;
