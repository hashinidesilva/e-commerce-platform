import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Rating,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import PropTypes from "prop-types";
import { useAddReview } from "../../hooks/useAddReview.jsx";

export const AddReview = ({isOpen, handleClose, productId}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const {mutate: addFunc} = useAddReview({
    onSuccess: () => {
      handleClose();
    }
  });

  const onRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  const onReviewChange = (event) => {
    setReview(event.target.value);
  };
  const onSendReview = () => {
    addFunc({
      productId,
      userId: 1,
      rating,
      review
    });
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth={true}>
      <DialogContent>
        <Stack spacing={3} sx={{alignItems: 'center'}}>
          <Typography variant="h5" fontWeight={"bold"} gutterBottom>
            What is you rate
          </Typography>
          <Rating name="product-rating" size="large" value={rating} onChange={onRatingChange}/>
          <Typography varient={"h5"} gutterBottom>
            Please share your opinion about the product
          </Typography>
          <TextField
            id="review"
            label="Your review"
            fullWidth
            multiline
            rows={4}
            onChange={onReviewChange}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button sx={{color: "black", backgroundColor: "#ffb300"}} onClick={onSendReview}>
          Send Review
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AddReview.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  productId: PropTypes.number
};