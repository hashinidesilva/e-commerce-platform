import { Card, CardActions, CardHeader, CardMedia, Link } from "@mui/material";
import PropTypes from "prop-types";

export const CategoryCard = ({title, imagePath}) => {
  return (
    <Card sx={{minWidth: 320, minHeight: 450}}>
      <CardHeader title={title} titleTypographyProps={{fontWeight: 600}}/>
      <CardMedia
        sx={{height: 320, marginBottom: 1.5}}
        image={imagePath}
        title={title}
      />
      <CardActions>
        <Link href={`${title}`} underline="none">
          See more
        </Link>
      </CardActions>
    </Card>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string,
  imagePath: PropTypes.string
};