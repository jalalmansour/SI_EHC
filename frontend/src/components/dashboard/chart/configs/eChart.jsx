const eChart = {
  series: [
    {
      name: "Sales",
      data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
      color: "#38bdf8", // Tailwind sky-400
    },
  ],

  options: {
    chart: {
      type: "bar",
      toolbar: { show: false },
      foreColor: "#fff", // texte blanc
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    grid: {
      borderColor: "#475569", // Tailwind slate-600
      strokeDashArray: 3,
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      labels: {
        style: { colors: Array(9).fill("#fff") },
      },
    },
    yaxis: {
      labels: {
        style: { colors: Array(6).fill("#fff") },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `$ ${val}k`,
      },
    },
  },
};

export default eChart;
