import { Box, Button, Container, CssBaseline, Paper, Step, StepLabel, Stepper, ThemeProvider, Typography, createTheme, makeStyles, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import PaymentForm from "../components/application-form-components/PaymentForm";
import axios from "axios";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useLocation } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

interface PaymentCreationRequest {
    amount: number,
    payee: string,
    full_name: string,
    card_account_number: string,
    card_account_expiration_date: string,
    card_account_CVV: string,
    existingBalance: number
};

const theme = createTheme();

export default function MakePaymentPage() {
    const {state} = useLocation();

	  const [myBalance, setMyBalance] = useState(0);
      
      useEffect(() => {
        
        const fetchUser = async () => {
		
		const auth = `Bearer ${localStorage.getItem('token')}`;	
		const userId = localStorage.getItem('id');	
		
 
             try {
                
                const response = await fetch('http://localhost:3309/api/cardAccount/getBalance', {
					method: "POST",
                    headers: {
                        Authorization: auth,
                        'Content-Type': 'application/json',
	                    "Access-Control-Allow-Headers": "*",
	        			"Access-Control-Allow-Origin": "*",
	        			"Access-Control-Allow-Methods": "*"
                    },
                    body: JSON.stringify(userId)
                });

                if (response.ok) {
                    
                    const format = await response.text();
                    setMyBalance(parseInt(format));
                    
                } else {
					
                }
                
            } catch (error) {
                console.error(error);
            }
            
        };

        fetchUser();
    }, []); 

    const [paymentRequest, setPaymentRequest] = React.useState<PaymentCreationRequest>({
        amount: state === null ? 0 : state.amount,
	    payee: state === null ? "" : state.name,
	    full_name: "",
	    card_account_number: "",
	    card_account_expiration_date: "",
	    card_account_CVV: "",
	    existingBalance: myBalance
    });

    const [loading, setLoading] = useState(false)
    const ATTRIBUTE_URL = "http://localhost:3309/api/cardAccount/submitTransaction"
    const GET_BALANCE_URL = 'http://localhost:3309/api/cardAccount/getBalance'
    var balance = 0;

    const handleSubmit = async () => {

            const header = {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }

            const objectDTO = {
				amount: paymentRequest.amount,
	    		payee: paymentRequest.payee,
	    		full_name: paymentRequest.full_name,
			    card_account_number: paymentRequest.card_account_number,
			    card_account_expiration_date: paymentRequest.card_account_expiration_date,
			    card_account_CVV: paymentRequest.card_account_CVV,
			    user_info_id: localStorage.getItem("id")
            }

            try {
				await axios.post(ATTRIBUTE_URL, objectDTO, { headers: header });
					
				setLoading(true);
					
				setTimeout(() => {
	
	                  setLoading(false)
	                  window.location.href = '/paySuccessful';
	
	            }, 10000)

	         } catch (error) {
	
				 setLoading(true);
				
				 setTimeout(() => {
	
	                  setLoading(false)
	                  window.location.href = '/payUnsuccessful';
	
	             }, 6000)

	         }

    }

    return (
         
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 5 }}>
                    <Typography component="h1" variant="h4" align="center">
                        OneSwipe Credit Card Payment Form
                    </Typography>
                
                    {loading ? (
                        <React.Fragment>

                            {
                                loading ?

                                    <div>
                                        <p>Please wait while your payment is being submitted</p>
                                        <ClipLoader color={'#D0021B'} loading={loading} size={100} />
                                    </div>
                                    :
                                    <div>
                                        <p>Your payment has been submitted</p>
                                    </div>
                            }

                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                           <PaymentForm typeof={"PaymentForm"} paymentRequest={paymentRequest} setPaymentRequest={setPaymentRequest} preset={state !== null}/>
        
       						 <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
                                    Submit
                                </Button>
                        </React.Fragment>
                    )}

                </Paper>
                
                <Grid container justifyContent="flex-end">
                    <MDBBtn>
                        <Link to="/transactions">
                            Go back to Transactions
                        </Link>
                    </MDBBtn>
                </Grid>
                
            </Container>
        </ThemeProvider>
    );
}
                        

		
