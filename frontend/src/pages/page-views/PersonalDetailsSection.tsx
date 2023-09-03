import "../../css/pages-css/page-views-css/PersonalDetailsSection.css";
import { Alert, Container, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import FormSubmitButton from "../../components/form-components/FormSubmitButton";
import * as Yup from "yup";
import { useEffect, useState} from "react";

export const PersonalDetailsSection = () => {
    const [customerDetails, setCustomerDetails] = useState<{[key: string]: any}>({});
    const CUSTOMER_INFO_API_CALL = 'http://localhost:3309/api/userInfo/getProfile'
    const UPDATE_DETAILS_API_CALL = "http://localhost:3309/api/userInfo/update";

    const getCustomerDetails = () => {
        fetch(CUSTOMER_INFO_API_CALL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(async(response) => {
            const data = await response.json();
            setCustomerDetails(data);
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "/login";
        })
    };

    useEffect(() => {
        console.log("useEffect");
        getCustomerDetails();
    }, []);

    const formValidationSchema = Yup.object().shape({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        email: Yup.string().required("Required").email("Invalid email format"),
      
        // Regex to validate australian phone numbers obtained from https://stackoverflow.com/questions/39990179/regex-for-australian-phone-number-validation
        phoneNumber: Yup.string()
          .required("Required")
          .matches(
            /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/,
            "Invalid mobile number format"
          ),
    });

    const initialFormValues = {
        firstName: customerDetails.userFirstname,
        lastName: customerDetails.userLastname,
        email: customerDetails.email,
        phoneNumber: customerDetails.userMobilePhoneNo,
    };

    const handleSubmit = (values: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    }) => {
    const userPayload = {
        id: localStorage.getItem("id"),
        userFirstname: values.firstName,
        userLastname: values.lastName,
        userMobilePhoneNo: values.phoneNumber,
        email: values.email,
    };

    fetch(UPDATE_DETAILS_API_CALL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*" 
    },
      body: JSON.stringify(userPayload),
    })
      .then(async(data) => {
        const response = await data.text();
        console.log(response);
        localStorage.setItem("name", userPayload.userFirstname + " " + userPayload.userLastname);
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("email", userPayload.email);
        localStorage.setItem("token", response);
        window.location.href = "/settings";
      
      })
      .catch((error) => console.log(error));

        console.log("Payload: ", JSON.stringify(userPayload));
    }

    return (
        <Container maxWidth="sm" className="form-container">
            <Formik
                enableReinitialize={true}
                initialValues={{ ...initialFormValues }}
                validationSchema={formValidationSchema}
                onSubmit={(values) => handleSubmit(values)}
            >
            <Form>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <h2 className="form-h">Your details</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="firstName" 
                            name="firstName" 
                            label="First Name"
                            InputLabelProps={{ shrink: true }}
                            value={initialFormValues.firstName} 
                            onChange={(e) => setCustomerDetails({...customerDetails, userFirstname: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField 
                            id="lastName" 
                            name="lastName" 
                            label="Last Name"
                            InputLabelProps={{ shrink: true }} 
                            value={initialFormValues.lastName} 
                            onChange={(e) => setCustomerDetails({...customerDetails, userLastname: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="email" 
                            name="email" 
                            label="Email"
                            InputLabelProps={{ shrink: true }} 
                            value={initialFormValues.email} 
                            onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField 
                            id="phoneNumber" 
                            name="phoneNumber" 
                            label="Phone Number"
                            InputLabelProps={{ shrink: true }}
                            value={initialFormValues.phoneNumber} 
                            onChange={(e) => setCustomerDetails({...customerDetails, userMobilePhoneNo: e.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormSubmitButton>Update Details</FormSubmitButton>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
        </Container>
    )
}