import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleCard } from "Components/technician/SampleCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getSamples } from "services/technician";
import { iSampleList } from "types/sample";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";

export const SamplesList = () => {
  const [query, setQuery] = useState<any>({
    searchData: undefined,
    isApproved: undefined,
    isRejected: undefined,
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
    data: iSampleList;
    isLoading: any;
    fetchData: any;
  } = useData(getSamples, query);
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Samples :</span>
        <div className="flex items-center">
          <TextField
            className="flex-1"
            placeholder=" Search by Patient Name, MRN, SSN, Sample Serial, Study Number"
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
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={query.isDeleted || query.seen}
              defaultValue={""}
              onChange={(e: any) => {
                if (e.target.value === "") {
                  return setQuery({
                    ...query,
                    isApproved: undefined,
                    isRejected: undefined,
                  });
                } else if (e.target.value === "isApproved") {
                  return setQuery({
                    ...query,
                    isApproved: "true",
                    isRejected: "false",
                  });
                } else {
                  setQuery({
                    ...query,
                    isApproved: "false",
                    isRejected: "true",
                  });
                }
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"isApproved"}>Approved</MenuItem>
              <MenuItem value={"isRejected"}>Rejected</MenuItem>
            </Select>
          </FormControl>
        </div>
        {isLoading ? (
          <Loading />
        ) : (data.samples?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.samples.map((item) => {
              return (
                <SampleCard
                  isStorage={false}
                  reloadData={fetchData}
                  key={item._id}
                  sample={item}
                />
              );
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
