import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AddSamplesForm } from "Components/Patient/AddSamplesForm";
import { MainLayout } from "UI/MainLayout";
import { ScrollableContainer } from "UI/ScrollableContainer";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSamples } from "services/nursing";
import { SHOW_TOAST_MESSAGE } from "utils/constant";
import { getStudyId } from "utils/getStudyId";
import { sampleSchema } from "validation-schema/sampleSchema";

export const AddSamples = () => {
  const dispatch = useDispatch();
  const { patientId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formsData, setFormsData] = useState<Array<any>>([
    {
      containerType: "",
      drawnAt: "",
      numberOfSamples: "",
      sampleSerial: "",
      sampleType: "",
      storageType: "",
    },
  ]);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(sampleSchema),
    defaultValues: {
      samples: [...formsData],
    },
  });

  const handleAddForm = () => {
    const newFormData = {
      containerType: "",
      drawnAt: "",
      numberOfSamples: "",
      sampleSerial: "",
      sampleType: "",
      storageType: "",
    };
    setFormsData([...formsData, newFormData]);
    const currentDefaultValues = getValues();
    const currentSamples = currentDefaultValues.samples as
      | {
          sampleType: string;
          containerType: string;
          numberOfSamples: string;
          drawnAt: string;
          sampleSerial: string;
          storageType: string;
        }[]
      | undefined;
    setValue("samples", [...(currentSamples || []), newFormData]);
  };

  const onSubmit = async (data: any) => {
    let patientIdUser = patientId?.replace(/^:(.*)$/, "$1")!;
    const studyId = getStudyId()._id;
    try {
      setIsSubmitting(true);
      const res = (await addSamples(studyId, patientIdUser, data.samples)) as {
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
      setFormsData([
        {
          containerType: "",
          drawnAt: "",
          numberOfSamples: "",
          sampleSerial: "",
          sampleType: "",
          storageType: "",
        },
      ]);
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

  const handleDeleteForm = (index: number) => {
    const updatedFormsData = formsData.filter((_, i) => i !== index);
    setFormsData(updatedFormsData);
    const currentDefaultValues = getValues();
    const updatedFormsDefault = currentDefaultValues.samples?.filter(
      (_, i) => i !== index
    );
    setValue("samples", updatedFormsDefault);
  };

  return (
    <MainLayout>
      <div className="w-full h-full flex flex-col gap-3">
        <span className="text-2xl font-bold">Add Samples</span>
        <ScrollableContainer>
          {formsData.map((_, index: number) => {
            return (
              <AddSamplesForm
                key={index}
                control={control}
                errors={errors}
                index={index}
                onClick={handleAddForm}
                remove={handleDeleteForm}
                formLength={formsData.length}
              />
            );
          })}
        </ScrollableContainer>

        <Button
          size="large"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          <div className="flex gap-2 items-center">
            <span>Add Samples</span>
            {isSubmitting && (
              <CircularProgress className="!w-[1rem] !h-[1rem]" />
            )}
          </div>
        </Button>
      </div>
    </MainLayout>
  );
};
