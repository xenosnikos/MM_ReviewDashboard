import { useEffect, useState } from "react";
import { Chart } from "src/components/Chart";
import type { ApexOptions } from "apexcharts";
import { providers } from "@/helpers/constant";

const initOptions: ApexOptions = {
  chart: {
    id: "source-chart",
    type: "bar",
    height: 450,
    stacked: true
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: "bottom",
          offsetX: -10,
          offsetY: 0
        }
      }
    }
  ],
  xaxis: {
    categories: providers
  },
  fill: {
    opacity: 1
  },
  legend: {
    position: "right",
    offsetX: 0,
    offsetY: 50
  },
  series: [
    {
      name: "1 Star",
      data: new Array(providers.length).fill(0)
    },
    {
      name: "2 Stars",
      data: new Array(providers.length).fill(0)
    },
    {
      name: "3 Stars",
      data: new Array(providers.length).fill(0)
    },
    {
      name: "4 Stars",
      data: new Array(providers.length).fill(0)
    },
    {
      name: "5 Stars",
      data: new Array(providers.length).fill(0)
    }
  ]
};

function SourceGraph({ data }) {
  const [options, setOptions] = useState<ApexOptions>(initOptions);

  useEffect(() => {
    if (data) {
      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: { ...prevOptions.xaxis, categories: providers },
        series: data.map((item) => ({
          ...item,
          data: providers.map((provider) => item.data[providers.indexOf(provider)] || 0)
        }))
      }));
    }
  }, [data]);

  return <Chart options={options} series={options.series} type="bar" height={450} />;
}

export default SourceGraph;
