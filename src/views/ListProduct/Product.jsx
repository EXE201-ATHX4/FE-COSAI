import { Box, Container } from "@mui/material";

import HeroBanner from "./HeroBanner";
import ProductList from "./ProductList";
import CustomerReviews from "./CustomerReviews";
import BlogSection from "./BlogSection";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { motion } from "framer-motion";
import Chatbot from "../Cosai/ChatBox";

function Product() {
  return (
    <Box sx={{ bgcolor: "#f5f5f1", minHeight: "100vh" }}>
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        style={{ minHeight: "100vh", background: "#f2eee5" }}
      >
        <HeroBanner />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <ProductList />
        </Container>
        <CustomerReviews />
        <BlogSection />
      </motion.div>
      <Chatbot />

      <Footer />
    </Box>
  );
}

export default Product;
