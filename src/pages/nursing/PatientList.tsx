import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { PatientCard } from "Components/Patient/PatientCard";
import { Loading } from "Components/Shared/Loading";
import { NoDataFound } from "Components/Shared/NoDataFound";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useData } from "hooks/useData";
import { useDebounce } from "hooks/useDebounce";
import { useState } from "react";
import { getPatientsList } from "services/nursing";
import { iPatientList } from "types/Patient";

export const PatientList = () => {
  const [query, setQuery] = useState<any>({
    isDeleted: undefined,
    patientName: undefined,
    seen: undefined,
  });
  const searchDebounce = useDebounce(searchData, 1500);

  function searchData(e: any) {
    setQuery({
      ...query,
      patientName: e.target.value === "" ? undefined : e.target.value,
    });
  }

  const {
    data,
    isLoading,
    fetchData,
  }: {
    data: iPatientList;
    isLoading: any;
    fetchData: any;
  } = useData(getPatientsList, query);

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Patient List :</span>
        <div className="flex flex-col-reverse justify-between items-center md:flex-row">
          <TextField
            className="flex-1"
            sx={{ m: 1 }}
            placeholder=" Search by Patient Name, MRN, SSN"
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
              sx={{}}
              value={query.isDeleted || query.seen}
              defaultValue={""}
              onChange={(e: any) => {
                if (e.target.value === "") {
                  return setQuery({
                    ...query,
                    isDeleted: undefined,
                    seen: undefined,
                  });
                } else if (e.target.value === "seen") {
                  return setQuery({
                    ...query,
                    isDeleted: undefined,
                    seen: "true",
                  });
                }
                setQuery({
                  ...query,
                  isDeleted: e.target.value,
                  seen: undefined,
                });
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"true"}>Deleted</MenuItem>
              <MenuItem value={"false"}>Available</MenuItem>
              <MenuItem value={"seen"}>Seen</MenuItem>
            </Select>
          </FormControl>
        </div>
        {isLoading ? (
          <Loading />
        ) : (data?.patients?.length ?? 0) === 0 ? (
          <NoDataFound />
        ) : (
          <ScrollableContainer>
            {data.patients?.map((item) => {
              return (
                <PatientCard
                  reloadData={fetchData}
                  key={item._id}
                  patient={item}
                />
              );
            })}
          </ScrollableContainer>
        )}
      </div>
    </MainLayout>
  );
};
