import { NoPermission } from "pages/NoPermission";
import { Login } from "pages/auth/Login";
import { SignUp } from "pages/auth/SignUp";
import { AddPatient } from "pages/nursing/AddPatient";
import { AddSamples } from "pages/nursing/AddSamples";
import { PatientList } from "pages/nursing/PatientList";
import { iRoute } from "types/route";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BorderColorIcon from "@mui/icons-material/BorderColor";

import { Permission } from "pages/superAdmin/Permission";
import { AddStudy } from "pages/superAdmin/AddStudy";
import { Studies } from "pages/superAdmin/Studies";
import { AddFreezer } from "pages/superAdmin/AddFreezer";
import { Freezers } from "pages/superAdmin/Freezers";
import { Patients } from "pages/technician/Patients";
import { Logs } from "pages/superAdmin/Logs";
import { SamplesList } from "pages/technician/SamplesList";
import { Storage } from "pages/technician/Storage";
import ExportSamples from "pages/technician/ExportSamples";
import { ApproveStudies } from "pages/superAdmin/ApproveStudies";
import { Dashboard } from "pages/superAdmin/Dashboard";
import { DashboardCustomize } from "@mui/icons-material";
import ExportedSampleBackUp from "pages/technician/ExportedSampleBackUp";
export const publicRoutes: iRoute[] = [
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
];
export const nursingRoutes: iRoute[] = [
  {
    path: "/",
    element: <AddPatient />,
    pageName: "Add Patient",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/patient-list",
    element: <PatientList />,
    pageName: "Patient List",
    icon: <ListAltIcon />,
  },
  {
    path: "/add-samples/:patientId",
    element: <AddSamples />,
    pageName: "Add Samples",
    icon: <BorderColorIcon />,
    notShown: true,
  },
  {
    path: "/add-study",
    element: <AddStudy />,
    pageName: "Add Study",
    icon: <PersonAddAltIcon />,
  },
];
export const superAdminRoutes: iRoute[] = [
  {
    path: "/",
    element: <Permission />,
    pageName: "Permission",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/add-study",
    element: <AddStudy />,
    pageName: "Add Study",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/studies-list",
    element: <Studies />,
    pageName: "Studies",
    icon: <ListAltIcon />,
  },
  {
    path: "/add-freezer",
    element: <AddFreezer />,
    pageName: "Add Freezer",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/freezers-list",
    element: <Freezers />,
    pageName: "Freezers",
    icon: <ListAltIcon />,
  },
  {
    path: "/users-logs",
    element: <Logs />,
    pageName: "Users Logs",
    icon: <ListAltIcon />,
  },
  {
    path: "/approve-studies",
    element: <ApproveStudies />,
    pageName: "Approve Studies",
    icon: <ListAltIcon />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    pageName: "Dashboard",
    icon: <DashboardCustomize />,
  },
  {
    path: "/ExportedSampleBackUp",
    element: <ExportedSampleBackUp />,
    pageName: "Stored Samples Backup",
    icon: <PersonAddAltIcon />,
  },
];
export const technicianRoutes: iRoute[] = [
  {
    path: "/",
    element: <Patients />,
    pageName: "Patient List",
    icon: <ListAltIcon />,
  },
  {
    path: "/samples",
    element: <SamplesList />,
    pageName: "Samples",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/storage",
    element: <Storage />,
    pageName: "Storage",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/exportSamples",
    element: <ExportSamples />,
    pageName: "Export Samples",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/add-study",
    element: <AddStudy />,
    pageName: "Add Study",
    icon: <PersonAddAltIcon />,
  },
  {
    path: "/ExportedSampleBackUp",
    element: <ExportedSampleBackUp />,
    pageName: "Stored Samples Backup",
    icon: <PersonAddAltIcon />,
  },
];
export const pending: iRoute[] = [
  {
    path: "/",
    element: <NoPermission />,
    pageName: "No permission",
    icon: <PersonAddAltIcon />,
  },
];
export const getRoutes = (role: string) => {
  switch (role) {
    case "nursing":
      return nursingRoutes;
    case "superAdmin":
      return superAdminRoutes;
    case "technician":
      return technicianRoutes;
    case "pending":
      return pending;
    default:
      return [];
  }
};
