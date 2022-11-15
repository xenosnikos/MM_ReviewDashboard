import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';

function SourceGraph() {

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 450,
      stacked: true
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    xaxis: {
      categories: ['Google', 'Yellow Pages', 'Foursquare', 'Yelp', 'Glassdoor', 'WebLocal'],
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'right',
      offsetX: 0,
      offsetY: 50
    }
  }

  const series = [
    {
      name: 'No Rating',
      data: []
    },
    {
      name: '1 Star',
      data: []
    },
    {
      name: '2 Stars',
      data: [20]
    },
    {
      name: '3 Stars',
      data: [50, 0, 0, 0, 0, 0]
    },
    {
      name: '4 Stars',
      data: [30, 3]
    },
    {
      name: '5 Stars',
      data: [200, 20]
    },
    {
      name: 'Recommended',
      data: []
    },
    {
      name: 'Not Recommended',
      data: []
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={450}
    />
  )
}

export default SourceGraph;