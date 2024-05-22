import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { SampleCard } from "Components/technician/SampleCard";
import { StoragePicker } from "Components/technician/storage/StoragePicker";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { getFreezers } from "services/superAdmin";
import { useDebounce } from "hooks/useDebounce";
import { getApprovalSamples } from "services/technician";
import { iFreezerlist } from "types/freezer";
import { iSampleList } from "types/sample";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export const Storage = () => {
  const {
    data: freezerData,
    isLoading: isFreezerLoading,
  }: {
    data: iFreezerlist;
    isLoading: any;
    fetchData: any;
  } = useData(getFreezers);
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
    data: iSampleList;
    isLoading: any;
    fetchData: any;
  } = useData(getApprovalSamples, query);
  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Storage :</span>
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
        <ScrollableContainer>
          <div className="w-full h-full flex flex-col gap-3">
            {isLoading || isFreezerLoading ? (
              <Loading />
            ) : (data.samples?.length ?? 0) === 0 ? (
              <NoDataFound />
            ) : (
              data.samples.map((item) => {
                return (
                  <SampleCard
                    freezers={freezerData}
                    isStorage={true}
                    reloadData={fetchData}
                    key={item._id}
                    sample={item}
                  />
                );
              })
            )}
          </div>
        </ScrollableContainer>
      </div>
    </MainLayout>
  );
};
