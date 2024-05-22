import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addFreezer } from "services/superAdmin";
import { SHOW_TOAST_MESSAGE } from "utils/constant";
import { freezerSchema } from "validation-schema/freezerSchema";

export const AddFreezerForm = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const onSubmit = async (data: {
    freezerName: string;
    freezerModel: string;
    freezerLocation: string;
    freezerType: string;
    NumberOfShelves: number;
    BoxesPerShelf: number;
  }) => {
    const {
      freezerName,
      freezerModel,
      freezerLocation,
      freezerType,
      NumberOfShelves,
      BoxesPerShelf,
    } = data;
    try {
      const res = (await addFreezer(
        freezerName,
        freezerModel,
        freezerLocation,
        freezerType,
        NumberOfShelves,
        BoxesPerShelf
      )) as { message: string };
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message: res.message,
          isOpen: true,
          severity: "success",
        },
      });
      reset();
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

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(freezerSchema),
    defaultValues: {
      freezerName: "",
      freezerModel: "",
      freezerLocation: "",
      freezerType: "",
      NumberOfShelves: undefined,
      BoxesPerShelf: undefined,
    },
    mode: "onChange",
  });
  return (
    <>
      <ScrollableContainer>
        <form className="flex flex-col gap-5 pt-3 px-3">
          <Controller
            name="freezerName"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerName && true}
                {...field}
                autoFocus
                label="Freezer Name"
                className="input"
                helperText={errors.freezerName && errors.freezerName.message}
              />
            )}
          />
          <Controller
            name="freezerModel"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerModel && true}
                {...field}
                label="Freezer Model"
                className="input"
                helperText={errors.freezerModel && errors.freezerModel.message}
              />
            )}
          />
          <Controller
            name="freezerLocation"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerLocation && true}
                {...field}
                label="Freezer Location"
                className="input"
                helperText={
                  errors.freezerLocation && errors.freezerLocation.message
                }
              />
            )}
          />
          <Controller
            name="freezerType"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.freezerType && true}
                {...field}
                label="Freezer Type"
                className="input"
                helperText={errors.freezerType && errors.freezerType.message}
              />
            )}
          />

          <Controller
            name="NumberOfShelves"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                min={0}
                value={undefined}
                onChange={(e) => {
                  onChange(parseInt(e.target.value));
                }}
                type="number"
                className=" outline-none text-base ring-1 ring-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:ring-2 block w-full py-[15.5px] px-[14px]"
                placeholder="Number of Shelves"
              />
            )}
          />
          <Controller
            name="BoxesPerShelf"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                min={0}
                value={undefined}
                onChange={(e) => {
                  onChange(parseInt(e.target.value));
                }}
                type="number"
                className=" outline-none text-base ring-1 ring-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:ring-2 block w-full py-[15.5px] px-[14px]"
                placeholder="Boxes per Shelf"
              />
            )}
          />
        </form>
      </ScrollableContainer>
      <Button
        className=""
        variant="contained"
        size="large"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isSubmitting}
      >
        <div className="flex gap-2 items-center">
          <span>Add Freezer</span>
          {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
        </div>
      </Button>
    </>
  );
};
