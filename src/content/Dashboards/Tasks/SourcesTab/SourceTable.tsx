import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";

function SourceTable({ data }) {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "short" });
  const currentYear = currentDate.getFullYear();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthName = lastMonth.toLocaleString("default", { month: "short" });
  const lastMonthYear = lastMonth.getFullYear();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Total Reviews</TableCell>
            <TableCell>Last 30 days</TableCell>
            <TableCell>
              This Month ({currentMonth} {currentYear})
            </TableCell>
            <TableCell>
              Last Month ({lastMonthName} {lastMonthYear})
            </TableCell>
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
