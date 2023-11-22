import { Grid } from "@mui/material";
import { CategoryCard } from "../category/CategoryCard.jsx";

export const HomePage = () => {
  return (
    <Grid container spacing={9} sx={{flexWrap: 'wrap', display: 'flex', marginBottom: '3rem'}}>
      <Grid item>
        <CategoryCard title={"Electronics"} imagePath={"/assets/electronics.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Beauty & Personal Care"} imagePath={"/assets/beauty and personal care.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Women's Fashion"} imagePath={"/assets/womens fashion.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Pet Supplies"} imagePath={"/assets/pets.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Men's fashion"} imagePath={"/assets/mens fashion.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Sports"} imagePath={"/assets/sports.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Health & Household"} imagePath={"/assets/health and household.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Books"} imagePath={"/assets/books.jpeg"}/>
      </Grid>
    </Grid>
  );
};