import { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Box,
  Menu,
  alpha,
  MenuItem,
  Typography,
  useTheme,
  AlertColor
} from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { Chart } from "src/components/Chart";
import type { ApexOptions } from "apexcharts";
import DataContext from "@/contexts/DataContext";
import * as htmlToImage from "html-to-image";
import { getReviewsData } from "@/services";

function ReviewGrowth({ params }) {
  const theme = useTheme();

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const initOptions: ApexOptions = {
    chart: {
      background: "transparent",
      type: "bar",
      id: "review-chart",
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      animations: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 6,
        columnWidth: "40%"
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
      colors: ["transparent"]
    },
    legend: {
      show: false
    },
    labels: labels,
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
          colors: "#373C3F"
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
          colors: "#373C3F"
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
      theme: "dark"
    },
    series: [
      {
        name: "Reviews",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };

  const periods = [
    {
      value: "today",
      text: "Today"
    },
    {
      value: "yesterday",
      text: "Yesterday"
    },
    {
      value: "last_month",
      text: "Last month"
    },
    {
      value: "last_year",
      text: "Last year"
    }
  ];

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[3].text);
  const [options, setOptions] = useState<ApexOptions>(initOptions);
  const { reviewsData, setDataState } = useContext(DataContext);
  const [revData, setRevData] = useState(null);
  const [data, setData] = useState(null);
  const totalReviews = reviewsData?.total;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getReviewsData({ ...params, per_page: totalReviews });

        setRevData(response);
      } catch (error) {
        const errorMessage = "Something went wrong, please try again later.";
        const severity: AlertColor = "error";

        setDataState({
          alertMessage: errorMessage,
          alertSeverity: severity,
          isAlertOpen: true
        });
      }
    };

    getData();
  }, [reviewsData]);

  useEffect(() => {
    if (period === "Today") {
      const reviewsTodayArray = [];
      const today = new Date();

      const reviewsToday = revData?.data?.filter((review) => {
        const [day, month, year] = review.date.split(" ");
        const monthIndex = new Date(Date.parse(`${month}, ${year}`)).getMonth();
        const reviewDate = new Date(year, monthIndex, day.slice(0, -2));

        return (
          reviewDate.getDate() === today.getDate() &&
          reviewDate.getMonth() === today.getMonth() &&
          reviewDate.getFullYear() === today.getFullYear()
        );
      });

      reviewsTodayArray.push(reviewsToday.length);
      setData(reviewsTodayArray);
    }

    if (period === "Yesterday") {
      const reviewsYesterdayArray = [];
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const reviewsYesterday = revData?.data?.filter((review) => {
        const [day, month, year] = review.date.split(" ");
        const monthIndex = new Date(Date.parse(`${month}, ${year}`)).getMonth();
        const reviewDate = new Date(year, monthIndex, day.slice(0, -2));

        return (
          reviewDate.getDate() === yesterday.getDate() &&
          reviewDate.getMonth() === yesterday.getMonth() &&
          reviewDate.getFullYear() === yesterday.getFullYear()
        );
      });

      reviewsYesterdayArray.push(reviewsYesterday.length);
      setData(reviewsYesterdayArray);
    }

    if (period === "Last month") {
      const reviewsPerDay = {};

      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);

      const filteredReviews = revData?.data?.filter((review) => {
        const dateArray = review.date.split(" ");
        const monthIndex = new Date(
          Date.parse(`${dateArray[1]}, ${dateArray[2]}`)
        ).getMonth();
        const reviewDate = new Date(dateArray[2], monthIndex);

        return (
          reviewDate.getMonth() === lastMonth.getMonth() &&
          reviewDate.getFullYear() === lastMonth.getFullYear()
        );
      });

      filteredReviews.forEach((review) => {
        const dateArray = review.date.split(" ");
        reviewsPerDay[dateArray[0]] = (reviewsPerDay[dateArray[0]] || 0) + 1;
      });

      const reviewGrowth = Object.entries(reviewsPerDay).map(([day, count]) => ({
        day: day,
        count
      }));

      setData(reviewGrowth);
    }

    if (period === "Last year") {
      const reviewCountByMonth = {};

      revData?.data?.forEach((review) => {
        const dateArray = review.date.split(" ");
        const monthIndex =
          new Date(Date.parse(`${dateArray[1]}, ${dateArray[2]}`)).getMonth() + 1;
        const reviewDate = new Date(dateArray[2], monthIndex - 1);

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

      const reviewGrowth = Object.values(reviewCountByMonth);

      setData(reviewGrowth);
    }
  }, [revData, period]);

  useEffect(() => {
    if (!data) return;

    if (period === "Today") {
      setOptions({
        ...options,
        labels: ["Today"],
        series: [
          {
            name: "Reviews",
            data: data
          }
        ]
      });
    }

    if (period === "Yesterday") {
      setOptions({
        ...options,
        labels: ["Yesterday"],
        series: [
          {
            name: "Reviews",
            data: data
          }
        ]
      });
    }

    if (period === "Last month") {
      const today = new Date();
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
      const daysInLastMonth = new Date(
        lastMonth.getFullYear(),
        lastMonth.getMonth() + 1,
        0
      ).getDate();

      const lastMonthDays = [];

      for (let i = 1; i <= daysInLastMonth; i++) {
        let suffix = "th";
        if (i === 1 || i === 21 || i === 31) suffix = "st";
        else if (i === 2 || i === 22) suffix = "nd";
        else if (i === 3 || i === 23) suffix = "rd";
        lastMonthDays.push(`${i}${suffix}`);
      }

      const newSeriesData = [];

      for (let i = 1; i <= lastMonthDays.length; i++) {
        const index = data.findIndex((item) => item.day.slice(0, -2) == i);
        if (index > -1 && data[index].count) newSeriesData.push(data[index].count);
        else newSeriesData.push(0);
      }

      setOptions({
        ...options,
        labels: lastMonthDays,
        series: [
          {
            name: "Reviews",
            data: newSeriesData
          }
        ]
      });
    }

    if (period === "Last year") {
      const newSeriesData = [];

      for (let i = 1; i <= 12; i++) {
        const index = data.findIndex((item) => item.month === i);
        if (index > -1 && data[index].count) newSeriesData.push(data[index].count);
        else newSeriesData.push(0);
      }

      setOptions({
        ...options,
        labels: labels,
        series: [
          {
            name: "Reviews",
            data: newSeriesData
          }
        ]
      });
    }
  }, [data]);

  useEffect(() => {
    const getChart = async () => {
      const chartElement = document.querySelector("#chart") as HTMLElement;

      if (chartElement) {
        await htmlToImage.toPng(chartElement).then((dataUrl) => {
          setDataState({
            chartURI: dataUrl
          });
        });
      }
    };

    getChart();
  }, [options]);

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
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
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right"
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
