import { Box, Button, Container, CssBaseline, Paper, Step, StepLabel, Stepper, ThemeProvider, Typography, createTheme, makeStyles } from "@mui/material";
import { useEffect, useState } from "react";
import AddressForm from "../components/application-form-components/AddressForm";
import OccupationForm from "../components/application-form-components/OccupationForm";
import IncomeForm from "../components/application-form-components/IncomeForm";
import ExpenseForm from "../components/application-form-components/ExpenseForm";
import AssetForm from "../components/application-form-components/AssetForm";
import ReviewForm from "../components/application-form-components/ReviewForm";
import dayjs, { Dayjs } from 'dayjs';
import axios from "axios";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const steps = ['Address', 'Occupation', 'Finances', 'Expenses', 'Assets', 'Review'];

interface AddressCreationRequest {
    residency: boolean,
    street: string,
    city: string,
    state: string,
    postcode: string,
    dateMovedIn: Dayjs,
    criteriaCheck: string,
    criteriaAttempt: string
  
};
 
interface OccupationCreationRequest {
    description: string,
    occupationType: string
    salary: number,
    criteriaCheck: string,
    criteriaAttempt: string
};

interface ApplicationAttributeRequest {
    description: string,
    amount: number,
    frequency: string,
    criteriaAttempt: string
};

interface ReviewStatement {
    addressDetails: AddressCreationRequest,
    occupationDetails: OccupationCreationRequest,
    financeDetails: ApplicationAttributeRequest,
    expenseDetails: ApplicationAttributeRequest,
    assetDetails: ApplicationAttributeRequest
};

const theme = createTheme();

export default function NewApplicationFormPage() {
	
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
                    
                    const res = await response.text();
                    if (res) {
						window.location.href = '/service';
					} else {
						//alows application to be filled
					}
                    
                } else {
					// generic error page
                }
                
            } catch (error) {
                console.error(error);
            }
            
        };

        fetchUser();
    }, []); 

    const [activeStep, setActiveStep] = React.useState(0);

    const [addressRequest, setAddressRequest] = React.useState<AddressCreationRequest>({
        residency: true,
        street: "",
        city: "",
        state: "",
        postcode: "",
        dateMovedIn: dayjs(),
        criteriaCheck: "NA",
        criteriaAttempt: "NA"
    });

    const [occupationRequest, setOccupationRequest] = React.useState<OccupationCreationRequest>({
        description: "",
        salary: 0,
        occupationType: "",
        criteriaCheck: "NA",
        criteriaAttempt: "NA"
    });

    const [financeRequest, setFinanceRequest] = React.useState<ApplicationAttributeRequest>({
        description: "",
        frequency: "",
        amount: 0,
        criteriaAttempt: "NA"
    });

    const [expenseRequest, setExpenseRequest] = React.useState<ApplicationAttributeRequest>({
        description: "",
        frequency: "",
        amount: 0,
        criteriaAttempt: "NA"
    });

    const [assetRequest, setAssetRequest] = React.useState<ApplicationAttributeRequest>({
        description: "",
        frequency: "",
        amount: 0,
        criteriaAttempt: "NA"
    });

    const [loading, setLoading] = useState(false)
    const id = localStorage.getItem("id")
    const ATTRIBUTE_URL = "http://localhost:3309/api/application/create"
    
    const handleSubmit = async () => {

        try {

            const header = {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json"
            }

            const address = {
				user_info_id: id,
				permanent_resident: addressRequest.residency, 
                address_street: addressRequest.street,
                address_city: addressRequest.city,
                address_state: addressRequest.state,
                address_zip: addressRequest.postcode,
                date_moved_in: dayjs(addressRequest.dateMovedIn).format("YYYY-MM-DD")
            }
            
            const occupation = {
				user_info_id: id,
				occupation_title: occupationRequest.description,
				occupation_type: occupationRequest.occupationType,
				occupation_salary: occupationRequest.salary
			}
			
			const finance = {
				user_info_id: id,
				description: financeRequest.description,
				amount: financeRequest.amount,
				frequency: financeRequest.frequency
			}
			
			const asset = {
				user_info_id: id,
				description: assetRequest.description,
				amount: assetRequest.amount,
				frequency: assetRequest.frequency
			}
			
			const expense = {
				user_info_id: id,
				description: expenseRequest.description,
				amount: expenseRequest.amount,
				frequency: expenseRequest.frequency
			}

			const objectDTO = {
					address: address,
					occupation: occupation,
					finance: finance,
					asset: asset,
					expense: expense,
					full_name: localStorage.getItem("name"),
					user_info_id: localStorage.getItem("id")
			}
	
            setLoading(true)

            try {


				await axios.post(ATTRIBUTE_URL, objectDTO, { headers: header });
					console.log(objectDTO + " was sent")
	
	                setTimeout(() => {
	
	                    setLoading(false)
	
	                }, 10000)
	                
	                    } catch (error) {
	
	                setTimeout(() => {
	
	                    setLoading(false)
	
	                }, 6000)
	
	            }

        } catch (error) {

            console.log(error);
            setLoading(false)

        }

    }

    const handleNext = () => {
		
		if (activeStep === 0 && ((addressRequest.residency !== true) || (addressRequest.street.length < 10) || (addressRequest.city.length < 4) || (addressRequest.state.length <= 1))) {
			setAddressRequest({...addressRequest,criteriaAttempt: "fail"})
			setActiveStep(activeStep)
		} else if (activeStep === 1 && ((occupationRequest.description.length < 5) || (occupationRequest.occupationType.length <=1) )) {
			setOccupationRequest({...occupationRequest,criteriaAttempt: "fail"})
			setActiveStep(activeStep)
		} else if (activeStep === 2 && ((financeRequest.description.length < 5) || (financeRequest.frequency.length <=1) )) {
			setFinanceRequest({...financeRequest,criteriaAttempt: "fail"})
			setActiveStep(activeStep)
		} else if (activeStep === 3 && ((expenseRequest.description.length < 5) || (expenseRequest.frequency.length <=1) )) {
			setExpenseRequest({...expenseRequest,criteriaAttempt: "fail"})
			setActiveStep(activeStep)
		} else if (activeStep === 4 && ((assetRequest.description.length < 5) || (assetRequest.frequency.length <=1) )) {
			setAssetRequest({...assetRequest,criteriaAttempt: "fail"})
			setActiveStep(activeStep)
		} else if (activeStep === 0) {
			setAddressRequest({...addressRequest,criteriaAttempt: "pass"})
			handleFinal()
		} else if (activeStep === 1) {
			setOccupationRequest({...occupationRequest,criteriaAttempt: "pass"})
			handleFinal()
		} else if (activeStep === 2) {
			setFinanceRequest({...financeRequest,criteriaAttempt: "pass"})
			handleFinal()
		} else if (activeStep === 3) {
			setExpenseRequest({...expenseRequest,criteriaAttempt: "pass"})
			handleFinal()
		} else if (activeStep === 4) {
			setAssetRequest({...assetRequest,criteriaAttempt: "pass"})
			handleFinal()
		} else if (activeStep == steps.length - 1) {
			handleFinal()
		}

        //validate address Google API POST request
        const verifyAddressGoogleApiRequestURL = "https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyDnF6bcCl3GpBxqqY6dHgj9bfT7iDknk44"
        const verifyAddressBody = {
            address : {
                regionCode : "AU",
                locality : "",
                administrativeArea : addressRequest.city,
                postalCode : addressRequest.postcode,
                addressLines : addressRequest.street
            },
            enableUspsCass : false
        }
        axios.post(verifyAddressGoogleApiRequestURL, verifyAddressBody)
            .then(response => {
                if(response.status === 200){
                    //result of api verification call
                    const result = response.data
                    //confirming each part of address inputted. if any part wrong, applicant won't be allowed to proceed
                    for(let i = 0; i <= 4; i++){
                        if(result["result"]["address"]["addressComponents"][i]["confirmationLevel"] != "CONFIRMED"){
                            console.log("Unconfirmed aspect of address: " + result["result"]["address"]["addressComponents"][i]["componentName"]["text"])
                            setAddressRequest({...addressRequest,criteriaAttempt: "fail"})
			                setActiveStep(activeStep)
                        }

                        else{
                            console.log("Confirmed aspect of address: " + result["result"]["address"]["addressComponents"][i]["componentName"]["text"])
                        }
                    }
                }
            })
            .catch(error => {
                console.log("Address does not exist")
            })
		
};

