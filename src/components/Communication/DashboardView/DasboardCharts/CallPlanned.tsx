import Chart from "react-apexcharts";

interface ICallPlanned {
  params: any;
}

export default function CallPlanned({ params }: ICallPlanned) {
  let callPlannedSeries: { name: any; data: any[] }[] = [];
  let callPlannedOptions: any[] = [];
  params?.map((item: any) => {
    callPlannedOptions.push(item?.text);
    callPlannedSeries.push({ name: item?.text, data: [item?.total] });
  });

  let colors = [
    "rgba(38, 155, 143, 0.85)",
    "#91BDFF",
    "#8E60FF",
    "#90EEF5",
    "#FFA800",
  ];
  const options = {
    chart: {
      id: "basic-bar",
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "15%",
      },
    },
    yaxis: {
     
      title: {
        text: "Number of Calls",
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
    xaxis: {
      categories: callPlannedOptions,
    },
  };
  return (
    <div style={{minHeight: "298px"}}>

      <Chart
        options={options}
        type="bar"
         series={callPlannedSeries}
        width="100%"
        height="298px"
        />
    </div>
  );
}
