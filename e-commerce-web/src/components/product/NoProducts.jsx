import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Card, Typography } from "@mui/material";

export const NoProducts = () => {
  return (
    <Card
      sx={{
        width: '100%',
        minHeight: "60vh",
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <SentimentVeryDissatisfiedIcon sx={{fontSize: 80, marginBottom: 2}}/>
      <Typography variant="h4" component="h2">
        {"Sorry, we couldn't find any results"}
      </Typography>
    </Card>
  );
};