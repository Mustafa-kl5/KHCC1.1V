import { BarChart } from "@mui/x-charts/BarChart";
import { useData } from "hooks/useData";
import { getFreezerStatistics } from "services/superAdmin";

export const FreezersChart = ({ chartSetting }: { chartSetting: any }) => {
  const { data } = useData(getFreezerStatistics);

  const sampleTypes =
    data?.statistics[0]?.samplesCount.map((sample: any) => ({
      id: sample.sampleType,
      sampleType: sample.sampleType,
    })) || [];

  const dataset =
    data?.statistics.map((stats: any) => {
      const initialAccumulator: { [key: string]: number } = {};
      stats.samplesCount.forEach((sample: any) => {
        initialAccumulator[sample.sampleType] = sample.count;
      });
      return {
        freezers: `${stats.freezerName} - ${stats.freezerModel}`,
        ...initialAccumulator,
      };
    }) || [];

  return (
    <BarChart
      margin={{ top: 10, bottom: 30, left: 60, right: 0 }}
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "freezers" }]}
      yAxis={[{ scaleType: "linear" }]}
      series={sampleTypes.map((sampleType: any) => ({
        dataKey: sampleType.sampleType,
        label: sampleType.sampleType,
        valueAccessor: (d: any) => d[sampleType.sampleType],
      }))}
      {...chartSetting}
    />
  );
};
