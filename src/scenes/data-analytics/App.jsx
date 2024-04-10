import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { DataContext } from "../../provider/dataprovider/App";
import "chartjs-plugin-datalabels";

function DataAnalytics() {
  const { data } = useContext(DataContext);
  const uniqueLabels = {};
  data.forEach((item) => {
    const label = `${item.intent}-${item.subintent}`;
    if (!uniqueLabels[label]) {
      uniqueLabels[label] = 0;
    }
    uniqueLabels[label] += item.point;
  });

  const chartData = {
    labels: Object.keys(uniqueLabels),
    datasets: [
      {
        data: Object.values(uniqueLabels),
        backgroundColor: [
          "rgba(0, 0, 132, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(0, 206, 86, 1)",
          "rgba(134, 200, 180, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
    hoverOffset: 4,
  };

  return (
    <div className="flex flex-col h-full gap-5 ">
      <h1 className="font-bold text-3xl">OverView Chart</h1>
      <div className="max-w-[380px] flex items-center justify-center bg-[#ffffff] p-2 rounded-md shadow-[0px_2px_10px_rgba(0,0,0,0.2)]">
        <Pie
          data={chartData}
          options={{
            plugins: {
              responsive: true,
              title: {
                font: { size: 30 },
                text: "Data analytics Chart",
                display: true,
                color: "#B14688",
              },
              legend: {
                title: {
                  display: true,
                  font: { size: 18 },
                  color: "#000",
                },
                labels: {
                  usePointStyle: true,
                  font: { size: 16 },
                  color: "#000",
                },
                position: "right",
              }
            },
          }}
        />
      </div>
    </div>
  );
}

export default DataAnalytics;
