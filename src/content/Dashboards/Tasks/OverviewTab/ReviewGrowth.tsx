import { useContext, useEffect, useRef, useState, useMemo } from "react";
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
import type { ApexOptions } from "apexcharts";
import DataContext from "@/contexts/DataContext";
import { Chart } from "@/components/Chart";
import CustomDatePicker from "@/components/CustomDatepicker/CustomDatePicker";
import { getDashboardData, getDashboardDateData } from "@/services";
import { useRouter } from "next/router";
import { DashboardDataResponse } from "@/models";

function ReviewGrowth({ setMonth }) {
  const theme = useTheme();
  const { data, chartTitle, setDataState } = useContext(DataContext);
  const [value, setValue] = useState<any>();
  const [customDateModal, setCustomteModal] = useState(false);
  const [rest, setRest] = useState<Boolean>(false);
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
  const router = useRouter();
  const { client } = router.query;
  const clientId = typeof client === "string" ? client : "";

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

  const customDateData = (data) => {
    if (value) {
      const { startDate, endDate } = value[0];
      const initialDate = new Date(startDate);
      const end_date = new Date(endDate);
      const filteredData = data.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= initialDate && itemDate <= end_date;
      });
      return filteredData;
    }
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
          show: true //h
        },
        axisTicks: {
          show: true //h
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
          show: true
        },
        axisTicks: {
          show: true
        },
        labels: {
          style: {
            colors: "#373C3F"
          }
        }
      },
      tooltip: {
        x: {
          show: true
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
        text: "Current Month"
      },
      {
        value: "current_year",
        text: "Current Year"
      },
      {
        value: "custom_date",
        text: "Custom Date"
      }
    ],
    []
  );

  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const [period, setPeriod] = useState<string>(periods[1].text);
  const [options, setOptions] = useState<ApexOptions>(initOptions);

  const restDashBoardData = () => {
    const getData = async () => {
      try {
        const response: DashboardDataResponse = await getDashboardData(clientId);
        setDataState({
          data: response,
          disabledButton: false
        });
      } catch (error) {
        const errorMessage = "Could not load data, please try again later.";
        const severity: AlertColor = "error";

        setDataState({
          disabledButton: false,
          alertMessage: errorMessage,
          alertSeverity: severity,
          isAlertOpen: true
        });
      }
    };

    if (typeof client === "string") {
      getData();
    }
  };

  const getCurrentMonthData = (data) => {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const currentMonth = currentDate.getUTCMonth() + 1;
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getUTCDate();

    const monthDays = Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
    const currentMonthData = monthDays.map((day) => {
      const itemDate = new Date(Date.UTC(currentYear, currentMonth - 1, day, 0, 0, 0, 0));
      const reviewDay = data.find((item) => {
        const [itemYear, itemMonth, itemDay] = item.date.split("-");
        const reviewDate = new Date(
          Date.UTC(itemYear, itemMonth - 1, itemDay, 0, 0, 0, 0)
        );
        return reviewDate.getTime() === itemDate.getTime();
      });

      return {
        date: itemDate.toISOString().split("T")[0],
        count: reviewDay ? reviewDay.count : 0,
        dayNumber: day - 1
      };
    });

    const filteredData = currentMonthData.filter((item) => item.count > 0);

    return filteredData;
  };

  const updateChartData = (selectedOption) => {
    const selectedData =
      selectedOption === "current_month"
        ? getCurrentMonthData(data?.reviewGrowth || [])
        : selectedOption === "current_year"
        ? getLastYearData(data?.reviewGrowth || [])
        : customDateData(data?.reviewGrowth || []);

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let labels = [];
    let seriesData = [];

    if (selectedOption === "current_month") {
      const monthCounts = data?.reviewGrowth?.reduce((acc, item) => {
        const [itemYear, itemMonth, itemDay] = item.date.split("-");
        const itemDate = new Date(Date.UTC(itemYear, itemMonth - 1, itemDay, 0, 0, 0, 0));
        const month = itemDate.getUTCMonth();
        acc[month] = (acc[month] || 0) + item.count;
        return acc;
      }, {});
      for (let i = 0; i < 12; i++) {
        const month = i + 1;
        const monthLabel = labelsInit[new Date(currentYear, month - 1).getMonth()];
        labels.push(monthLabel);
        seriesData.push(monthCounts[month - 1] || 0);
      }
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      setDataState({ chartTitle: `Review Growth: ${monthNames[currentMonth - 1]}` });
    } else if (selectedOption === "current_year") {
      const monthCounts = selectedData.reduce((acc, item) => {
        const [itemYear, itemMonth, itemDay] = item.date.split("-");
        const itemDate = new Date(Date.UTC(itemYear, itemMonth - 1, itemDay, 0, 0, 0, 0));
        const month = itemDate.getUTCMonth();
        acc[month] = (acc[month] || 0) + item.count;
        return acc;
      }, {});
      for (let i = 0; i < 12; i++) {
        const month = i + 1;
        const monthLabel = labelsInit[new Date(currentYear, month - 1).getMonth()];
        labels.push(monthLabel);
        seriesData.push(monthCounts[month - 1] || 0);
      }

      setDataState({ chartTitle: `Review Growth: ${currentYear - 1} - ${currentYear}` });
    } else {
      if (value) {
        const { startDate, endDate } = value[0];
        const toDate = (arg) => {
          const date = new Date(arg);
          return date.toDateString();
        };

        const monthCounts = data?.reviewGrowth?.reduce((acc, item) => {
          const [itemYear, itemMonth, itemDay] = item.date.split("-");
          const itemDate = new Date(
            Date.UTC(itemYear, itemMonth - 1, itemDay, 0, 0, 0, 0)
          );
          const month = itemDate.getUTCMonth();
          acc[month] = (acc[month] || 0) + item.count;
          return acc;
        }, {});
        for (let i = 0; i < 12; i++) {
          const month = i + 1;
          const monthLabel = labelsInit[new Date(currentYear, month - 1).getMonth()];
          labels.push(monthLabel);
          seriesData.push(monthCounts[month - 1] || 0);
        }
        setDataState({
          chartTitle: `Review Growth: ${toDate(startDate)} - ${toDate(endDate)}`
        });
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
  const handleChange = (item) => {
    if (item === "Custom Date") {
      setCustomteModal(true);
      setPeriod(item);
      setRest(false);
      setOpenMenuPeriod(false);
    } else {
      setPeriod(item);
      setRest(false);
      setOpenMenuPeriod(false);
    }
  };
  useEffect(() => {
    if (period === "Current Month") {
      updateChartData("current_month");
      setRest(false);
    }
    if (period === "Current Year") {
      updateChartData("current_year");
      setRest(false);
    }
    if (!customDateModal) {
      if (period === "Custom Date") {
        updateChartData("custom_date");
        setRest(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (period === "Current Month") {
      // restDashBoardData();
      if (period === "Current Month") {
        const getData = async () => {
          try {
            const response: DashboardDataResponse = await getDashboardDateData(
              clientId,
              value,
              true
            );
            await setDataState({
              data: response,
              disabledButton: false
            });
          } catch (error) {
            const errorMessage = "Could not load data, please try again later.";
            const severity: AlertColor = "error";

            await setDataState({
              disabledButton: false,
              alertMessage: errorMessage,
              alertSeverity: severity,
              isAlertOpen: true
            });
          }
        };
        if (typeof client === "string") {
          getData();
        }
      }
      updateChartData("current_month");
      setRest(false);
    }
    if (period === "Current Year") {
      restDashBoardData();
      updateChartData("current_year");
      setMonth(0);
      setRest(false);
    }
    if (!customDateModal) {
      if (period === "Custom Date") {
        setMonth(0);
        setCustomteModal(true);
        setRest(false);
      }
    }
  }, [period]);

  useEffect(() => {
    if (rest) {
      if (period === "Custom Date") {
        setMonth(0);
        const getData = async () => {
          try {
            const response: DashboardDataResponse = await getDashboardDateData(
              clientId,
              value,
              false
            );
            await setDataState({
              data: response,
              disabledButton: false
            });
          } catch (error) {
            console.log(error);
            const errorMessage = "Could not load data, please try again later.";
            const severity: AlertColor = "error";

            await setDataState({
              disabledButton: false,
              alertMessage: errorMessage,
              alertSeverity: severity,
              isAlertOpen: true
            });
          }
        };
        if (typeof client === "string") {
          getData();
        }
      }

      updateChartData("custom_date");
    }
  }, [rest]);

  useEffect(() => {
    setPeriod(periods[1].text);
  }, [clientId]);
  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">{chartTitle}</Typography>
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
                handleChange(_period.text);
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
      <CustomDatePicker
        open={customDateModal}
        handleClose={() => {
          setCustomteModal(false);
        }}
        setValue={setValue}
        setRest={setRest}
      />
    </Box>
  );
}

export default ReviewGrowth;
