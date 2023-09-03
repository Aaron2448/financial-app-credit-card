import Button from "../Button";
import { useFormikContext } from "formik";

interface Props {
  children: string;
  width?: string;
}

function FormSubmitButton({ children, width = "100%" }: Props) {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  return (
    <Button style={{ width: width }} onClick={() => handleSubmit()}>
      {children}
    </Button>
  );
}

export default FormSubmitButton;
