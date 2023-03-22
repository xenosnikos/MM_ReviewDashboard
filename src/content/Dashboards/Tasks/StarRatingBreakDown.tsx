import {
  Box,
  Divider,
  Typography,
  useTheme
} from '@mui/material';
import { Chart } from '@/components/Chart';
import type { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';

const initOptions: ApexOptions = {
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
  labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
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
  }],
  series: [0, 0, 0, 0, 0]
}

function StarRatingBreakDown({ data }) {
  const theme = useTheme();
  const [options, setOptions] = useState<ApexOptions>(initOptions);

  useEffect(() => {
    if (data) {
      const newSeries = [];

      for (let i = 5; i > 0; i--) {
        const index = data.findIndex(item => item.rating === i);
        if (index > -1 && data[index].count) {
          newSeries.push(parseFloat(data[index].count));
        } else {
          newSeries.push(0);
        }
      }

      setOptions({...options, series: newSeries});
    }
  }, [data])

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
        id="chart-donut"
        type="donut"
        width={500}
        options={options}
        series={options.series}
      />
    </Box>
  )
}

export default StarRatingBreakDown;