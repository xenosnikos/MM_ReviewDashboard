import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

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
                <TableCell>{item.totalCount || 0}</TableCell>
                <TableCell>{item.lastThirtyDaysCount || 0}</TableCell>
                <TableCell>{item.thisMonth || 0}</TableCell>
                <TableCell>{item.lastMonth || 0}</TableCell>
                <TableCell>{item.thisYear || 0}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SourceTable;
