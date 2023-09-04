import { useParams, useSearchParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useProducts } from "../../hooks/useProducts.jsx";
import { ProductCard } from "../product/ProductCard.jsx";
import { NoProducts } from "../product/NoProducts.jsx";

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const {category} = params;
  const {data, isLoading} = useProducts({
    name: searchParams.get("name"),
    category: category
  });
  const products = data?.items ?? [];

  return (
    <>
      <Typography
        sx={{marginBottom: 3, fontWeight: 700, fontSize: 40}}>
        {category}
      </Typography>
      {(products.length === 0 && !isLoading) ? <NoProducts/> :
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item key={product.id}>
              <ProductCard product={product}/>
            </Grid>
          ))}
        </Grid>
      }
    </>
  );
};