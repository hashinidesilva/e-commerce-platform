import { useParams, useSearchParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
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
      {(products.length === 0 && !isLoading) && <NoProducts/>}
      {(products.length > 0 && !isLoading) &&
        <Box width={'100%'}>
          <Typography
            sx={{marginBottom: 3, fontWeight: 700, fontSize: 20}}>
            Results
          </Typography>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item key={product.id}>
                <ProductCard product={product}/>
              </Grid>
            ))}
          </Grid>
        </Box>
      }
    </>
  );
};