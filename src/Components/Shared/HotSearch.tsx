import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";

import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import { PatientCard } from "Components/Patient/PatientCard";
import { StudyCard } from "Components/superAdmin/StudyCard";
import { SampleExportCard } from "Components/technician/SampleExportCard";
import { ScrollableContainer } from "UI/ScrollableContainer";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hotSearch } from "services/superAdmin";
import { Query } from "types/file";
import { iHotSearch } from "types/hotSearch";
import { iSampleToExport } from "types/sample";
import {
  HotSearchPlaceholders,
  SHOW_TOAST_MESSAGE,
  hotSearchPlaceHolders,
} from "utils/constant";
import { NoDataFound } from "./NoDataFound";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function HotSearch({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: () => void;
}) {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [samplesToExport] = useState<iSampleToExport[]>([]);
  const [data, setData] = useState<iHotSearch>();
  const [query, setQuery] = useState<Query>({
    searchType: "Study",
    searchWith: "",
  });

  const getData = async () => {
    try {
      setIsSubmitting(true);
      const res = await hotSearch(query);
      setData(res.data);
    } catch (err: any) {
      setData(undefined);
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
    <Dialog
      fullScreen
      open={isOpen}
      onClose={() => {
        setQuery({
          searchType: "Study",
          searchWith: "",
        });
        setData(undefined);
        handleClose();
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setQuery({
                searchType: "Study",
                searchWith: "",
              });
              setData(undefined);

              handleClose();
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Search
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex gap-3 w-full flex-col p-5 h-full">
        <div className="w-full flex flex-col gap-2">
          <Select
            className="w-full"
            placeholder="Search By"
            value={query.searchType}
            onChange={(e: any) => {
              setQuery({
                ...query,
                searchType: e.target.value,
              });
            }}
          >
            <MenuItem value="" disabled>
              Search By
            </MenuItem>
            <MenuItem value="Study">Study</MenuItem>
            <MenuItem value="Patient">Patient</MenuItem>
            <MenuItem value="Sample">Samples</MenuItem>
          </Select>
          <TextField
            className="w-full"
            placeholder={
              hotSearchPlaceHolders[
                query.searchType as keyof HotSearchPlaceholders
              ]
            }
            size="small"
            variant="outlined"
            onChange={(e: any) => {
              setQuery({
                ...query,
                searchWith: e.target.value,
              });
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="w-full "
            size="large"
            variant="contained"
            onClick={getData}
            disabled={isSubmitting || query.searchWith.length === 0}
          >
            <div className="flex gap-2 items-center">
              <span>Search</span>
              {isSubmitting && (
                <CircularProgress className="!w-[1rem] !h-[1rem]" />
              )}
            </div>
          </Button>
        </div>
        <div className="h-full flex gap-3 flex-col md:flex-row ">
          <div className="h-full w-full md:w-1/3  bg-slate-100 rounded-lg flex flex-col p-2">
            <div className="text-xl font-normal">Study :</div>
            {data ? (
              <ScrollableContainer>
                <StudyCard
                  isApproved={false}
                  reloadData={() => {}}
                  study={data.study}
                />
              </ScrollableContainer>
            ) : (
              <NoDataFound />
            )}
          </div>
          <div className="h-full w-full md:w-1/3 bg-slate-100 rounded-lg flex flex-col p-2">
            <div className="text-xl font-normal">Patient :</div>
            {data ? (
              <ScrollableContainer>
                {data.patient.map((item) => {
                  return (
                    <PatientCard
                      isSearch={false}
                      key={item._id}
                      patient={item}
                      reloadData={() => {}}
                    />
                  );
                })}
              </ScrollableContainer>
            ) : (
              <NoDataFound />
            )}
          </div>
          <div className="h-full w-full md:w-1/3 bg-slate-100 rounded-lg flex flex-col p-2">
            <div className="text-xl font-normal">Samples :</div>
            {data ? (
              <ScrollableContainer>
                {data.freezers.map((item: any) => (
                  <React.Fragment key={item._id}>
                    {item.samples.map((sample: any) => (
                      <SampleExportCard
                        key={sample._id}
                        sample={sample}
                        freezer={item}
                        sendSample={() => {}}
                        samples={samplesToExport}
                        isSearch={false}
                      />
                    ))}
                  </React.Fragment>
                ))}
              </ScrollableContainer>
            ) : (
              <NoDataFound />
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
