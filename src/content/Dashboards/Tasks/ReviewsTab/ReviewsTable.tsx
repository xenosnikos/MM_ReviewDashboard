import { ChangeEvent, useContext, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  useTheme,
  FormControl,
  Checkbox,
  ListItemIcon,
  ListItemText,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Rating
} from "@mui/material";
import { providers, ratings } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";
import Review from "./Review";
import { logo } from "@/components/ReviewIcons/icons";

function ReviewsTable() {
  const theme = useTheme();
  const { selectedSources, selectedRatings, page, limit, reviewsData, setDataState } =
    useContext(DataContext);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const isAllSelectedSources =
    providers.length > 0 && selectedSources.length === providers.length;
  const isAllSelectedRatings =
    ratings.length > 0 && selectedRatings.length === ratings.length;

  const handleChangeSelectSources = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setDataState({
        selectedSources: selectedSources.length === providers.length ? [] : providers
      });
      return;
    }
    setDataState({
      selectedSources: value
    });
  };

  const handleChangeSelectRatings = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setDataState({
        selectedRatings: selectedRatings.length === ratings.length ? [] : ratings
      });
      return;
    }
    setDataState({
      selectedRatings: value
    });
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setDataState({
      page: newPage
    });
  };

  return (
    <Box>
      {showReviewDetails ? (
        <Review
          setShowReviewDetails={setShowReviewDetails}
          setSelectedReview={setSelectedReview}
          selectedReview={selectedReview}
          theme={theme}
        />
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{
              fontSize: `${theme.typography.pxToRem(23)}`,
              color: `${theme.colors.alpha.black[100]}`,
              marginBottom: 2
            }}
          >
            Reviews
          </Typography>
          <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
            <Typography
              variant="subtitle1"
              sx={{
                fontSize: `${theme.typography.pxToRem(14)}`,
                color: `${theme.colors.alpha.black[100]}`,
                marginRight: 3
              }}
            >
              Showing {reviewsData?.from || 0} to {reviewsData?.to || 0} of{" "}
              {reviewsData?.total || 0} Results
            </Typography>
            <FormControl style={{ minWidth: 150 }}>
              <Select
                multiple
                inputProps={{
                  id: "sourcesSelect"
                }}
                value={selectedSources}
                renderValue={() => {
                  return "Select Sources";
                }}
                notched={true}
                onChange={handleChangeSelectSources}
                autoWidth
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={isAllSelectedSources}
                      indeterminate={
                        selectedSources.length > 0 &&
                        selectedSources.length < providers.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {providers.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemIcon>
                      <Checkbox checked={selectedSources.indexOf(option) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ minWidth: 150 }}>
              <Select
                multiple
                inputProps={{
                  id: "ratingsSelect"
                }}
                value={selectedRatings}
                renderValue={() => "Select Ratings"}
                onChange={handleChangeSelectRatings}
              >
                <MenuItem value="all">
                  <ListItemIcon>
                    <Checkbox
                      checked={isAllSelectedRatings}
                      indeterminate={
                        selectedRatings.length > 0 &&
                        selectedRatings.length < ratings.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </MenuItem>
                {ratings.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemIcon>
                      <Checkbox checked={selectedRatings.indexOf(option) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={option + " Stars"} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => {
                setDataState({
                  selectedSources: providers,
                  selectedRatings: ratings
                });
              }}
            >
              Reset
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviewsData?.data?.map((review, index) => {
                  return (
                    <TableRow hover key={index}>
                      <TableCell>{review.date}</TableCell>
                      <TableCell>
                        <img src={logo(review.type)} style={{ width: 60 }} />
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Rating
                            value={review.rating}
                            defaultValue={5}
                            precision={0.1}
                            readOnly
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column" gap={1}>
                          <Typography>
                            {review.review ? review.review : "(No comments)"}
                          </Typography>
                          <Typography>Reviewer: {review.author}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <a href={review.viewlink} target="_blank" rel="noreferrer">
                          <Button variant="outlined">View</Button>
                        </a>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={reviewsData?.total || 0}
              onPageChange={handlePageChange}
              onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>) => {
                setDataState({
                  page: 0,
                  limit: parseInt(event.target.value)
                });
              }}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25, 30]}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

export default ReviewsTable;
