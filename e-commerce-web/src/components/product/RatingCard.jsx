import { Box, Grid, LinearProgress, linearProgressClasses, Rating, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const RatingLine = ({star, count, percentage}) => {
  return (
    <Grid spacing={2} container alignItems={"center"}>
      <Grid item>
        <Typography sx={{mb: 1.5}} color="text">
          {star} stars
        </Typography>
      </Grid>
      <Grid xs item>
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            [`&.${linearProgressClasses.colorPrimary}`]: {
              backgroundColor: '#eeeeee',
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              backgroundColor: '#ffc107',
            },
          }}/>
      </Grid>
      <Grid item>
        <Typography sx={{mb: 1.5}} color="text">
          {count}
        </Typography>
      </Grid>
    </Grid>
  );
};
export const RatingCard = ({ratings = [], averageRating}) => {
  const stars = [5, 4, 3, 2, 1];
  return (
    <Stack sx={{padding: 2}} spacing={2}>
      <Typography component="div" variant="h6" fontWeight="bold" marginBottom={3}>
        Customer Reviews ({ratings.length})
      </Typography>
      <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
        <Rating name="read-only" value={averageRating ?? 0} readOnly size="medium" precision={0.5}/>
        <Typography component="div" variant="h6">
          {averageRating} out of 5
        </Typography>
      </Stack>
      <Box width={"40%"}>
        {stars.map(star => {
          const count = ratings.filter(item => item?.rating === star).length;
          return <RatingLine key={star} star={star} count={count} percentage={count / (ratings.length) * 100}/>;
        })}
      </Box>
    </Stack>
  );
};

RatingCard.propTypes = {
  ratings: PropTypes.array,
  averageRating: PropTypes.number
};

RatingLine.propTypes = {
  star: PropTypes.number,
  count: PropTypes.number,
  percentage: PropTypes.number
};