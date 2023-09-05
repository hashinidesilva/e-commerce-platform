import { Card, CardMedia, Link, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const CategoryCard = ({title, imagePath}) => {
  return (
    <Card sx={{minWidth: 300, minHeight: 400, padding: 2}}>
      <Typography
        gutterBottom
        component="div"
        sx={{fontSize: 20, fontWeight: 700}}>
        {title}
      </Typography>
      <Link href={`${title.toLowerCase()}`}
            underline="none"
            sx={{color: '#26a69a', '&:hover': {color: '#ffab40'}}}>
        <CardMedia
          sx={{height: 320, marginBottom: 2}}
          image={imagePath}
          title={title}
        />
        <Typography
          gutterBottom
          variant="title1"
          component="div">
          See more
        </Typography>
      </Link>
    </Card>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string,
  imagePath: PropTypes.string
};