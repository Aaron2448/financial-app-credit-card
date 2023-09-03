import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "../components/form-components/TextFieldWrapper";
import FormSubmitButton from "../components/form-components/FormSubmitButton";
import axios from "axios"

function ResetPasswordPage() {
  
  const API_url = "http://localhost:3309/api/userInfo/forgotPassword"
  const initialFormState = {
    email: "",
  };
  

  const formValidationSchema = Yup.object().shape({
   
    email: Yup.string().required("Required").email("Invalid email format")

  });

  const handleSubmit = (values: {
    email: string;
  }) => {
    
    const supportPayload = {   
      email: values.email,
    };
    console.log(supportPayload)
    axios.post(API_url, supportPayload)
      .then(response => {
        if(response.status === 200){
          console.log("Reset successful!")
        }
        
      })
      .catch(error => {
        console.log("An error has occurred.")
      })
      
      window.location.href = '/resetSuccess';
  };

  return (
    <div className="support-div">
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="sm" className="form-container">
            <Formik
              initialValues={{ ...initialFormState }}
              validationSchema={formValidationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <h2 className="form-h">Reset Password</h2>
                  </Grid>
                
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" type="email" />
                  </Grid>
                
                  

                  <Grid item xs={12}>
                    <FormSubmitButton>Reset</FormSubmitButton>
                  </Grid>
                </Grid>

            
              </Form>
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export default ResetPasswordPage;

