import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { approveSample } from "services/technician";
import { iSample } from "types/sample";
import { SHOW_TOAST_MESSAGE } from "utils/constant";
import { approveSampleSchema } from "validation-schema/approveSample";
export const ApproveSample = ({
  sample,
  reloadData,
  rejectModalOpen,
  closeModel,
}: {
  sample: iSample;
  reloadData: () => void;
  rejectModalOpen: boolean;
  closeModel: () => void;
}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(approveSampleSchema),
    defaultValues: {
      khccBioSampleCode: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data: { khccBioSampleCode: string }) => {
    try {
      setIsSubmitting(true);
      const res = (await approveSample(sample._id, data.khccBioSampleCode)) as {
        message: string;
      };
      reset();
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
    <Modal
      open={rejectModalOpen}
      onClose={closeModel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="w-full h-full flex justify-center items-center">
        <div className="p-4 bg-white rounded-lg w-1/3 h-1/2">
          <div className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-lg">Please indicate KHCC :</span>
              <Controller
                name="khccBioSampleCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    error={errors.khccBioSampleCode && true}
                    {...field}
                    label={"KHCC Code"}
                    className="w-full"
                    variant="standard"
                    helperText={
                      errors.khccBioSampleCode &&
                      errors.khccBioSampleCode.message
                    }
                  />
                )}
              />
            </div>
            <div className="w-full flex gap-3">
              <Button
                className="w-1/2"
                onClick={closeModel}
                variant="outlined"
                size="medium"
              >
                Cancel
              </Button>
              <Button
                disabled={!isValid}
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                size="medium"
                className="w-1/2"
              >
                <span className="pe-2">Approve </span>
                {isSubmitting && (
                  <CircularProgress className="!w-[1rem] !h-[1rem]" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
