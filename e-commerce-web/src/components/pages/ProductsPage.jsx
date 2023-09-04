import { useParams, useSearchParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { useProducts } from "../../hooks/useProducts.jsx";
import { ProductCard } from "../product/ProductCard.jsx";

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const {category} = params;
  const {data} = useProducts({
    name: searchParams.get("name"),
    category: category
  });
  const products = data?.items ?? [];

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product.id}>
          <ProductCard product={product}/>
        </Grid>
      ))}
    </Grid>
  );
};