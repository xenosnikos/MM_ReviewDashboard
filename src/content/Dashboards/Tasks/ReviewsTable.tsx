import { ChangeEvent, useEffect, useState } from 'react';
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
} from '@mui/material';

function ReviewsTable() {
  const theme = useTheme();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const sourcesOptions = [
    "Foursquare",
    "WebLocal",
    "Glassdoor",
    "Yellow Pages",
    "Google",
    "Yelp"
  ];

  const isAllSelected = sourcesOptions.length > 0 && selected.length === sourcesOptions.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === sourcesOptions.length ? [] : sourcesOptions);
      return;
    }
    setSelected(value);
  };

  const reviews = [
    {date: '1st Nov 2022', source: 'Google', rating: 5, review: 'Very helpful staff, fast service and accurate timing', reviewer: 'Antonios Oueiss', status: 'Unread'},
    {date: '1st Nov 2022', source: 'Google', rating: 5, review: 'Very helpful staff, fast service and accurate timing', reviewer: 'Antonios Oueiss', status: 'Unread'},
    {date: '1st Nov 2022', source: 'Google', rating: 5, review: 'Very helpful staff, fast service and accurate timing', reviewer: 'Antonios Oueiss', status: 'Unread'},
    {date: '1st Nov 2022', source: 'Google', rating: 5, review: 'Very helpful staff, fast service and accurate timing', reviewer: 'Antonios Oueiss', status: 'Unread'},
    {date: '1st Nov 2022', source: 'Google', rating: 5, review: 'Very helpful staff, fast service and accurate timing', reviewer: 'Antonios Oueiss', status: 'Unread'}
  ];

  useEffect(() => {
    setPage(0);
  }, [])

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
          Showing 1 to 20 of 582 Results
        </Typography>
        <FormControl>
          <Select
            multiple
            value={selected}
            renderValue={() => "Select Sources"}
            onChange={handleChange}
          >
            <MenuItem
              value="all"
            >
              <ListItemIcon>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={
                    selected.length > 0 && selected.length < sourcesOptions.length
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Select All"
              />
            </MenuItem>
            {sourcesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  <Checkbox
                    checked={selected.indexOf(option) > -1}
                  />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            multiple
            value={selected}
            renderValue={() => "Select Ratings"}
            onChange={handleChange}
          >
            <MenuItem
              value="all"
            >
              <ListItemIcon>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={
                    selected.length > 0 && selected.length < sourcesOptions.length
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Select All"
              />
            </MenuItem>
            {sourcesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  <Checkbox
                    checked={selected.indexOf(option) > -1}
                  />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <Select
            multiple
            value={selected}
            renderValue={() => "Select Time"}
            onChange={handleChange}
          >
            <MenuItem
              value="all"
            >
              <ListItemIcon>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={
                    selected.length > 0 && selected.length < sourcesOptions.length
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary="Select All"
              />
            </MenuItem>
            {sourcesOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <ListItemIcon>
                  <Checkbox
                    checked={selected.indexOf(option) > -1}
                  />
                </ListItemIcon>
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined">
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review, index) => {
              return (
                <TableRow
                  hover
                  key={index}
                >
                  <TableCell >
                    {review.date}
                  </TableCell>
                  <TableCell>
                    {review.source}
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
                        Reviewer: {review.reviewer}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {review.status}
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
          count={20}
          onPageChange={() => {

          }}
          onRowsPerPageChange={(event: ChangeEvent<HTMLInputElement>) => setLimit(parseInt(event.target.value))}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Box>
  )
}

export default ReviewsTable;