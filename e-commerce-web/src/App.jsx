import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { Layout } from "./components/layout/Layout.jsx";
import { HomePage } from "./components/pages/HomePage.jsx";
import { ProductsPage } from "./components/pages/ProductsPage.jsx";
import { ProductInfoPage } from "./components/pages/ProductInfoPage.jsx";

function App() {
  return (
    <>
      <Layout/>
      <Box sx={{margin: 3}}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path="/products/:product" element={<ProductInfoPage/>}/>
          <Route path=":category" element={<ProductsPage/>}/>
        </Routes>
      </Box>
    </>
  );
}

export default App;
