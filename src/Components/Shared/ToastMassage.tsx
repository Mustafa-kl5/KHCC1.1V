import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { SHOW_TOAST_MESSAGE } from "utils/constant";

const ToastMassage = () => {
  const { message } = useSelector((state: RootState) => state.toastMessage);
  const dispatch = useDispatch();

  return (
    <Snackbar
      open={message.isOpen}
      autoHideDuration={3000}
      onClose={() => {
        dispatch({
          type: SHOW_TOAST_MESSAGE,
          message: {
            message: "",
            isOpen: false,
            severity: message.severity,
          },
        });
      }}
      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
    >
      <Alert
        severity={message.severity as "error" | "success"}
        onClose={() => {
          dispatch({
            type: SHOW_TOAST_MESSAGE,
            message: {
              message: "",
              isOpen: false,
              severity: message.severity,
            },
          });
        }}
      >
        {message.message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMassage;
