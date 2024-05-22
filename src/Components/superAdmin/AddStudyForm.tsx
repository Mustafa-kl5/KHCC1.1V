import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { CloudUpload, DeleteForever } from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addStudy } from "services/superAdmin";
import { iFile } from "types/file";
import { SHOW_TOAST_MESSAGE, allowedTypes } from "utils/constant";
import { studySchema } from "validation-schema/studySchema";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const AddStudyForm = () => {
  const dispatch = useDispatch();
  const [filesBase64, setFilesBase64] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [file, setFile] = useState<iFile>();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(studySchema),
    defaultValues: {
      piName: "",
      studyInitDate: "",
      studyKeywords: "",
      studyName: "",
      studyNumber: "",
    },
    mode: "onChange",
  });
  const onSubmit = async (data: {
    piName: string;
    studyInitDate: string;
    studyKeywords: string;
    studyName: string;
    studyNumber: string;
  }) => {
    try {
      setIsSubmitting(true);
      const res = (await addStudy(
        data.studyName,
        data.piName,
        data.studyNumber,
        data.studyKeywords,
        data.studyInitDate,
        filesBase64
      )) as {
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
      reset();
      setFile(undefined);
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

  useEffect(() => {
    if (file) {
      const arrayFile = Object.values(file)
        .flat()
        .filter((item) => item !== undefined);
      const promises = arrayFile.map(
        (item) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              if (event.target instanceof FileReader) {
                const base64Data = event.target.result as string;
                resolve(base64Data);
              }
            };
            reader.readAsDataURL(item.filePath);
          })
      );
      Promise.all(promises)
        .then((base64Array) => setFilesBase64(base64Array))
        .catch((error) => console.error("Error reading files:", error));
    }
  }, [file]);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        dispatch({
          type: SHOW_TOAST_MESSAGE,
          message: {
            message: `Error : Only .docx, .xlsx, .jpg, .png and .gif files are allowed.`,
            isOpen: true,
            severity: "error",
          },
        });
        event.target.value = null;
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div className="w-full h-[calc(100%-2rem)] flex flex-col justify-between ">
      <div className="flex gap-2 h-full flex-col py-4 overflow-y-auto pe-3">
        <div className="w-full flex flex-col gap-3 h-full">
          <Controller
            name="studyName"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.studyName && true}
                {...field}
                label="Study Name"
                className="input"
                helperText={errors.studyName && errors.studyName.message}
              />
            )}
          />
          <Controller
            name="piName"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.piName && true}
                {...field}
                label="Pi Name"
                className="input"
                helperText={errors.piName && errors.piName.message}
              />
            )}
          />
          <Controller
            name="studyNumber"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.studyNumber && true}
                {...field}
                label="Study Number"
                className="input"
                helperText={errors.studyNumber && errors.studyNumber.message}
              />
            )}
          />
          <Controller
            name="studyKeywords"
            control={control}
            render={({ field }) => (
              <TextField
                error={errors.studyKeywords && true}
                {...field}
                label="Study Keywords"
                className="input"
                helperText={
                  errors.studyKeywords && errors.studyKeywords.message
                }
              />
            )}
          />
          <Controller
            name="studyInitDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Initiate study date"
                value={field.value || null}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="w-full flex flex-col gap-3 h-full">
          <div className="flex flex-col gap-2">
            <span className=" font-bold">Study summary:</span>
            <Button
              component="label"
              variant={file?.summary ? "contained" : "outlined"}
              startIcon={<CloudUpload />}
              disabled={file?.summary && true}
              onChange={(e: any) => {
                if (!handleFileChange(e)) {
                  return;
                }
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile({
                    ...file,
                    summary: {
                      fileName: selectedFile.name,
                      filePath: selectedFile,
                    },
                  });
                }
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <span className="text-gray-400 text-xs">
              Only .docx, .xlsx, .jpg, .png and .gif files are allowed.
            </span>
            {file?.summary && (
              <div className="flex gap-3 bg-slate-300 py-1 px-2 rounded-lg w-fit">
                <span>{file.summary.fileName}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setFile({
                      ...file,
                      summary: undefined,
                    });
                  }}
                >
                  <DeleteForever />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className=" font-bold">Study protocol:</span>
            <Button
              component="label"
              variant={file?.protocol ? "contained" : "outlined"}
              startIcon={<CloudUpload />}
              disabled={file?.protocol && true}
              onChange={(e: any) => {
                if (!handleFileChange(e)) {
                  return;
                }
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile({
                    ...file,
                    protocol: {
                      fileName: selectedFile.name,
                      filePath: selectedFile,
                    },
                  });
                }
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <span className="text-gray-400 text-xs">
              Only .docx, .xlsx, .jpg, .png and .gif files are allowed.
            </span>
            {file?.protocol && (
              <div className="flex gap-3 bg-slate-300 py-1 px-2 rounded-lg w-fit">
                <span>{file.protocol.fileName}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setFile({
                      ...file,
                      protocol: undefined,
                    });
                  }}
                >
                  <DeleteForever />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className=" font-bold">Study IRB:</span>
            <Button
              component="label"
              variant={file?.IRB ? "contained" : "outlined"}
              startIcon={<CloudUpload />}
              disabled={file?.IRB && true}
              onChange={(e: any) => {
                if (!handleFileChange(e)) {
                  return;
                }
                const selectedFile = e.target.files?.[0];
                if (selectedFile) {
                  setFile({
                    ...file,
                    IRB: {
                      fileName: selectedFile.name,
                      filePath: selectedFile,
                    },
                  });
                }
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <span className="text-gray-400 text-xs">
              Only .docx, .xlsx, .jpg, .png and .gif files are allowed.
            </span>
            {file?.IRB && (
              <div className="flex gap-3 bg-slate-300 py-1 px-2 rounded-lg w-fit">
                <span>{file.IRB.fileName}</span>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setFile({
                      ...file,
                      IRB: undefined,
                    });
                  }}
                >
                  <DeleteForever />
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className=" font-bold">Optional Files:</span>
            <Button
              component="label"
              variant={file?.optional ? "contained" : "outlined"}
              startIcon={<CloudUpload />}
              onChange={(e: any) => {
                const selectedFiles = e.target.files;
                const filesArray = Array.from(selectedFiles);
                const acceptFiles = filesArray.filter((item: any) => {
                  if (!allowedTypes.includes(item.type)) {
                    dispatch({
                      type: SHOW_TOAST_MESSAGE,
                      message: {
                        message: `Error : Only .docx, .xlsx, .jpg, .png and .gif files are allowed.`,
                        isOpen: true,
                        severity: "error",
                      },
                    });
                  }
                  return allowedTypes.includes(item.type);
                });
                if (acceptFiles && acceptFiles.length > 0) {
                  setFile({
                    ...file,
                    optional: acceptFiles.map((item: any) => {
                      return {
                        fileName: item.name,
                        filePath: item,
                      };
                    }),
                  });
                }
              }}
            >
              Upload file
              <VisuallyHiddenInput type="file" multiple />
            </Button>
            <span className="text-gray-400 text-xs">
              Only .docx, .xlsx, .jpg, .png and .gif files are allowed.
            </span>
            <div className="flex flex-wrap gap-2 overflow-y-scroll h-24">
              {file?.optional &&
                file?.optional.map((item, index) => {
                  return (
                    <div
                      className="flex gap-3 bg-slate-300 py-1 px-2 rounded-lg w-fit h-fit"
                      key={index}
                    >
                      <span>{item.fileName}</span>
                      <span
                        className="cursor-pointer "
                        onClick={() => {
                          if (file.optional?.length === 1) {
                            setFile({
                              ...file,
                              optional: undefined,
                            });
                            return;
                          }
                          setFile({
                            ...file,
                            optional: file.optional?.filter((deletedItem) => {
                              return item.fileName !== deletedItem.fileName;
                            }),
                          });
                        }}
                      >
                        <DeleteForever />
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Button
        size="large"
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        disabled={
          !isValid ||
          file?.IRB === undefined ||
          file.protocol === undefined ||
          file.summary === undefined
        }
      >
        <div className="flex gap-2 items-center">
          <span>Add Study</span>
          {isSubmitting && <CircularProgress className="!w-[1rem] !h-[1rem]" />}
        </div>
      </Button>
    </div>
  );
};
