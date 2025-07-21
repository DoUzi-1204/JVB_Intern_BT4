const labels = [];
const now = new Date();
const currentHour = now.getHours();

// Dữ liệu mẫu
const temperatures = Array.from(
  { length: 24 },
  () => Math.floor(Math.random() * 10) + 20
);

// Khai báo chấm hiển thị và màu tại từng điểm
const pointRadius = [];
const pointBackgroundColor = [];

for (let i = 0; i < 24; i++) {
  const isVisiblePoint = i % 3 === 0 || i === 23;
  const isCurrentHour = i === currentHour;

  if (isVisiblePoint) {
    pointRadius.push(isCurrentHour ? 8 : 4); // to hơn nếu là giờ hiện tại
    pointBackgroundColor.push(isCurrentHour ? "#ff3b30" : "#5596f6");
  } else {
    pointRadius.push(0);
    pointBackgroundColor.push("rgba(0,0,0,0)");
  }

  labels.push(i.toString().padStart(2, "0") + ":00");
}

export const config = {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Temp",
        fill: true,
        borderColor: "#5596f6",
        backgroundColor: "rgb(238,244,254)",
        data: temperatures,
        pointRadius: pointRadius,
        pointHitRadius: 6,
        pointHoverRadius: 4,
        pointBackgroundColor: pointBackgroundColor,
        pointHoverBackgroundColor: "#5596f6",
        pointHoverBorderColor: "#5596f6",
        pointHoverBorderWidth: 4,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    layout: {
      padding: {
        top: 8,
        bottom: 8,
        right: 8,
      },
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: true,
            maxRotation: 0,
            autoSkip: false,
            callback: function (value, index) {
              if (index % 3 === 0 || index === 23) {
                return value;
              }
              return "";
            },
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
            beginAtZero: true,
          },
        },
      ],
    },
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        title: function (tooltipItems, data) {
          const index = tooltipItems[0].index;
          return data.labels[index];
        },
        label: function (tooltipItem) {
          return tooltipItem.yLabel.toString();
        },
      },
      backgroundColor: "transparent",
      titleFontColor: "#5596f6",
      bodyFontColor: "#5596f6",
      bodyFontSize: 26,
      displayColors: false,
      position: "average",
    },
  },
};
