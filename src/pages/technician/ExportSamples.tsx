import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import ExportSamplesHandler from "Components/technician/ExportSamplesHandler";
import { SampleExportCard } from "Components/technician/SampleExportCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { Fragment, useState } from "react";
import { removeSample, sampleToExport } from "services/technician";
import { iFreezerExportList, iSampleToExport } from "types/sample";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { SHOW_TOAST_MESSAGE } from "utils/constant";

const ExportSamples = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [samplesToExport, setSampleToExport] = useState<iSampleToExport[]>([]);
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
    fetchData,
  }: {
    data: iFreezerExportList;
    isLoading: any;
    fetchData: any;
  } = useData(sampleToExport, query);
  const handleExportSample = (sample: iSampleToExport) => {
    const index = samplesToExport.findIndex((item) => item._id === sample._id);
    if (index === -1) {
      setSampleToExport((prevState) => [...prevState, sample]);
    } else {
      setSampleToExport((prevState) => {
        const updatedSamples = [...prevState];
        updatedSamples.splice(index, 1);
        return updatedSamples;
      });
    }
  };
  const onSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = (await removeSample(
        samplesToExport.map((item) => item._id)
      )) as {
        message: string;
      };

      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message: res.message,
          isOpen: true,
          severity: "success",
        },
      });
    } catch (err: any) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message:
            err?.response?.data?.message ||
            "Something is going Wrong , Try again later",
          isOpen: true,
          severity: "error",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
                {item.samples.map((sample) => (
                  <SampleExportCard
                    key={sample._id}
                    sample={sample}
                    freezer={item}
                    sendSample={handleExportSample}
                    samples={samplesToExport}
                  />
                ))}
              </Fragment>
            ))}
          </ScrollableContainer>
        )}
        <div className="flex gap-3 w-full">
          {samplesToExport.length !== 0 && (
            <ExportSamplesHandler
              samplesToExport={samplesToExport}
              isLoading={isSubmitting}
              clear={() => {
                onSubmit();
                fetchData();
                setSampleToExport([]);
              }}
            />
          )}
          <Button
            className="w-full"
            onClick={() => {
              setSampleToExport([]);
            }}
            variant="contained"
            color="error"
          >
            cLEAR
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ExportSamples;
