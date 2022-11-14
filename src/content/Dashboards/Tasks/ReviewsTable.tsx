import { useState } from 'react';
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
  TableBody, Rating
} from '@mui/material';

function ReviewsTable() {
  const theme = useTheme();
  const [selected, setSelected] = useState([]);

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
                      <Rating value={review.rating} defaultValue={5} precision={0.01} readOnly />
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
    </Box>
  )
}

export default ReviewsTable;