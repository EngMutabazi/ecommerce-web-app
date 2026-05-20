import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckOutPage";
import PrivateRoute from "./components/PrivateRouter";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<ProductList />} />

          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<CartPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
