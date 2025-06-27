import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "../views/Home/Home";
import { Cosai } from "../views/Cosai/Cosai";
import CartPage from "../views/Cart/Cart";
import PaymentPage from "../views/Payment/Payment";
import Product from "../views/ListProduct/Product";
import ProductDetailPage from "../views/ProductDetail/ProductDetail";
import LoginPage from "../views/Auth/Login";
import RegisterPage from "../views/Auth/Register";
import Account from "../views/Account/Account";
import PaymentSuccess from "../views/Payment/PaymentSuccess";
import PaymentFailure from "../views/Payment/PaymentFailure";
import NotFound from "../views/NotFound/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redirect /cosai to /home */}

      <Route path="/cosai" element={<Cosai />} />
      <Route path="/products" element={<Product />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/cart/payment" element={<PaymentPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/order/:idOrder/paymentSuccess" element={<PaymentSuccess />} />
      <Route path="/order/:idOrder/paymentFailure" element={<PaymentFailure />} />
      <Route path="*" element={<NotFound />} /> {/* Thêm dòng này */}

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
