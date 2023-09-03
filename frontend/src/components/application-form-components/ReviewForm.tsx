import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import dayjs, { Dayjs } from 'dayjs';
import ApplicationAttributeReview from "./ApplicationAttributeReview";
import App from "../../App";

export default function ReviewForm({ review }: any) {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Application Review
            </Typography>
            <Typography variant="body1">
                Please review the details of your application below. If you see any incorrect details please navigate back and fill in the correct information:
            </Typography>
            <Box sx={{ p: 1 }}>
                <Typography variant="h6" pt={1} >
                    Address Details
                </Typography>
                <Box sx={{ px: 1 }}>
                    <Typography>
                        {review.addressDetails.street}, {review.addressDetails.city} {review.addressDetails.zip} {review.addressDetails.state}
                    </Typography>
                    <Typography fontWeight={"bold"} display={"inline"}>
                        Address Since:
                    </Typography>
                    <Typography display={"inline"}> {dayjs(review.addressDetails.dateMovedIn).format("DD/MM/YYYY")}</Typography>
                </Box>
                <Divider sx={{ py: 1 }} />
                <Typography variant="h6" pt={1} >
                    Occupation Details
                </Typography>
                <Box sx={{px: 1}}>
                    <Typography display={"inline"} fontWeight={"bold"}>
                        {"Occupation Title: "}
                    </Typography>
                    <Typography display={"inline"}>
                        {review.occupationDetails.description}
                    </Typography>
                    <Typography></Typography>
                    <Typography display={"inline"} fontWeight={"bold"}>
                        {"Salary: "}
                    </Typography>
                    <Typography display={"inline"}>
                        ${review.occupationDetails.salary}
                    </Typography>
                    <Typography>{review.occupationDetails.occupationType}</Typography>
                </Box>
                <Divider sx={{ py: 1 }} />
                <ApplicationAttributeReview reviewDetails={review.financeDetails} type={"Finance"} />
                <Divider sx={{ py: 1 }} />
                <ApplicationAttributeReview reviewDetails={review.expenseDetails} type={"Expense"}/>
                <Divider sx={{ py: 1 }} />
                <ApplicationAttributeReview reviewDetails={review.assetDetails} type={"Asset"} />
            </Box>
        </React.Fragment>
    );
}