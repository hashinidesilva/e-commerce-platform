import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import { HomePage } from "./components/pages/HomePage.jsx";
import { ProductsPage } from "./components/pages/ProductsPage.jsx";
import { ProductInfoPage } from "./components/pages/ProductInfoPage.jsx";
import { CartPage } from "./components/pages/CartPage.jsx";
import { CheckoutPage } from "./components/pages/CheckoutPage.jsx";

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
          <Route path=":category" element={<ProductsPage/>}/>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
