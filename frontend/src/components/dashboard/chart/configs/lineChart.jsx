const lineChart = {
  series: [
    {
      name: "Mobile apps",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
    },
    {
      name: "Websites",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
    },
  ],

  options: {
    chart: {
      type: "area",
      toolbar: { show: false },
      foreColor: "#475569", // slate-600
    },
    legend: { show: true, labels: { colors: "#475569" } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    grid: {
      borderColor: "#e2e8f0", // slate-200
      strokeDashArray: 4,
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 600,
          colors: ["#64748b"], // slate-500
        },
      },
    },
    xaxis: {
      categories: ["Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"],
      labels: {
        style: {
          fontSize: "13px",
          fontWeight: 600,
          colors: Array(9).fill("#64748b"), // slate-500
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} users`,
      },
    },
    colors: ["#3b82f6", "#10b981"], // Tailwind (blue-500, green-500)
  },
};

export default lineChart;
