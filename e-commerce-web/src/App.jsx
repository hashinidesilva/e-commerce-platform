import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Layout } from "./components/layout/Layout.jsx";
import { HomePage } from "./components/pages/HomePage.jsx";
import { ProductsPage } from "./components/pages/ProductsPage.jsx";
import { ProductInfoPage } from "./components/pages/ProductInfoPage.jsx";
import { CartPage } from "./components/pages/CartPage.jsx";
import { CheckoutPageCopy } from "./components/pages/CheckoutPageCopy.jsx";

function App() {
  return (
    <>
      <Layout/>
      <Box sx={{margin: 3}}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/products/:productName/dp/:productId" element={<ProductInfoPage/>}/>
          <Route path="/cart" element={<CartPage/>}/>
          <Route path=":category" element={<ProductsPage/>}/>
          <Route path="/checkout" element={<CheckoutPageCopy/>}/>
        </Routes>
      </Box>
    </>
  );
}

export default App;
