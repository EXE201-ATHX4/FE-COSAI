import { Box, Container } from "@mui/material";

import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import CustomerReviews from "./CustomerReviews";
import BlogSection from "./BlogSection";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";

function Product() {
  return (
    <Box sx={{ bgcolor: "#f5f5f1", minHeight: "100vh" }}>
      <Header />
      <HeroBanner />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProductList />
      </Container>
      <CustomerReviews />
      <BlogSection />
      <Footer />
    </Box>
  );
}

export default Product;
