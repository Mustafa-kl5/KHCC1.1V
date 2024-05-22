import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { givePermission } from "services/superAdmin";
import { iUser } from "types/user";
import { Permissions, SHOW_TOAST_MESSAGE } from "utils/constant";

import { format } from "date-fns";
import { useDispatch } from "react-redux";
export const PermissionCard = ({
  user,
  reloadData,
}: {
  user: iUser;
  reloadData: () => void;
}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    defaultValues: {
      value: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: any, userId: string) => {
    try {
      setIsSubmitting(true);
      const res = (await givePermission(userId, data.value)) as {
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
    <Accordion className="border border-solid border-slate-400">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <span className="text-lg">{`${user.firstName} ${user.lastName}`}</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-2">
          <span className="text-base">
            <strong>Role:</strong> {user.role}
          </span>
          <span className="text-base">
            <strong>Position:</strong> {user.position}
          </span>
          <span className="text-base">
            <strong>Employee ID:</strong> {user.employeeId}
          </span>
          <span className="text-base">
            <strong>Department:</strong> {user.department}
          </span>
          <span className="text-base">
            <strong>Register At:</strong>{" "}
            {format(new Date(user.createdAt), "yyyy/M/d hh:mm:ss a")}
          </span>
          <span className="text-base">
            <strong>Chose Permission:</strong>
          </span>
          <div className="flex justify-end gap-2">
            <div className="w-2/3">
              <Controller
                name="value"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pick</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      label="value"
                      value={value}
                      onChange={onChange}
                    >
                      {Permissions.map((Permission) => (
                        <MenuItem key={Permission.id} value={Permission.value}>
                          {Permission.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </div>

            <Button
              size="large"
              variant="contained"
              onClick={handleSubmit((data) => onSubmit(data, user._id))}
              disabled={!isValid || isSubmitting}
              className="w-1/3"
            >
              <div className="flex gap-2 items-center">
                <span>Submit</span>
                {isSubmitting && (
                  <CircularProgress className="!w-[1rem] !h-[1rem]" />
                )}
              </div>
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
