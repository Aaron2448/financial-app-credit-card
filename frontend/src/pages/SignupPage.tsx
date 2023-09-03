import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "../components/form-components/TextFieldWrapper";
import DateTimePicker from "../components/form-components/DateTimePicker";
import Checkbox from "../components/form-components/CheckboxWrapper";
import FormSubmitButton from "../components/form-components/FormSubmitButton";
import "../css/pages-css/SignupPage.css";
import { MouseEvent, useState } from "react";
import Popup from "../components/Popup";
// import { makeStyles } from "@mui/material/styles";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  phoneNumber: "",
  termsAndConditionsAndPrivacyPolicy: false,
};

const formValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email format"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Passwords must match"),

  // Regex to validate australian phone numbers obtained from https://stackoverflow.com/questions/39990179/regex-for-australian-phone-number-validation
  phoneNumber: Yup.string()
    .required("Required")
    .matches(
      /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
      "Invalid mobile number format"
    ),
  dateOfBirth: Yup.date()
    .required("Required")
    .test(
      "dateOfBirth",
      "Must be at least 18 years old to create an account",
      function (dateOfBirth) {
        const currentDate = new Date();
        currentDate.setFullYear(currentDate.getFullYear() - 18);
        return dateOfBirth <= currentDate;
      }
    ),
  termsAndConditionsAndPrivacyPolicy: Yup.boolean()
    .required("Required")
    .oneOf([true], "Please accept the terms and conditions"),
});

function SignupPage() {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const openPopup = (event: MouseEvent<HTMLAnchorElement>, title: string) => {
    event.preventDefault();
    setModalTitle(title);
    setOpen(true);
  };

  const closePopup = () => setOpen(false);

  const handleSubmit = (values: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    termsAndConditionsAndPrivacyPolicy: boolean;
  }) => {
    const userPayload = {
      userFirstname: values.firstName,
      userLastname: values.lastName,
      userDob: values.dateOfBirth,
      userMobilePhoneNo: values.phoneNumber,
      email: values.email,
      password: values.password,
      resetRecently: "no"
    };

    const CUSTOMER_REGISTRATION_API_CALL = "http://localhost:3309/api/userInfo/register";

    fetch(CUSTOMER_REGISTRATION_API_CALL, {
      method: "POST",
      headers: {
		  "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userPayload),
    })
      .then(async(data) => {
		  
		  const response = await data.text();
		  
		  if(response == "User added to database.") {
		  
		  	window.location.href = "/registerSuccess";
          
      	  } else {
				
		  	window.location.href = "/registerFailure";
				
		  }
      
      
      })
      .catch((error) => console.log(error));

    console.log("Payload: ", JSON.stringify(userPayload));
  };

  return (
    <>
      {open && <Popup open={open} onClose={closePopup} title={modalTitle} />}
      <p className="login-p">
        Already have an account? <a href="/login">Log in</a> now
      </p>
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
                    <h2 className="form-h">Create an account</h2>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="firstName" label="First name" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="lastName" label="Last name" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="email" label="Email" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      label="Password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="confirmPassword"
                      label="Confirm password"
                      type="password"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateTimePicker name="dateOfBirth" label="Date of birth" />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField name="phoneNumber" label="Phone number" />
                  </Grid>
                  <Grid item xs={12}>
                    <Checkbox
                      name="termsAndConditionsAndPrivacyPolicy"
                      label={
                        <p className="terms-and-conditions-p">
                          I have read and agree to the{" "}
                          <a
                            onClick={(event) =>
                              openPopup(event, "Terms and Conditions")
                            }
                          >
                            terms and conditions
                          </a>{" "}
                          and{" "}
                          <a
                            onClick={(event) =>
                              openPopup(event, "Privacy Policy")
                            }
                          >
                            privacy policy
                          </a>
                        </p>
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormSubmitButton>Create account</FormSubmitButton>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default SignupPage;

