import Chart from "react-apexcharts";

interface ICallStatus {
  params: any;
}
export default function CallStatus({ params }: ICallStatus) {
  let callPlannedSeries: { name: any; data: any[] }[] = [];
  let callPlannedOptions: any[] = [];
  params?.map((item: any) => {
    callPlannedOptions.push(item?.text);
    callPlannedSeries.push({ name: item?.text, data: [item?.total] });
  });
  const series = callPlannedSeries;
  let colors = [
    "#8E60FF",
    "#90EEF5",
    "#FFA800",
    "rgba(38, 155, 143, 0.85)",
    "#91BDFF",
  ];

  const options = {
    chart: {
      id: "simple-bar",
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "15%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
    },
    yaxis: {
      title: {
        text: "Number of Counts",
      },
    },
    xaxis: {
      categories: callPlannedOptions,
    },
  };
  return (
    <div style={{ minHeight: "298px" }}>
      <Chart
        options={options}
        type="bar"
        series={series}
        width="100%"
        height="298px"
      />
    </div>
  );
}
