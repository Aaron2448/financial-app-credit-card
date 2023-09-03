import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useField, useFormikContext } from "formik";

interface Props {
  name: string;
  label: string;
  options: any;
}

function SelectWrapper({ name, label, options }: Props) {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const { value } = event.target;
    setFieldValue(name, value);
  };

  const selectConfig = {
    ...field,
    name: name,
    label: label,
    select: true,
    variant: "outlined",
    fullWidth: true,
    size: "small",
    onChange: handleChange,
    error: false,
    helperText: "",
  };

  if (meta && meta.touched && meta.error) {
    selectConfig.error = true;
    selectConfig.helperText = meta.error;
  }

  return (
    <TextField {...selectConfig}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
}

export default SelectWrapper;
