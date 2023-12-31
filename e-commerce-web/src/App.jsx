import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import { HomePage } from "./components/pages/HomePage.jsx";
import { ProductsPage } from "./components/pages/ProductsPage.jsx";
import { ProductInfoPage } from "./components/pages/ProductInfoPage.jsx";
import { CartPage } from "./components/pages/CartPage.jsx";
import { CheckoutPage } from "./components/pages/CheckoutPage.jsx";
import { OrdersPage } from "./components/pages/OrdersPage.jsx";
import { MyAccountPage } from "./components/pages/MyAccountPage.jsx";
import { AddressesPage } from "./components/pages/AddressesPage.jsx";
import { OrderInfoPage } from "./components/pages/OrderInfoPage.jsx";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/products/:productName/dp/:productId" element={<ProductInfoPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path="/checkout" element={<CheckoutPage/>}/>
          <Route path="/orders" element={<OrdersPage/>}/>
          <Route path="/orders/:orderId" element={<OrderInfoPage/>}/>
          <Route path="/account" element={<MyAccountPage/>}/>
          <Route path="/account/addresses" element={<AddressesPage/>}/>
          <Route path="/categories/:category" element={<ProductsPage/>}/>
          <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
