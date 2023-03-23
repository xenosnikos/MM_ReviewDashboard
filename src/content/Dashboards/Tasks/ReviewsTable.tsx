import { ChangeEvent, useContext } from 'react';
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
  Rating,
  InputLabel
} from '@mui/material';
import { providers, ratings } from '@/helpers/constant';
import DataContext from '@/contexts/DataContext';

function ReviewsTable() {
  const theme = useTheme();
  const {
    selectedSources,
    setSelectedSources,
    selectedRatings,
    setSelectedRatings,
    page,
    setPage,
    limit,
    setLimit,
    reviewsData } = useContext(DataContext);

  console.log(reviewsData);

  const isAllSelectedSources = providers.length > 0 && selectedSources.length === providers.length;
  const isAllSelectedRatings = ratings.length > 0 && selectedRatings.length === ratings.length;

  const handleChangeSelectSources = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedSources(selectedSources.length === providers.length ? [] : providers);
      return;
    }
    setSelectedSources(value);
  };

  const handleChangeSelectRatings = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelectedRatings(selectedRatings.length === ratings.length ? [] : ratings);
      return;
    }
    setSelectedRatings(value);
  }

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  }

  return (
    <Box>
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
          Showing {reviewsData?.from || 0} to {reviewsData?.to || 0} of {reviewsData?.total || 0} Results
        </Typography>
        <FormControl style={{ minWidth: 150 }}>
          <InputLabel htmlFor="sourcesSelect">Select Sources</InputLabel>
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
            style={{ marginTop: '8px' }}
          >
            <MenuItem value="all">
              <ListItemIcon>
                <Checkbox
                  checked={isAllSelectedSources}
                  indeterminate={selectedSources.length > 0 && selectedSources.length < providers.length}
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
          <InputLabel htmlFor="ratingsSelect">Select Ratings</InputLabel>
          <Select
            multiple
            inputProps={{
              id: "ratingsSelect"
            }}
            value={selectedRatings}
            renderValue={() => "Select Ratings"}
            onChange={handleChangeSelectRatings}
            style={{ marginTop: '8px' }}
          >
            <MenuItem
              value="all"
            >
              <ListItemIcon>
                <Checkbox
                  checked={isAllSelectedRatings}
                  indeterminate={
                    selectedRatings.length > 0 && selectedRatings.length < ratings.length
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Select All"
              />
            </MenuItem>
            {ratings.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  <Checkbox
                    checked={selectedRatings.indexOf(option) > -1}
                  />
                </ListItemIcon>
                <ListItemText primary={option + " Stars"} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/*<FormControl style={{minWidth: 150}}>*/}
        {/*  <Select*/}
        {/*    multiple*/}
        {/*    value={selected}*/}
        {/*    renderValue={() => "Select Time"}*/}
        {/*    onChange={handleChange}*/}
        {/*  >*/}
        {/*    <MenuItem value="all">*/}
        {/*      <ListItemIcon>*/}
        {/*        <Checkbox*/}
        {/*          checked={isAllSelected}*/}
        {/*          indeterminate={*/}
        {/*            selected.length > 0 && selected.length < providers.length*/}
        {/*          }*/}
        {/*        />*/}
        {/*      </ListItemIcon>*/}
        {/*      <ListItemText*/}
        {/*        primary="Select All"*/}
        {/*      />*/}
        {/*    </MenuItem>*/}
        {/*    {providers.map((option) => (*/}
        {/*      <MenuItem key={option} value={option}>*/}
        {/*        <ListItemIcon>*/}
        {/*          <Checkbox*/}
        {/*            checked={selected.indexOf(option) > -1}*/}
        {/*          />*/}
        {/*        </ListItemIcon>*/}
        {/*        <ListItemText primary={option} />*/}
        {/*      </MenuItem>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</FormControl>*/}
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedSources(providers);
            setSelectedRatings(ratings);
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
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell >
                    {review.date}
                  </TableCell>
                  <TableCell>
                    {review.type}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Rating value={review.rating} defaultValue={5} precision={0.1} readOnly />
                      {review.rating}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column" gap={1}>
                      <Typography>
                        {review.review}
                      </Typography>
                      <Typography>
                        Reviewer: {review.author}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Button variant="outlined">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
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
            setPage(0);
            setLimit(parseInt(event.target.value))
          }}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Box>
  )
}

export default ReviewsTable;