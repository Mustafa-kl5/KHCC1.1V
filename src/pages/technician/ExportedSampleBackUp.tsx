import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleExportCard } from "Components/technician/SampleExportCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { Fragment, useState } from "react";
import { sampleToExportBackup } from "services/technician";
import { iFreezerExportListBackUp, iSampleToExport } from "types/sample";

const ExportedSampleBackUp = () => {
  const [samplesToExport] = useState<iSampleToExport[]>([]);
  const [query, setQuery] = useState<any>({
    searchData: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      ...query,
      searchData: e.target.value === "" ? undefined : e.target.value,
    });
  }

  const {
    data,
    isLoading,
  }: {
    data: iFreezerExportListBackUp;
    isLoading: any;
    fetchData: any;
  } = useData(sampleToExportBackup, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">Export Samples :</span>
        </div>
        <TextField
          className="flex-1"
          placeholder=" Search by Patient Name, KHCC Code, SSN, MRN, Sample Serial"
          size="small"
          variant="outlined"
          onChange={(e: any) => {
            searchDebounce(e);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {isLoading ? (
          <Loading />
        ) : (data.freezers?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.freezers?.map((item) => (
              <Fragment key={item._id}>
                {item.samplesBackUp.map((sample) => (
                  <SampleExportCard
                    key={sample._id}
                    sample={sample}
                    freezer={item}
                    sendSample={() => {}}
                    samples={samplesToExport}
                    isSearch={false}
                  />
                ))}
              </Fragment>
            ))}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};

export default ExportedSampleBackUp;
