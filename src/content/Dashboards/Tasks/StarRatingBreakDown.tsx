import {
  Box,
  Divider,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from '@/components/Chart';
import type { ApexOptions } from 'apexcharts';

function StarRatingBreakDown() {
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
    labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star', 'No Rating', 'Recommended', 'Not Recommended'],
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
        Star Rating Breakdown
      </Typography>
      <Divider />
      <Chart
        type="donut"
        width={500}
        options={chartOptions}
        series={[70, 11, 4, 2, 13, 0, 0, 0]}
      />
    </Box>
  )
}

export default StarRatingBreakDown;