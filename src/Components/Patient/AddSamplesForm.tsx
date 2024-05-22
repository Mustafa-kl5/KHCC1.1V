import { Add } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { containerTypes, sampleTypes, storageTypes } from "utils/constant";
import { getStudyId } from "utils/getStudyId";

export const AddSamplesForm = ({
  control,
  errors,
  index,
  onClick,
  remove,
  formLength,
}: {
  index: number;
  control: Control;
  errors: FieldErrors<{
    samples?:
      | {
          containerType: string;
          numberOfSamples: string;
          sampleSerial: string;
          sampleType: string;
          storageType: string;
          drawnAt: string;
        }[]
      | undefined;
  }>;
  onClick: () => void;
  remove: (index: number) => void;
  formLength: number;
}) => {
  return (
    <div className=" flex flex-col gap-2 p-3 rounded-lg even:bg-slate-100">
      <span className="text-base">
        <strong># Sample {index + 1}</strong>
      </span>
      <div className=" flex flex-col gap-3">
        <Controller
          name={`samples[${index}].containerType`}
          control={control}
          render={({ field }) => (
            <FormControl
              error={errors.samples?.[index]?.containerType !== undefined}
            >
              <InputLabel id="Container-Type">Container Type</InputLabel>
              <Select
                labelId="Container-Type"
                onChange={field.onChange}
                value={field.value}
                label="Container Type"
              >
                {containerTypes.map((item) => {
                  return (
                    <MenuItem
                      value={item.containerType}
                      key={item.containerType}
                    >
                      {item.containerType}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errors.samples?.[index]?.containerType !== undefined &&
                  errors.samples?.[index]?.containerType?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name={`samples[${index}].sampleType`}
          control={control}
          render={({ field }) => (
            <FormControl
              error={errors.samples?.[index]?.sampleType !== undefined}
              fullWidth
            >
              <InputLabel id="sampleType">Sample Type</InputLabel>
              <Select
                labelId="sampleType"
                onChange={field.onChange}
                label="Sample Type"
                value={field.value}
              >
                {sampleTypes.map((item) => {
                  return (
                    <MenuItem value={item.sampleType} key={item.id}>
                      {item.sampleType}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errors.samples?.[index]?.sampleType !== undefined &&
                  errors.samples?.[index]?.sampleType?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name={`samples[${index}].storageType`}
          control={control}
          render={({ field }) => (
            <FormControl
              error={errors.samples?.[index]?.storageType !== undefined}
              fullWidth
            >
              <InputLabel id="storageType">Storage Type</InputLabel>
              <Select
                labelId="sampleType"
                onChange={field.onChange}
                label="Storage Type"
                value={field.value}
              >
                {storageTypes.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.storageType}>
                      {item.storageType}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>
                {errors.samples?.[index]?.storageType !== undefined &&
                  errors.samples?.[index]?.storageType?.message}
              </FormHelperText>
            </FormControl>
          )}
        />
        <Controller
          name={`samples[${index}].drawnAt`}
          control={control}
          render={({ field }) => (
            <FormControl error={errors.samples?.[index]?.drawnAt !== undefined}>
              <DateTimePicker
                label="Drawn At"
                value={field.value || null}
                onChange={field.onChange}
              />
              <FormHelperText>
                {errors.samples?.[index]?.drawnAt !== undefined &&
                  errors.samples?.[index]?.drawnAt?.message}
              </FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name={`samples[${index}].numberOfSamples`}
          control={control}
          render={({ field }) => (
            <TextField
              type="number"
              error={errors.samples?.[index]?.numberOfSamples !== undefined}
              label="Number Of Samples"
              className="input"
              value={field.value}
              onChange={field.onChange}
              helperText={
                errors.samples?.[index]?.numberOfSamples !== undefined &&
                errors.samples?.[index]?.numberOfSamples?.message
              }
            />
          )}
        />
        <TextField
          label="Study Number"
          value={getStudyId().studyNumber}
          disabled={true}
        />
        <Controller
          name={`samples[${index}].sampleSerial`}
          control={control}
          render={({ field }) => (
            <TextField
              error={errors.samples?.[index]?.sampleSerial !== undefined}
              {...field}
              label="Sample Serial"
              className="input"
              helperText={
                errors.samples?.[index]?.sampleSerial !== undefined &&
                errors.samples?.[index]?.sampleSerial?.message
              }
            />
          )}
        />
      </div>
      <div className="w-full flex justify-end gap-2">
        {formLength === index + 1 && (
          <Button
            size="large"
            variant="contained"
            onClick={onClick}
            startIcon={<Add />}
          >
            add
          </Button>
        )}
        {index + 1 === formLength && (
          <Button
            size="large"
            variant="contained"
            onClick={() => remove(index)}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
