import { Box, Divider, Typography, useTheme } from "@mui/material";
import { ApexOptions } from "apexcharts";
import { Chart } from "@/components/Chart";
import { useContext, useEffect, useState } from "react";
import { providers } from "@/helpers/constant";
import DataContext from "@/contexts/DataContext";
import * as htmlToImage from "html-to-image";

const initOptions: ApexOptions = {
  chart: {
    width: 380,
    type: "donut"
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
  labels: providers,
  fill: {
    type: "gradient"
  },
  legend: {
    formatter: function (val, opts) {
      return opts.w.globals.series[opts.seriesIndex] + "% " + val;
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ],
  series: [0, 0, 0]
};

function ReviewSourceBreakDown({ data }) {
  const theme = useTheme();
  const [options, setOptions] = useState<ApexOptions>(initOptions);
  const { setDataState } = useContext(DataContext);

  useEffect(() => {
    if (!data) return;

    const newSeries = [];
    providers.forEach((provider) => {
      const index = data.findIndex((item) => item.type === provider);
      if (index > -1 && data[index].count) newSeries.push(parseFloat(data[index].count));
      else newSeries.push(0);
    });

    setOptions({ ...options, series: newSeries });
  }, [data]);

  useEffect(() => {
    const getChart = async () => {
      const chartElement = document.querySelector("#chart-donut2") as HTMLElement;

      if (chartElement) {
        await htmlToImage.toPng(chartElement).then((dataUrl) => {
          setDataState({
            donut2URI: dataUrl
          });
        });
      }
    };

    getChart();
  }, [options]);

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
        id="chart-donut2"
        type="donut"
        width={532}
        options={options}
        series={options.series}
      />
    </Box>
  );
}

export default ReviewSourceBreakDown;
