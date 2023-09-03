import { Box, Typography } from "@mui/material";
import React from "react";

export default function ApplicationAttributeReview({ reviewDetails, type }: any) {
    return (
        <React.Fragment>
            <Typography variant="h6" pt={1}>
                {type} Details
            </Typography>
            <Box sx={{ px: 1 }}>
                <Typography fontWeight={"bold"} display={"inline"}>
                    {"Description: "}
                </Typography>
                <Typography display={"inline"}>{reviewDetails.description}</Typography>
                <Typography />
                <Typography fontWeight={"bold"} display={"inline"}>
                    {"Amount: "}
                </Typography>
                <Typography display={"inline"}>
                    ${reviewDetails.amount}
                </Typography>
                <Typography />
                <Typography display={"inline"} fontWeight={"bold"}>
                    {"Frequency: "}
                </Typography>
                <Typography display={"inline"}>
                    {reviewDetails.frequency}
                </Typography>
            </Box>
        </React.Fragment>
    );
}