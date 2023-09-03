import { Grid, InputAdornment, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import FieldHeader from "../FieldHeader";

export default function PaymentForm({paymentRequest, setPaymentRequest,preset}: any) {
    return (
        <React.Fragment>

            <Grid container spacing={3} sx={{ px: 3, py: 1 }}>
                <Grid item xs={12}>
                    <FieldHeader text={"Amount"} />
                    <TextField
                        required
                        id="amount"
                        name="amount"
                        type="number"
                        fullWidth
                        variant="outlined"
                        value={paymentRequest.amount}
                      	onChange={(e) => {
                            setPaymentRequest({
                                ...paymentRequest,
                                    amount: e.target.value
                            })
                        }}
                    />    
                </Grid>
                
                <Grid item xs={6}>
                    <FieldHeader text={"Merchant Name"} />
                    <TextField
                        required
                        id="payee"
                        name="payee"
                        fullWidth
                        variant="outlined" 
                        disabled={preset}
                        value={paymentRequest.payee}
                        onChange={(e) => {
                            setPaymentRequest({
                                ...paymentRequest,
                                    payee: e.target.value
                            })
                        }}
                        />
                </Grid>
               
                <Grid item xs={6}>
                    <FieldHeader text={"Name on card"} />
                    <TextField
                        required
                        id="full_name"
                        name="full_name"
                        fullWidth
                        variant="outlined" 
                        value={paymentRequest.full_name}
                        onChange={(e) => {
                            setPaymentRequest({
                                ...paymentRequest,
                                    full_name: e.target.value
                            })
                        }}
                        />
                 </Grid>

				  <Grid item xs={6}>
                    <FieldHeader text={"Card number"} />
                    <TextField
                        required
                        id="card_account_number"
                        name="card_account_number"
                        fullWidth
                        variant="outlined" 
                        value={paymentRequest.card_account_number}
                        onChange={(e) => {
                            setPaymentRequest({
                                ...paymentRequest,
                                    card_account_number: e.target.value
                            })
                        }}
                        />
                 </Grid>

				  <Grid item xs={6}>
                    <FieldHeader text={"Card expiration"} />
                    <TextField
                        required
                        id="card_account_expiration_date"
                        name="card_account_expiration_date"
                        fullWidth
                        variant="outlined" 
                        value={paymentRequest.card_account_expiration_date}
                        onChange={(e) => {
                            setPaymentRequest({
                                ...paymentRequest,
                                    card_account_expiration_date: e.target.value
                            })
                        }}
                        />
                 </Grid>

				  <Grid item xs={6}>
                    <FieldHeader text={"Card CVV"} />
                    <TextField
                        required
                        id="card_account_CVV"
                        name="card_account_CVV"
                        fullWidth
                        variant="outlined" 
                        value={paymentRequest.card_account_CVV}
                        onChange={(e) => {
                            setPaymentRequest({
                                ...paymentRequest,
                                    card_account_CVV: e.target.value
                            })
                        }}
                        />
                 </Grid>

            </Grid>
        </React.Fragment>
    );
};