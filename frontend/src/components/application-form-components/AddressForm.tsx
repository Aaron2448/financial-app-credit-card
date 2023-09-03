import { Grid, MenuItem, Select, SelectChangeEvent, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Alert from "@mui/material/Alert";
import {FormHelperText} from "@mui/material";

enum States {
    NSW = "NSW",
    VIC = "VIC",
    QLD = "QLD",
    ACT = "ACT",
    SA = "SA",
    WA = "WA",
    TAS = "TAS",
    NT = "NT"
}

export default function AddressForm({ addressRequest, setAddressRequest }: any) {
	
	
	
    const [residency, setResidency] = React.useState<boolean>();
    const [state, setState] = React.useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [lengthError, setLengthError] = useState('');
    const [booleanError, setBooleanError] = useState('');
    const [error, setError] = useState(null);
    const [lengthValue, setLengthValue] = useState('');
    const [resError, setResError] = useState('');
    const [cityError, setCityError] = useState('');
    const [zipError, setZipError] = useState('');
    const [stateError, setStateError] = useState('');
	const [criteriaAttempt, setCriteriaAttempt] = useState('');


	

    const handleResidency = (event: React.MouseEvent<HTMLElement>, newResidency: boolean) => {
	        setAddressRequest({
	            ...addressRequest,
	            residency: newResidency
	        })
      }; 
	
	const handleResBlur = (event) => {

			if (event.target.value !== true) {
	        	setResError("Must be a permanent Australian resident or citizen.");
	        } else {
				setLengthError("Requirement met.");
			}
			
	};

	

    const handleStreet = (event) => {

			if (event.target.value.length < 10) {
	        	setLengthError("Entry must be at least 10 characters long.");
	        } else {
				setLengthError("Valid entry.");
				setAddressRequest({
	                ...addressRequest,
	                street: event.target.value
	            })
			}
			
	};

       const handleCity = (event) => {
		   
		   if(event.target.value.length < 4) {
	        setCityError("Must be at least 4 characters long.")
	        } else {
			setAddressRequest({
	            ...addressRequest,
	            city: event.target.value
	        })
	        setCityError("Is valid.")
			}
			
      }; 
      
          const handleZip = (event) => {
		   
		   if(event.target.value.length === 4) {
	        setAddressRequest({
	            ...addressRequest,
	            zip: event.target.value
	        })
	        setZipError("Is valid.")
	        } else {
	        setZipError("Must be at least 4 digits long.")
			} 
			
      }; 
      
          const handleState = (event) => {
		   
		   if(event.target.value.length < 2) {
	        setStateError("Must enter state.")
	        } else {
			setAddressRequest({
	            ...addressRequest,
	            state: event.target.value
	        })
	        setStateError("Is valid.")
			}
			
      }; 
      

    return (
        <React.Fragment>
            <Typography variant="h5">
                Residential Details
            </Typography>
            <Grid container spacing={3} sx={{ px: 3, py: 1 }}>

                <Grid item xs={12}>
                    <Typography>
                        Are you an Australia Permanent Resident or Citizen?
                    </Typography>
                    
                    <ToggleButtonGroup
                        
                       
                        id="residency"        
                        fullWidth      
                        value={addressRequest.residency}
                        exclusive
                         onChange={handleResidency}
                        onBlur={handleResBlur}
                       >

                        <ToggleButton value={true}>
                            Yes
                        </ToggleButton>
                        <ToggleButton value={false}>
                            No
                        </ToggleButton>
                        
                    </ToggleButtonGroup>
                    
                       {resError.length > 0 && (        
                <FormHelperText error>  
                    {resError.endsWith("citizen.") ? <div>{resError}</div> : ''}
                    
                    {resError.endsWith("citizen.") && (
                        <span style={{ color: "red" }}>✗</span>
                        
                    )}
                    
                     {resError.endsWith("met.") && (
                        <span style={{ color: "green" }}>✓</span>
                    )}
                    
                </FormHelperText>
                        
                        
                    )} 
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h5">
                        Address Details
                    </Typography>
                    <Typography px={1} pt={1}>
                        Street Address
                    </Typography>
                    <TextField
                        required
                        id="street"
                        type="street"   
                        name="street"
                        fullWidth
                        variant="outlined"
                        value={addressRequest.street}
                        onChange={(event) => { setAddressRequest({ ...addressRequest, street: event.target.value}) } }
                        onBlur={handleStreet}
                    />
                    {lengthError.length > 0 && (        
                <FormHelperText error>  
                    {lengthError.endsWith("long.") ? <div>{lengthError}</div> : ''}
                    
                    {lengthError.endsWith("long.") && (
                        <span style={{ color: "red" }}>✗</span>
                        
                    )}
                    
                     {lengthError.endsWith("entry.") && (
                        <span style={{ color: "green" }}>✓</span>
                    )}
                    
                </FormHelperText>
                        
                        
                    )}   
                </Grid>
                
                
                
                
                
                <Grid item xs={6} sm={4}>
                    <Typography px={1}>
                        City
                    </Typography>
                    <TextField
                        required
                        id="city"
                        name="city"
                        fullWidth
                        variant="outlined"
                        value={addressRequest.city}
                        onChange={(event) => {
                            setAddressRequest({
                                ...addressRequest,
                                city: event.target.value,
                            })
                        }}
                        onBlur={handleCity}
                    />
                    
                        {cityError.length > 0 && (        
                <FormHelperText error>  
                    {cityError.endsWith("long.") ? <div>{cityError}</div> : ''}
                    
                    {cityError.endsWith("long.") && (
                        <span style={{ color: "red" }}>✗</span>
                        
                    )}
                    
                     {cityError.endsWith("valid.") && (
                        <span style={{ color: "green" }}>✓</span>
                    )}
                    
                </FormHelperText>
                        
                        
                    )} 
                </Grid>
                
                
                
                
                
                <Grid item xs={6} sm={4}>
                    <Typography px={1}>
                        Postcode
                    </Typography>
                    <TextField
                        required
                        type="number"
                        id="postcode"
                        name="postcode"
                        fullWidth
                        variant="outlined"
                        value={addressRequest.zip}
                        onChange={(e) => {
                            setAddressRequest({
                                ...addressRequest,
                                zip: e.target.value
                            })
                        }}
                        onBlur={handleZip}
                    />
                    
                            
                        {zipError.length > 0 && (        
                <FormHelperText error>  
                    {zipError.endsWith("long.") ? <div>{zipError}</div> : ''}
                    
                    {zipError.endsWith("long.") && (
                        <span style={{ color: "red" }}>✗</span>
                        
                    )}
                    
                     {zipError.endsWith("valid.") && (
                        <span style={{ color: "green" }}>✓</span>
                    )}
                    
                </FormHelperText>
                        
                        
                    )} 
                    
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Typography px={1}>
                        State
                    </Typography>
                    <Select
                        id="state"
                        value={addressRequest.state}
                        onChange={(e) => {
                            setAddressRequest({
                                ...addressRequest,
                                state: e.target.value
                            })
                        }}
                        fullWidth>
                        {(Object.keys(States) as Array<States>).map((state) => (
                            <MenuItem key={state} value={state}>{state}</MenuItem>
                        ))}
                        onBlur={handleState}
                    </Select>
                    
                      {stateError.length >= 0 && (        
                <FormHelperText error>  
                    {stateError.endsWith("state.") ? <div>{stateError}</div> : ''}
                    
                    {stateError.endsWith("state.") && (
                        <span style={{ color: "red" }}>✗</span>
                        
                    )}
                    
                     {stateError.endsWith("valid.") && (
                        <span style={{ color: "green" }}>✓</span>
                    )}
                    
                </FormHelperText>
                        
                        
                    )} 
                    
                    
                    
                    
                </Grid>
                <Grid item xs={6} sm={12}>
                    <Typography px={1}>
                        Please select the approximate date you moved into the above address:
                    </Typography>
                    <DatePicker
                        value={addressRequest.dateMovedIn}
                        onChange={(e) => {
                            setAddressRequest({
                                ...addressRequest,
                                dateMovedIn: e
                            });
                        }}
                        sx={{ width: 1 }}
                    />
                    <p></p>
                </Grid>
     				
     				
                             {addressRequest.criteriaAttempt === "fail" && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    All fields must be filled and valid.
                                </Alert>
                            )}
                            
                             {addressRequest.criteriaAttempt === "pass" && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    Valid form.
                                </Alert>
                            )}
                	
            </Grid>
        </React.Fragment>
    );
};