import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout.jsx";
import { HomePage } from "./components/pages/HomePage.jsx";
import { ProductsPage } from "./components/pages/ProductsPage.jsx";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Layout/>
      <Box sx={{margin: 3}}>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/products" element={<ProductsPage/>}/>
          <Route path=":category" element={<ProductsPage/>}/>
        </Routes>
      </Box>
    </>
  );
}

export default App;
