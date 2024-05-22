import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { iSample } from "types/sample";
import { ApproveSample } from "./ApproveSample";
import { RejectSample } from "./RejectSample";
import { StoragePicker } from "./storage/StoragePicker";
import { iFreezerlist } from "types/freezer";

export const SampleCard = ({
  sample,
  isStorage,
  reloadData,
  freezers,
}: {
  sample: iSample;
  isStorage: boolean;
  reloadData: () => void;
  freezers?: iFreezerlist;
}) => {
  const [rejectModalOpen, setRejectModalOpen] = useState<boolean>(false);
  const [approveModalOpen, setApproveModalOpen] = useState<boolean>(false);
  const [chooseCell, setChooseCell] = useState<boolean>(false);
  return (
    <>
      <Accordion className={`border border-solid border-slate-400`}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <span className="text-lg font-bold">
            {sample.patient.patientName} {sample.sampleSerial}
          </span>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex justify-between"></div>
          <div className="flex flex-col gap-2">
            <span className="text-base">
              <strong>Container Type : </strong>
              {sample.containerType}
            </span>
            <span className="text-base">
              <strong>Sample Type : </strong>
              {sample.sampleType}
            </span>
            <span className="text-base">
              <strong>Drawn At : </strong>
              {format(new Date(sample.drawnAt), "yyyy/M/d hh:mm:ss a")}
            </span>
            <span className="text-base">
              <strong>Number Of Samples : </strong>
              {sample.numberOfSamples}
            </span>
            <span className="text-base">
              <strong>Sample Serial : </strong>
              {sample.sampleSerial}
            </span>
            <span className="text-base">
              <strong>Study Number : </strong>
              {sample.Study.studyNumber}
            </span>
            <span className="text-base">
              <strong>Patient Name : </strong>
              {sample.patient.patientName}
            </span>
            <span className="text-base">
              <strong>{sample.patient.ssn ? "SSN:" : "MRN:"}</strong>
              {sample.patient.ssn ? sample.patient.ssn : sample.patient.mrn}
            </span>
            <span className="text-base">
              <strong>Birth Date : </strong>
              {format(new Date(sample.patient.birthDate), "yyyy/M/d")}
            </span>
            <span className="text-base">
              <strong>Gender : </strong>
              {sample.patient.gender}
            </span>
            <span className="text-base">
              <strong>Sample Drawing : </strong>
              {format(
                new Date(sample.patient.sampleDrawing),
                "yyyy/M/d hh:mm:ss a"
              )}
            </span>
            {sample.isApproved && (
              <span className="text-base">
                <strong>KHCC Code : </strong>
                {sample.khccBioSampleCode}
              </span>
            )}
            {sample.isRejected && (
              <span className="text-base">
                <strong>Reject Reason : </strong>
                {sample.rejectReason}
              </span>
            )}
            {!isStorage && (
              <div className="flex gap-3 w-full">
                <Button
                  className="w-1/2"
                  variant={
                    sample.isRejected || sample.isApproved
                      ? "outlined"
                      : "contained"
                  }
                  disabled={sample.isRejected || sample.isApproved}
                  onClick={() => {
                    setApproveModalOpen(!approveModalOpen);
                  }}
                >
                  APPROVE
                </Button>
                <Button
                  className="w-1/2"
                  onClick={() => {
                    setRejectModalOpen(!rejectModalOpen);
                  }}
                  variant={
                    sample.isRejected || sample.isApproved
                      ? "outlined"
                      : "contained"
                  }
                  disabled={sample.isRejected || sample.isApproved}
                  color="error"
                >
                  REJECT
                </Button>
              </div>
            )}
            {isStorage && (
              <div className="w-full">
                <Button
                  className="w-full"
                  onClick={() => {
                    setChooseCell(!chooseCell);
                  }}
                  variant="contained"
                >
                  Add Sample to freezer
                </Button>
              </div>
            )}
          </div>
        </AccordionDetails>
      </Accordion>
      <RejectSample
        sample={sample}
        closeModel={() => {
          setRejectModalOpen(!rejectModalOpen);
        }}
        reloadData={reloadData}
        rejectModalOpen={rejectModalOpen}
      />
      <ApproveSample
        sample={sample}
        closeModel={() => {
          setApproveModalOpen(!approveModalOpen);
        }}
        reloadData={reloadData}
        rejectModalOpen={approveModalOpen}
      />
      {freezers && (
        <StoragePicker
          freezers={freezers}
          sample={sample}
          chooseCell={chooseCell}
          closeModel={() => {
            setChooseCell(!chooseCell);
          }}
          reloadData={reloadData}
        />
      )}
    </>
  );
};
