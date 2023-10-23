import { Grid } from "@mui/material";
import { CategoryCard } from "../category/CategoryCard.jsx";

export const HomePage = () => {
  return (
    <Grid container spacing={'4.5rem'}>
      <Grid item xs={4}>
        <CategoryCard title={"Electronics"} imagePath={"src/assets/electronics.jpeg"}/>
      </Grid>
      <Grid item xs={4}>
        <CategoryCard title={"Beauty & Personal Care"} imagePath={"src/assets/beauty and personal care.jpeg"}/>
      </Grid>
      <Grid item xw={4}>
        <CategoryCard title={"Women's Fashion"} imagePath={"src/assets/womens fashion.jpeg"}/>
      </Grid>
      <Grid item xs={4}>
        <CategoryCard title={"Pet Supplies"} imagePath={"src/assets/pets.jpeg"}/>
      </Grid>
      <Grid item xs={4}>
        <CategoryCard title={"Men's fashion"} imagePath={"src/assets/mens fashion.jpeg"}/>
      </Grid>
      <Grid item xs={4}>
        <CategoryCard title={"Sports"} imagePath={"src/assets/sports.jpeg"}/>
      </Grid>
      <Grid item xs={4}>
        <CategoryCard title={"Health & Household"} imagePath={"src/assets/health and household.jpeg"}/>
      </Grid>
      <Grid item xs={4}>
        <CategoryCard title={"Books"} imagePath={"src/assets/books.jpeg"}/>
      </Grid>
    </Grid>
  );
};