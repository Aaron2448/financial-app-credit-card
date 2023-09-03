import { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
}

function DateTimePicker({ name, label }: Props) {
  const [field, metadata] = useField(name);

  const dateTimePickerConfig = {
    ...field,
    label: label,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    size: "small",
    error: false,
    helperText: "",
  };

  if (metadata && metadata.touched && metadata.error) {
    dateTimePickerConfig.error = true;
    dateTimePickerConfig.helperText = metadata.error;
  }

  return <TextField {...dateTimePickerConfig} />;
}

export default DateTimePicker;
