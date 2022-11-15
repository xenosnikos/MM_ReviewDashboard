import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

function SourceTable() {
  const sources = [
    {type: 'Google', totalReviews: 912, lastThirtyDays: 23, thisMonth: 0, lastMonth: 30, thisYear: 218},
    {type: 'Yellow Pages', totalReviews: 912, lastThirtyDays: 23, thisMonth: 0, lastMonth: 30, thisYear: 218},
    {type: 'Foursquare', totalReviews: 912, lastThirtyDays: 23, thisMonth: 0, lastMonth: 30, thisYear: 218},
    {type: 'Yelp', totalReviews: 912, lastThirtyDays: 23, thisMonth: 0, lastMonth: 30, thisYear: 218},
    {type: 'Glassdoor', totalReviews: 912, lastThirtyDays: 23, thisMonth: 0, lastMonth: 30, thisYear: 218},
    {type: 'WebLocal', totalReviews: 912, lastThirtyDays: 23, thisMonth: 0, lastMonth: 30, thisYear: 218},
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Total Reviews</TableCell>
            <TableCell>Last 30 days</TableCell>
            <TableCell>This Month (Nov 2022)</TableCell>
            <TableCell>Last Month (Oct 2022)</TableCell>
            <TableCell>This Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sources.map((source, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{source.type}</TableCell>
                <TableCell>{source.totalReviews}</TableCell>
                <TableCell>{source.lastThirtyDays}</TableCell>
                <TableCell>{source.thisMonth}</TableCell>
                <TableCell>{source.lastMonth}</TableCell>
                <TableCell>{source.thisYear}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SourceTable;