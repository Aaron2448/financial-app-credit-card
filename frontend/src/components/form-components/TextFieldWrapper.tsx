import TextField from "@mui/material/TextField";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  type?: string;
}

function TextFieldWrapper({ name, label, type = "text" }: Props) {
  const [field, metadata] = useField(name);

  const textFieldConfig = {
    ...field,
    name: name,
    label: label,
    type: type,
    fullWidth: true,
    variant: "outlined",
    size: "small",
    error: false,
    helperText: "",
  };

  if (metadata && metadata.touched && metadata.error) {
    textFieldConfig.error = true;
    textFieldConfig.helperText = metadata.error;
  }

  return <TextField {...textFieldConfig} />;
}

export default TextFieldWrapper;
