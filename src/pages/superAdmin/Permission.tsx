import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { PermissionCard } from "Components/superAdmin/PermissionCard";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { getPendingUsers } from "services/superAdmin";
import { iUserList } from "types/user";
export const Permission = () => {
  const [query, setQuery] = useState<any>({
    employeeId: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      employeeId: e.target.value === "" ? undefined : e.target.value,
    });
  }

  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iUserList;
    isLoading: any;
    fetchData: any;
  } = useData(getPendingUsers, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Users Permission :</span>
        <TextField
          className="flex-1"
          placeholder=" Search by User Name, User ID"
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
        ) : (data?.users?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.users?.map((user: any) => {
              return (
                <PermissionCard
                  reloadData={fetchData}
                  key={user._id}
                  user={user}
                />
              );
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
