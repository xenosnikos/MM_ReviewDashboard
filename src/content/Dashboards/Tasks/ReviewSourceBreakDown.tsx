import {
  Box,
  Divider,
  Typography,
  useTheme
} from '@mui/material';
import { ApexOptions } from "apexcharts";
import { Chart } from '@/components/Chart';

function ReviewSourceBreakDown() {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      width: 380,
      type: 'donut'
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: true
    },
    labels: ['Google', 'Yellow Pages', 'Yelp', 'Foursquare'],
    fill: {
      type: 'gradient',
    },
    legend: {
      formatter: function(val, opts) {
        return opts.w.globals.series[opts.seriesIndex] + '% ' + val
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  }

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          px: 2,
          pb: 1,
          pt: 2,
          fontSize: `${theme.typography.pxToRem(23)}`,
          color: `${theme.colors.alpha.black[100]}`
        }}
      >
        Review Source Breakdown
      </Typography>
      <Divider />
      <Chart
        type="donut"
        width={500}
        options={chartOptions}
        series={[98, 2, 0, 0]}
      />
    </Box>
  )
}

export default ReviewSourceBreakDown;