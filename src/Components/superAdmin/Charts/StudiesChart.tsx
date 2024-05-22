import { BarChart } from "@mui/x-charts/BarChart";
import { useData } from "hooks/useData";
import { getStudiesStatistics } from "services/superAdmin";

export const StudiesChart = ({ chartSetting }: { chartSetting: any }) => {
  const { data } = useData(getStudiesStatistics);

  // Extract sample types from the data
  const sampleTypes =
    data?.statistics.reduce((accumulator: string[], current: any) => {
      Object.keys(current.sampleCounts).forEach((sampleType: string) => {
        if (!accumulator.includes(sampleType)) {
          accumulator.push(sampleType);
        }
      });
      return accumulator;
    }, []) || [];

  // Prepare dataset for BarChart
  const dataset =
    data?.statistics.map((stats: any) => {
      const dataObject: { [key: string]: number } = {};
      sampleTypes.forEach((sampleType: string) => {
        dataObject[sampleType] = stats.sampleCounts[sampleType] || 0;
      });
      return {
        study: stats.studyName,
        ...dataObject,
      };
    }) || [];

  return (
    <BarChart
      margin={{ top: 10, bottom: 30, left: 60, right: 0 }}
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "study" }]}
      yAxis={[{ scaleType: "linear" }]}
      series={sampleTypes.map((sampleType: string) => ({
        dataKey: sampleType,
        label: sampleType,
        valueAccessor: (d: any) => d[sampleType],
      }))}
      {...chartSetting}
    />
  );
};
