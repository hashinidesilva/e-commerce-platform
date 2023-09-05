import { Grid } from "@mui/material";
import { CategoryCard } from "../category/CategoryCard.jsx";

export const HomePage = () => {
  return (
    <Grid container spacing={2} sx={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
      <Grid item>
        <CategoryCard title={"Electronics"} imagePath={"src/assets/electronics.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Beauty and Personal Care"} imagePath={"src/assets/beauty and personal care.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Women's Fashion"} imagePath={"src/assets/womens fashion.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Pet Supplies"} imagePath={"src/assets/pets.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Men's fashion"} imagePath={"src/assets/mens fashion.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Sports"} imagePath={"src/assets/sports.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Health and Household"} imagePath={"src/assets/health and household.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Books"} imagePath={"src/assets/books.jpeg"}/>
      </Grid>
    </Grid>
  );
};