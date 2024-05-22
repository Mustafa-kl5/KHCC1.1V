import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { StudyCard } from "Components/superAdmin/StudyCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { getPendingStudies, getStudies } from "services/superAdmin";
import { iStudyList } from "types/study";
export const ApproveStudies = () => {
  const [query, setQuery] = useState<any>({
    study: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      study: e.target.value === "" ? undefined : e.target.value,
    });
  }

  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iStudyList;
    isLoading: any;
    fetchData: any;
  } = useData(getPendingStudies, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Studies :</span>
        <TextField
          className="flex-1"
          placeholder=" Search by PI Name, Study Name, Study Number"
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
        ) : (data?.studies.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.studies.map((study) => {
              return (
                <StudyCard
                  isApproved={true}
                  key={study._id}
                  study={study}
                  reloadData={fetchData}
                />
              );
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
