import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { axisClasses } from "@mui/x-charts";
import { FreezersChart } from "Components/superAdmin/Charts/FreezersChart";
import { StudiesChart } from "Components/superAdmin/Charts/StudiesChart";
import { MainLayout } from "UI/MainLayout";
import { useEffect, useRef, useState } from "react";
export const Dashboard = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartType, setChartType] = useState<string>("freezers");
  const [chartSetting, setChartSetting] = useState({
    width: 200,
    height: 200,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (chartRef.current) {
        setChartSetting((prevSetting) => ({
          ...prevSetting,
          width: (chartRef.current?.clientWidth ?? 0) - 10 || prevSetting.width,
          height: chartRef.current?.clientHeight || prevSetting.height,
        }));
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3 ">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">Dashboard :</span>
          <div className="flex gap-2 items-center">
            <span className="font-bold text-xl pe-2"> Statistics By:</span>
            <ButtonGroup
              disableElevation
              variant="contained"
              aria-label="Disabled button group"
            >
              <Button
                variant={chartType === "freezers" ? "contained" : "outlined"}
                onClick={() => {
                  setChartType("freezers");
                }}
              >
                Freezers
              </Button>
              <Button
                variant={chartType === "studies" ? "contained" : "outlined"}
                onClick={() => {
                  setChartType("studies");
                }}
              >
                Studies
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="w-full h-full" ref={chartRef}>
          {chartType === "freezers" && (
            <FreezersChart chartSetting={chartSetting} />
          )}
          {chartType === "studies" && (
            <StudiesChart chartSetting={chartSetting} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};
