import { useCallback, useEffect, useRef } from "react";
import Chart from "chart.js";
import { config } from "./config";

export default function WeatherChart({ data, labels, type }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const getTitle = () => {
    switch (type) {
      case "humidity":
        return "Humidity (%)";
      case "uv":
        return "UV Index";
      default:
        return "Temperature (°C)";
    }
  };

  const getColor = () => {
    switch (type) {
      case "humidity":
        return "rgba(46, 204, 113, 0.6)"; // xanh lá cây
      case "uv":
        return "rgba(243, 156, 18, 0.6)"; // cam
      default:
        return "rgba(85, 150, 246, 0.6)"; // xanh dương
    }
  };

  const updateChartData = useCallback(() => {
    if (!chartRef.current) return;

    chartRef.current.data.datasets[0].data = data;
    chartRef.current.data.labels = labels;
    chartRef.current.data.datasets[0].backgroundColor = getColor();

    chartRef.current.options.plugins.tooltip.callbacks.label = function (
      context
    ) {
      return context.parsed.y.toString();
    };

    chartRef.current.update();
  }, [data, labels, type]);

  useEffect(() => {
    if (canvasRef.current) {
      chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
        ...config,
        data: {
          ...config.data,
          labels,
          datasets: [
            {
              ...config.data.datasets[0],
              data,
              backgroundColor: getColor(),
            },
          ],
        },
        options: {
          ...config.options,
          plugins: {
            ...config.options.plugins,
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.parsed.y.toString();
                },
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []); // chỉ khởi tạo 1 lần

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <section>
      <p>{getTitle()}</p>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <style jsx>{`
        section {
          grid-area: chart;
          height: 100%;
        }
        p {
          font-size: 18px;
          margin: 20px 0 0 0;
          color: rgb(102, 102, 102);
        }
        div {
          display: block;
          height: 150px;
          position: relative;
          width: 100%;
        }
      `}</style>
    </section>
  );
}
