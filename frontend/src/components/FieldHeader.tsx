import { Typography } from "@mui/material";

export default function FieldHeader({text}: any){
    return(
    <Typography px={1} pt={1}>
        {text}
    </Typography>
    );
}