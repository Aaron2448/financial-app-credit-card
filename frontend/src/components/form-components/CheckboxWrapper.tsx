import { ReactNode } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useField, useFormikContext } from "formik";

interface Props {
  name: string;
  label: ReactNode;
}

function CheckboxWrapper({ name, label }: Props) {
  const { setFieldValue } = useFormikContext();
  const [field, metadata] = useField(name);

  const handleChange = (event: any) => {
    const { checked } = event.target;
    setFieldValue(name, checked);
  };

  const checkboxConfig = {
    ...field,
    onChange: handleChange,
  };

  const formControlConfig = {
    error: false,
    helperText: "",
  };

  if (metadata && metadata.touched && metadata.error) {
    formControlConfig.error = true;
    formControlConfig.helperText = metadata.error;
  }

  return (
    <FormControl {...formControlConfig}>
      <FormLabel component="legend">{formControlConfig.helperText}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...checkboxConfig} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
}

export default CheckboxWrapper;
