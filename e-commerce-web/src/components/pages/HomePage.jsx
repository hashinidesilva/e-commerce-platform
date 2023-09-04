import { Grid } from "@mui/material";
import { CategoryCard } from "../category/CategoryCard.jsx";

export const HomePage = () => {
  return (
    <Grid container spacing={4} sx={{justifyContent: 'space-between', flexWrap: 'wrap'}}>
      <Grid item>
        <CategoryCard title={"Electronics"} imagePath={"src/assets/electronics.jpg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Toys"} imagePath={"src/assets/toys.jpeg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Electronics"} imagePath={"src/assets/electronics.jpg"}/>
      </Grid>
      <Grid item>
        <CategoryCard title={"Toys"} imagePath={"src/assets/toys.jpeg"}/>
      </Grid>
    </Grid>
  );
};