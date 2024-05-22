import { iSampleToExport } from "types/sample";
import { Button, CircularProgress } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}
const ExportSamplesHandler = ({
  samplesToExport,
  isLoading,
  clear,
}: {
  samplesToExport: iSampleToExport[];
  clear: () => void;
  isLoading: boolean;
}) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const headers = [
      "Sample Serial",
      "KHCC Bio Sample Code",
      "Storage Type",
      "Container Type",
      "Sample Type",
      "Patient Gender",
      "Patient Birth Date",
    ];

    const data = samplesToExport.map((sample) => [
      sample.sampleSerial,
      sample.khccBioSampleCode,
      sample.storageType,
      sample.containerType,
      sample.sampleType,
      sample.patientGender,
      sample.patientBirthDate,
    ]);
    doc.autoTable({ head: [headers], body: data });
    doc.save("exported_samples.pdf");
    clear();
  };

  return (
    <Button onClick={handleExportPDF} variant="contained" className="w-full">
      <span className="pe-2"> Export to PDF </span>
      {isLoading && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
    </Button>
  );
};

export default ExportSamplesHandler;
