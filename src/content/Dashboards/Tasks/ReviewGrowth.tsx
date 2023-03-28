import { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Box,
  Menu,
  alpha,
  MenuItem,
  Typography,
  useTheme
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import DataContext from '@/contexts/DataContext';
import * as htmlToImage from 'html-to-image';
import { getReviewsData } from '@/services';

function ReviewGrowth({ params }) {
  const theme = useTheme();

  const initOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      type: 'bar',
      id: 'review-chart',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: false
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: '35%'
      }
    },
    colors: [theme.colors.primary.main, alpha(theme.colors.primary.main, 0.5)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1
    },
    theme: {
      mode: theme.palette.mode
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    legend: {
      show: false
    },
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    grid: {
      strokeDashArray: 5,
      borderColor: theme.palette.divider
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#373C3F'
        }
      }
    },
    yaxis: {
      tickAmount: 6,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#373C3F'
        }
      }
    },
    tooltip: {
      x: {
        show: false
      },
      marker: {
        show: false
      },
      y: {
        formatter: function (val) {
          return val.toString();
        }
      },
      theme: 'dark'
    },
    series: [
      {
        name: 'Reviews',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };

  const periods = [
    {
      value: 'today',
      text: 'Today'
    },
    {
      value: 'yesterday',
      text: 'Yesterday'
    },
    {
      value: 'last_month',
      text: 'Last month'
    },
    {
      value: 'last_year',
      text: 'Last year'
    }
  ];

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[3].text);
  const [options, setOptions] = useState<ApexOptions>(initOptions);
  const { setChartURI, reviewsData } = useContext(DataContext);
  const [revData, setRevData] = useState(null);
  const [data, setData] = useState(null);
  const totalReviews = reviewsData?.total;

  useEffect(() => {
    const getData = async () => {
      await getReviewsData({ ...params, per_page: totalReviews })
        .then(response => setRevData(response))
        .catch(error => console.log(error));
    }

    getData();
  }, [reviewsData]);

  useEffect(() => {
    const reviewCountByMonth = {};

    revData?.data?.forEach(review => {
      const [day, month, year] = review.date.split(" ");
      const monthIndex = new Date(Date.parse(`${month}, ${year}`)).getMonth() + 1;
      const reviewDate = new Date(year, monthIndex - 1);

      if (isNaN(monthIndex)) {
        return;
      }

      if (reviewDate >= new Date(new Date().setMonth(new Date().getMonth() - 11))) {
        if (reviewCountByMonth[monthIndex]) {
          reviewCountByMonth[monthIndex].count += 1;
        } else {
          reviewCountByMonth[monthIndex] = { month: monthIndex, count: 1 };
        }
      }
    });

    const reviewCountArray = Object.values(reviewCountByMonth);

    setData(reviewCountArray);
  }, [revData]);

  useEffect(() => {
    if (!data)
      return;

    const newSeriesData = [];

    for (let i = 1; i <= 12; i++) {
      const index = data.findIndex(item => item.month === i);
      if (index > -1 && data[index].count)
        newSeriesData.push(data[index].count);
      else
        newSeriesData.push(0);
    }

    setOptions({
      ...options,
      series: [
        {
          name: 'Reviews',
          data: newSeriesData
        }
      ]
    });
  }, [data]);

  useEffect(() => {
    const getChart = async () => {
      const chartElement = document.querySelector('#chart') as HTMLElement;

      if (chartElement) {
        await htmlToImage.toPng(chartElement).then((dataUrl) => {
          setChartURI(dataUrl);
        });
      }
    }

    getChart()
  }, [options]);

  return (
    <Box>
      <Box
        mb={2}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h4">Review Growth</Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          ref={actionRef1}
          onClick={() => setOpenMenuPeriod(true)}
          endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
        >
          {period}
        </Button>
        <Menu
          disableScrollLock
          anchorEl={actionRef1.current}
          onClose={() => setOpenMenuPeriod(false)}
          open={openPeriod}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {periods.map((_period) => (
            <MenuItem
              key={_period.value}
              onClick={() => {
                setPeriod(_period.text);
                setOpenMenuPeriod(false);
              }}
            >
              {_period.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Chart
        id="chart"
        options={options}
        series={options.series}
        type="bar"
        height={270}
      />
    </Box>
  );
}

export default ReviewGrowth;
