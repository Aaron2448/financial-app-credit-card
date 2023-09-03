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
import { useState } from "react";

function SupportPageCustomerNotLoggedInView() {
  const API_url = "http://localhost:3309/api/support/submitTicket"
  const initialFormState = {
    name: "",
    email: "",
    description: "",
  };
  const navigate = useNavigate();

  const formValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().required("Required").email("Invalid email format"),
    description: Yup.string().required("Required"),
  });

  const handleSubmit = (values: {
    name: string;
    email: string;
    description: string;
  }) => {
    const supportPayload = {
      name: values.name,
      email: values.email,
      description: values.description,
    };
    // API call insert below
    console.log(supportPayload)
    axios.post(API_url, supportPayload)
      .then(response => {
        if(response.status === 200){
          console.log("Support Ticket successfully submitted!")
          const estimatedResponseTimeDays = response.data;
          navigate("/supportTicketNotLoggedInSuccess", {state: {days: estimatedResponseTimeDays}}); 
        }
      })
      .catch(error => {
        navigate("/supportTicketNotLoggedInFailure"); 
        console.log("An error has occurred and your support ticket has not been submitted")
      })
  };

  return (
    <div className="support-div">
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
                  <Grid item xs={12}>
                    <TextField name="name" label="Name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" type="email" />
                  </Grid>
                  <Grid item xs={12} className="description-grid">
                    <TextField
                      name="description"
                      label="Description"
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
export default SupportPageCustomerNotLoggedInView;
