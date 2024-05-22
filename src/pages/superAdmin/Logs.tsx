import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { LogsCard } from "Components/superAdmin/LogsCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { getLogs } from "services/superAdmin";
import { iLog, iLogsList } from "types/logs";
export const Logs = () => {
  const [query, setQuery] = useState<any>({
    name: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      name: e.target.value === "" ? undefined : e.target.value,
    });
  }
  const {
    data,
    isLoading,
  }: {
    data: iLogsList;
    isLoading: any;
    fetchData: any;
  } = useData(getLogs, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Users Permission :</span>
        <TextField
          className="flex-1"
          placeholder=" Search by Name, Job Number"
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
        ) : (data?.logs?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.logs?.map((log: iLog) => {
              return <LogsCard log={log} key={log.id} />;
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
