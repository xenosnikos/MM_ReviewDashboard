import { useContext, useEffect, useRef, useState, useMemo } from "react";
import { Button, Box, Menu, alpha, MenuItem, Typography, useTheme } from "@mui/material";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import type { ApexOptions } from "apexcharts";
import DataContext from "@/contexts/DataContext";
import { Chart } from "@/components/Chart";

function ReviewGrowth() {
  const theme = useTheme();
  const { data } = useContext(DataContext);

  const labelsInit = useMemo(
    () => [
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
    ],
    []
  );

  const getLastYearData = (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const lastYearData = data.filter((item) => {
      const itemDate = new Date(item.date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth() + 1;

      return (
        currentYear - itemYear === 1 ||
        (currentYear === itemYear && itemMonth <= currentMonth)
      );
    });

    return lastYearData;
  };

  const initOptions = useMemo<ApexOptions>(() => {
    const lastYearData = getLastYearData(data?.reviewGrowth || []);
    const seriesData = lastYearData.map((item) => item.count);

    return {
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
          enabled: true
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
      labels: labelsInit.slice(0, lastYearData.length),
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
          data: seriesData
        }
      ]
    };
  }, [data]);

  const periods = useMemo(
    () => [
      {
        value: "current_month",
        text: "Current month"
      },
      {
        value: "current_year",
        text: "Current year"
      }
    ],
    []
  );

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[1].text);
  const [options, setOptions] = useState<ApexOptions>(initOptions);

  const getCurrentMonthData = (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    const currentMonthData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate.getFullYear() === currentYear &&
        itemDate.getMonth() + 1 === currentMonth &&
        itemDate.getDate() <= lastDayOfMonth
      );
    });

    return currentMonthData;
  };

  const updateChartData = (selectedOption) => {
    const selectedData =
      selectedOption === "current_month"
        ? getCurrentMonthData(data?.reviewGrowth || [])
        : getLastYearData(data?.reviewGrowth || []);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let labels = [];
    let seriesData = [];

    if (selectedOption === "current_month") {
      const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
      for (let day = 1; day <= lastDayOfMonth; day++) {
        const reviewDay = selectedData.find(
          (item) => new Date(item.date).getDate() === day
        );
        if (reviewDay) {
          labels.push((day + 1).toString());
          seriesData.push(reviewDay.count);
        }
      }
    } else {
      const monthCounts = selectedData.reduce((acc, item) => {
        const itemDate = new Date(item.date);
        const month = itemDate.getMonth();
        acc[month] = (acc[month] || 0) + item.count;
        return acc;
      }, {});

      for (let i = 0; i < 12; i++) {
        const month = i + 1;
        const monthLabel = labelsInit[new Date(currentYear, month - 1).getMonth()];
        labels.push(monthLabel);
        seriesData.push(monthCounts[month - 1] || 0);
      }
    }

    setOptions((prevOptions) => ({
      ...prevOptions,
      labels: labels,
      series: [
        {
          name: "Reviews",
          data: seriesData
        }
      ]
    }));
  };

  useEffect(() => {
    if (period === "Current month") {
      updateChartData("current_month");
    } else if (period === "Current year") {
      updateChartData("current_year");
    }
  }, [data, period]);

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
                updateChartData(_period.value);
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
