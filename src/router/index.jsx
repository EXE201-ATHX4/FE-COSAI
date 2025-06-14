import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from '../views/Home/Home';
import { Cosai } from '../views/Cosai/Cosai';
import CartPage from '../views/Cart/Cart';
import PaymentPage from '../views/Payment/Payment';
import Product from "../views/ListProduct/Product";
import ProductDetailPage from "../views/ProductDetail/ProductDetail";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      <Route path="/cosai" element={<Cosai />} />
      <Route path="/products" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cart/payment" element={<PaymentPage/>} />
    </Routes>
  );
};

export default function AppRouter() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
