import { Formik, Form } from "formik";
import * as Yup from "yup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "../components/form-components/TextFieldWrapper";
import FormSubmitButton from "../components/form-components/FormSubmitButton";
import "../css/pages-css/LoginPage.css";
import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";
import MuiTextField from "@mui/material/TextField";

const initialFormState = {
  email: "",
  password: "",
};

const formValidationSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email format"),
  password: Yup.string().required("Required"),
});

function LoginPage() {
  
  const [code, setCode] = useState();
  const [valid, setValid] = useState(true);
  const [token, setToken] = useState("");
  const [customerDetails, setCustomerDetails] = useState<{[key: string]: any}>({});
  const [hide, setHide] = useState<boolean>(true);
  const [submitted, setSubmitted] = useState<boolean>(false);
  
  const CUSTOMER_INFO_API_CALL = 'http://localhost:3309/api/userInfo/getProfile'
  const LOGIN_API_CALL = "http://localhost:3309/api/userInfo/authenticate";
  const VALIDATE_CODE_API_CALL = 'http://localhost:3309/api/code/validate/key'

  // Called once customerDetails are set. Checks if user is using 2FA
  // If using 2FA, then switch modals, if not, then set all required data and redirect to dashboard
  useEffect(() => {
    if(submitted){
      if(customerDetails.use2FA ) {
        console.log("useEffect if state");
        setHide(false);
      } else {
        localStorage.setItem("email", customerDetails.email)
        localStorage.setItem("token", token);
        localStorage.setItem("name", customerDetails.userFirstname + " " + customerDetails.userLastname)
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("id", customerDetails.id)
        window.location.href = "/dashboard";
      }
    } 
  }, [customerDetails])

  // Will be called if successful login
  useEffect(() => {
    if(submitted){
      getCustomerDetails();
    }
  }, [token])

  const handleSubmit = (values: { email: string; password: string }) => {
    setSubmitted(true);

    const loginPayload = {
      email: values.email,
      password: values.password
    };

    fetch(LOGIN_API_CALL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(loginPayload),
    })
      .then(async (data) => {

        if (data.ok) {
          // If login completed fetch user details 
          const accessToken = await data.text();
          
          setToken(accessToken);

        }
        else {
          window.location.href = "/loginFailure";
        }
      })
      .catch((error) => console.log(error));
  }

  const getCustomerDetails = () => {
    fetch(CUSTOMER_INFO_API_CALL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
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
  }

  const handleSubmitAuth = async (event:any) =>
  {
    event.preventDefault();

    const ValidatePayload = {
        username: customerDetails.email,
        code: code,
    };
    
    try {
        const response = await fetch(VALIDATE_CODE_API_CALL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*" 
            },
            body: JSON.stringify(ValidatePayload)
        });

        if (response.ok) {
            response.blob().then((blob) => {
                blob.text()
                .then(value => {
                  let passed = JSON.parse(value).valid;

                  setValid(passed); // To show user an error if they enter an invalid code

                  // If code is valid, set all required data and redirect to dashboard
                  if(passed) {
                    localStorage.setItem("email", customerDetails.email)
                    localStorage.setItem("token", token);
                    localStorage.setItem("name", customerDetails.userFirstname + " " + customerDetails.userLastname)
                    localStorage.setItem("loggedIn", "true")
                    localStorage.setItem("id", customerDetails.id)
                    window.location.href = "/dashboard";
                  }
                })
                .catch(error => {
                  console.log("Something went wrong" + error);
                });

            })
        } else {
            
        }
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <>
      <p className="signup-p">
        Don't have an account? <a href="/signup">Sign up</a> now
      </p>
      {hide ? 
        <Grid container>
          <Grid item xs={12}>
            <Container maxWidth="sm" className="form-container">
              <Formik
                initialValues={{ ...initialFormState }}
                validationSchema={formValidationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <h2 className="form-h">Login</h2>
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
                      <a href="/passwordReset" className="forgot-password-a">
                        Forgot password?
                      </a>
                    </Grid>
                    <Grid item xs={12}>
                      <FormSubmitButton>Log in</FormSubmitButton>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </Container>
          </Grid>
        </Grid>
        :
        <Grid container>
          <Container maxWidth="sm" className="form-container" sx={{minHeight:"200px"}}>
            <h2 className="form-h">Authentication</h2>        
            <p>Enter the 6 digit code from your Google Authenticator</p>
            <form className="twoFA-form" onSubmit={handleSubmitAuth}>
                <MuiTextField type="tel" name="Code" label="Code" value={code} onChange={(e:any) => {setCode(e.target.value)}}></MuiTextField>
                {valid ? 
                <></> :
                <Alert severity="error">
                    <strong>Invalid code try again</strong>
                </Alert>
                }
                <Button type="submit" variant="contained" className="security-buttons" sx={{color:"#17181d",backgroundColor:"#f7ad19",fontWeight:"bold","&:hover": {color: "#17181d",backgroundColor: "#fcd9b8"}}}>Submit</Button>
            </form>
          </Container>
        </Grid>     
      }
    </>
  );
}

export default LoginPage;
