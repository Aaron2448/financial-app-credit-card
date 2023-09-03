import { Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import FieldHeader from "../FieldHeader";
import {FormHelperText} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useState } from "react";

enum EmploymentType {
    FULL_TIME = "Full Time",
    PART_TIME = "Part Time",
    CASUAL = "Casual",
    CONTRACT = "Contract",
    APPRENTICESHIP = "Apprenticeship"
}

export default function OccupationForm({occupationRequest, setOccupationRequest}: any) {
    
    const [lengthError, setLengthError] = useState('');
    
        const handleStreetBlur = (event) => {

			if (event.target.value.length < 5) {
	        	setLengthError("Entry must be at least 5 characters long.");
	        } else {
				setLengthError("Valid entry.");
				setOccupationRequest({
	                ...occupationRequest,
	                description: event.target.value
	            })
			}
			
	};
    
    return (
        <React.Fragment>
            <Typography variant="h5">
                Occupation Details
            </Typography>
            <Grid container spacing={3} sx={{ px: 3, py: 1 }}>
                <Grid item xs={12}>
                    <FieldHeader text={"Occupation Title"} />
                    <TextField
                        required
                        id="description"
                        name="description"
                        fullWidth
                        variant="outlined"
                        value={occupationRequest.description}
                        onChange={(e) => {
                            setOccupationRequest({
                                ...occupationRequest,
                                    description: e.target.value
                        })
                        }} 
                        onBlur={handleStreetBlur} 
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
                    <FieldHeader text={"Salary"} />
                    <TextField
                        required
                        type="number"
                        id="salary"
                        name="salary"
                        fullWidth
                        variant="outlined" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                        value={occupationRequest.salary}
                        onChange={(e) => {
                            setOccupationRequest({
                                ...occupationRequest,
                                    salary: e.target.value
                            })
                        }}
                        />
                </Grid>
                <Grid item xs={6}>
                    <FieldHeader text={"Employment Type"} />
                    <Select
                        id="employmentType"
                        fullWidth
                        value={occupationRequest.occupationType}
                        onChange={(e) => {
                            setOccupationRequest({
                                ...occupationRequest,
                                    occupationType: e.target.value
                            })
                        }}
                        >
                        {(Object.keys(EmploymentType) as (keyof typeof EmploymentType)[]).map((type) => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </Select>
                    <p></p>
                </Grid>
                
                 {occupationRequest.criteriaAttempt === "fail" && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    All fields must be filled and valid.
                                </Alert>
                            )}
                
                {occupationRequest.criteriaAttempt === "pass" && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    Valid form.
                                </Alert>
                            )}
                
                
            </Grid>
        </React.Fragment>
    );
};