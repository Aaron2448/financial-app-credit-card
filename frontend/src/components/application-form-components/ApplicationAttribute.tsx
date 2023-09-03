import React from "react";
import FieldHeader from "../FieldHeader";
import { Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import {FormHelperText} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";

enum Frequency {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    NONE = "NONE"
}

export default function ApplicationAttribrute({type, attributeRequest, setAttributeRequest}: any) {
    
    const [lengthError, setLengthError] = useState('');
    
        const handleDescriptionBlur = (event) => {

			if (event.target.value.length < 5) {
	        	setLengthError("Entry must be at least 5 characters long.");
	        } else {
				setLengthError("Valid entry.");
			}
			
	};
    
    
    return (
        <React.Fragment>
            <Typography variant="h5">
                {type} Details
            </Typography>
            <Grid container spacing={3} sx={{ px: 3, py: 1 }}>
                <Grid item xs={12}>
                    <FieldHeader text={type + " Description"} />
                    <TextField
                        required
                        id={type + "Description"}
                        name={type + "Description"}
                        fullWidth
                        variant="outlined"
                        value={attributeRequest.description}
                        onChange={(e) => {
                            setAttributeRequest({
                                ...attributeRequest,
                                    description: e.target.value
                            })
                        }}
                        onBlur={handleDescriptionBlur} 
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
                <Grid item xs={6}>
                    <FieldHeader text={"Total Amount"} />
                    <TextField
                        required
                        type="number"
                        id={type + "Amount"}
                        name={type + "Amount"}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        value={attributeRequest.amount}
                        onChange={(e) => {
                            setAttributeRequest({
                                ...attributeRequest,
                                    amount: e.target.value
                            })
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FieldHeader text={"Frequency"} />
                    <Select
                        id={type + "Frequency"}
                        fullWidth
                        value={attributeRequest.frequency}
                        onChange={(e) => {
                            setAttributeRequest({
                                ...attributeRequest,
                                    frequency: e.target.value
                            })
                        }}
                    >
                        {(Object.keys(Frequency) as (keyof typeof Frequency)[]).map((time) => (
                            <MenuItem key={type + time} value={time}>{time}</MenuItem>
                        ))}
                    </Select>
                    <p></p>
                </Grid>
                
                   {attributeRequest.criteriaAttempt === "fail" && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    All fields must be filled and valid.
                                </Alert>
                            )}
                            
                    {attributeRequest.criteriaAttempt === "pass" && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    Valid form.
                                </Alert>
                            )}
                
            </Grid>
        </React.Fragment>
    );
}