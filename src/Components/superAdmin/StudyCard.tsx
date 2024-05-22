import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { iStudy } from "types/study";
import JSZip from "jszip";

import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { SHOW_TOAST_MESSAGE } from "utils/constant";
import { useState } from "react";
import { approveStudy } from "services/superAdmin";
export const StudyCard = ({
  study,
  isApproved,
  reloadData,
}: {
  study: iStudy;
  isApproved: boolean;
  reloadData: () => void;
}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const downloadFilesAsZip = async () => {
    try {
      const blobs = await Promise.all(
        study.files.map(async (url) => {
          const response = await fetch(url.filename);
          return await response.blob();
        })
      );
      const zip = new JSZip();
      blobs.forEach((blob, index) => {
        const fileName = study.files[index].filename.substring(
          study.files[index].filename.lastIndexOf("/") + 1
        );
        zip.file(fileName, blob);
      });
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(zipBlob);
      link.download = `${study.studyName}.zip`;
      link.click();
    } catch (error) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message: "Error while download",
          isOpen: true,
          severity: "error",
        },
      });
    }
  };
  const onSubmit = async (studyId: string) => {
    try {
      setIsSubmitting(true);
      const res = (await approveStudy(studyId)) as {
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
      reloadData();
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
    <Accordion
      className={`border border-solid border-slate-400 ${
        study.isClosed ? "bg-red-300" : undefined
      }`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="text-lg">{`${study.studyName}`}</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <span className="text-base">
            <strong>Pi Name:</strong> {study.piName}
          </span>
          <span className="text-base">
            <strong>Study Number:</strong> {study.studyNumber}
          </span>
          <span className="text-base">
            <strong>Initiated Data:</strong>
            {format(new Date(study.studyInitDate), "yyyy/M/d")}
          </span>
          <span className="text-base">
            <strong>Study Keywords:</strong> {study.studyKeywords}
          </span>
          <span className="text-base">
            <strong>Added Date:</strong>
            {format(new Date(study.createdAt), "yyyy/M/d")}
          </span>
          {study.closeData && (
            <span className="text-base">
              <strong>Closed Date:</strong>
              {study.closeData && format(new Date(study.closeData), "yyyy/M/d")}
            </span>
          )}
          <div className="flex gap-2 w-full">
            <Button
              variant="contained"
              onClick={downloadFilesAsZip}
              className="w-full"
            >
              Download study file
            </Button>
            {isApproved && (
              <Button
                variant="contained"
                onClick={() => {
                  onSubmit(study._id);
                }}
                className="w-full"
                disabled={isSubmitting}
              >
                <div className="flex gap-2 items-center">
                  <span>Approve Study</span>
                  {isSubmitting && (
                    <CircularProgress className="!w-[1rem] !h-[1rem]" />
                  )}
                </div>
              </Button>
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
