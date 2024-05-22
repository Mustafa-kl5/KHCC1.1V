import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { useState } from "react";
import { iPatient } from "types/Patient";

import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { seen } from "services/technician";
import { SHOW_TOAST_MESSAGE } from "utils/constant";

export const PatientCards = ({
  paitent,
  reloadData,
}: {
  paitent: iPatient;
  reloadData: () => void;
}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const seenHandler = async (data: any) => {
    try {
      setIsSubmitting(true);
      const res = (await seen(paitent._id)) as {
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
      reloadData();
    }
  };

  return (
    <Accordion
      className={`border border-solid border-slate-400 ${
        paitent.isDeleted && "!bg-[#ffebee]"
      }`}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="w-full flex justify-between pe-2 items-center">
          <span className="text-lg">{paitent.patientName}</span>
          {paitent.seen && (
            <span className="text-white font-bold text-sm bg-[#00c851] h-fit px-3 text-center rounded-lg">
              Seen
            </span>
          )}
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <span className="text-base">
            <strong>{paitent.ssn ? "SSN:" : "MRN:"}</strong>
            {paitent.ssn ? paitent.ssn : paitent.mrn}
          </span>
          <span className="text-base">
            <strong>Day Code:</strong> {paitent.dayCode}
          </span>
          <span className="text-base">
            <strong>research ID:</strong> {paitent.researchId}
          </span>
          <span className="text-base">
            <strong>Birth Date:</strong>
            {format(new Date(paitent.birthDate), "yyyy/M/d")}
          </span>
          <span className="text-base">
            <strong>Admition Recovery Date:</strong>
            {format(new Date(paitent.admitionRecDate), "yyyy/M/d hh:mm:ss a")}
          </span>
          <span className="text-base">
            <strong>Gender:</strong> {paitent.gender}
          </span>
          <span className="text-base">
            <strong>Sample Drawing:</strong>
            {format(new Date(paitent.sampleDrawing), "yyyy/M/d hh:mm:ss a")}
          </span>
          {paitent.isDeleted && (
            <span className="text-base">
              <strong>Delete Reason:</strong> {paitent.deleteReason}
            </span>
          )}
          {paitent.seen && (
            <span className="text-base">
              <strong>Seen By:</strong> {paitent.seenBy}
            </span>
          )}
        </div>
        {!paitent.seen && (
          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              onClick={seenHandler}
              variant="outlined"
              size="large"
              startIcon={<VisibilityIcon />}
            >
              seen
            </Button>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