const handleFinal = () => {		
		
		if ((activeStep === 0) && addressRequest.criteriaAttempt === "pass") {
			setActiveStep(activeStep + 1);
		} else if (activeStep === 1 && occupationRequest.criteriaAttempt === "pass") {
			setActiveStep(activeStep + 1);
		} else if (activeStep === 2 && financeRequest.criteriaAttempt === "pass") {
			setActiveStep(activeStep + 1);
		} else if (activeStep === 3 && expenseRequest.criteriaAttempt === "pass") {
			setActiveStep(activeStep + 1);
		} else if (activeStep === 4 && assetRequest.criteriaAttempt === "pass") {
			setActiveStep(activeStep + 1);	
		} else if (activeStep == steps.length - 1 && (expenseRequest.amount/financeRequest.amount * 100 < 80)) {
            setActiveStep(activeStep + 1);
            handleSubmit();
        } else if (activeStep == steps.length - 1) {
			window.location.href = '/EligibilityMessage';
		}
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step: number) {

        switch (step) {
            case 0:
                return <AddressForm addressRequest={addressRequest} setAddressRequest={setAddressRequest} />;
            case 1:
                return <OccupationForm occupationRequest={occupationRequest} setOccupationRequest={setOccupationRequest} />;
            case 2:
                return <IncomeForm incomeRequest={financeRequest} setIncomeRequest={setFinanceRequest} />;
            case 3:
                return <ExpenseForm expenseRequest={expenseRequest} setExpenseRequest={setExpenseRequest} />;
            case 4:
                return <AssetForm assetRequest={assetRequest} setAssetRequest={setAssetRequest} />;
            case 5:
                const review: ReviewStatement = {
                    addressDetails: addressRequest,
                    occupationDetails: occupationRequest,
                    financeDetails: financeRequest,
                    expenseDetails: expenseRequest,
                    assetDetails: assetRequest
                };
                return <ReviewForm review={review} />;
            default:
                throw new Error('Unknown Step');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 5 }}>
                    <Typography component="h1" variant="h4" align="center">
                        OneSwipe Credit Card Application Form
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>


                            {
                                loading ?

                                    <div>
                                        <p>Please wait while your application is being submitted</p>
                                        <ClipLoader color={'#D0021B'} loading={loading} size={100} />
                                    </div>
                                    :
                                    <div>
                                        <p>Your application has been submitted</p>
                                    </div>
                            }


                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }}>
                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                    
                   

                </Paper>
            </Container>
        </ThemeProvider>
    );
}