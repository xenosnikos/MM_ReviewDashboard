import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

function SourceTable({ data }) {
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
          {data?.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.totalCount}</TableCell>
                <TableCell>{item.lastThirtyDaysCount}</TableCell>
                <TableCell>{item.thisMonth}</TableCell>
                <TableCell>{item.lastMonth}</TableCell>
                <TableCell>{item.thisYear}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SourceTable;