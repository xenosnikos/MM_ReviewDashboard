import { logo } from "@/components/ReviewIcons/icons";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Rating, Typography } from "@mui/material";

function Review({ setShowReviewDetails, setSelectedReview, selectedReview, theme }) {
  const handleBackToReviews = () => {
    setSelectedReview(null);
    setShowReviewDetails(false);
  };

  return (
    <Box>
      {selectedReview && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h3"
            sx={{
              fontSize: `${theme.typography.pxToRem(23)}`,
              color: `${theme.colors.alpha.black[100]}`,
              marginBottom: 2
            }}
          >
            Review
          </Typography>
          <img src={logo(selectedReview.type)} style={{ width: 80 }} />
        </Box>
      )}
      <Box>
        {selectedReview && (
          <>
            <Typography variant="h4" fontWeight="bold">
              {selectedReview.author}
            </Typography>
            <Typography>{selectedReview.date}</Typography>
            <Rating
              value={selectedReview.rating}
              defaultValue={5}
              precision={0.1}
              readOnly
              sx={{ marginTop: 2, marginBottom: 5 }}
            />
            <Typography>
              {selectedReview.review ? selectedReview.review : "(No comments)"}
            </Typography>
          </>
        )}
      </Box>
      <Box display="flex" justifyContent="flex-end" marginTop={2}>
        <Button color="primary" onClick={handleBackToReviews}>
          <ArrowBack fontSize="small" color="primary" />
          Back
        </Button>
      </Box>
    </Box>
  );
}

export default Review;
