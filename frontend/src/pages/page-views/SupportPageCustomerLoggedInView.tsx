import SideNavBar from "../../components/SideNavBar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "../../components/form-components/TextFieldWrapper";
import FormSubmitButton from "../../components/form-components/FormSubmitButton";
import ContactUs from "./ContactUs";
import axios from "axios"
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function SupportPageCustomerLoggedInView() {
  const API_url = "http://localhost:3309/api/support/submitTicket"
  const navigate = useNavigate();
  
  const initialFormState = {
    description: "",
  };

  const formValidationSchema = Yup.object().shape({
    description: Yup.string().required("Required"),
  });

  const handleSubmit = (values: {
    description: string;
  }) => {

    
    const supportPayload = {
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      description: values.description,
      user_id : localStorage.getItem("id")
    };
    // API call insert below
    axios.post(API_url, supportPayload)
      .then(response => {
        if(response.status === 200){
          console.log("Support Ticket successfully submitted!")
          const estimatedResponseTimeDays = response.data;
  
          //passing in estimatedResponseTimeDays variable as a state to supportTicketLoggedInSuccess page
          navigate("/supportTicketLoggedInSuccess", {state: {days: estimatedResponseTimeDays}}); 
        }
      })
      .catch(error => {
        navigate("/supportTicketLoggedInFailure")
        console.log("An error has occurred and your support ticket has not been submitted")
      })
  };

  return (
    <div className="support-div">
      <SideNavBar />
      <div className="button-group">
        <Button onClick={() => navigate("/faq")}>
          FAQ
        </Button>
      </div>
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
                    <h2 className="form-h">Get in touch!</h2>
                  </Grid>

                  <Grid item xs={12} className="description-grid">
                    <TextField
                      name="description"
                      label="Please state your issue here"
                      type="text"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormSubmitButton>Submit</FormSubmitButton>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <div className="contact-div-element">
                    <ContactUs />
                  </div>
                </Grid>
              </Form>
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export default SupportPageCustomerLoggedInView;
