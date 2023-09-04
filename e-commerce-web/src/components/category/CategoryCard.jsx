import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import PropTypes from "prop-types";

export const CategoryCard = ({title, imagePath}) => {
  return (
    <Card sx={{minWidth: 320, minHeight: 450}}>
      <CardHeader title={title} titleTypographyProps={{fontWeight: 700}}/>
      <CardActionArea href={`${title.toLowerCase()}`}>
        <CardMedia
          sx={{height: 320, marginBottom: 1}}
          image={imagePath}
          title={title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="title1"
            component="div"
            sx={{color: '#26a69a', '&:hover': {color: '#ffab40'}}}>
            See more
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string,
  imagePath: PropTypes.string
};