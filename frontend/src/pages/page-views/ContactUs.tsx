import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import "../../styles/SupportPage.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "10px",
}));

function ContactUs() {
  return (
    <div>
      <Stack
        className="contact-us-stack"
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
      >
        <Item className="address-contact-item">
          <div className="address-contact">
            <p className="heading-p">Howzat LLC</p>
            <p className="small-text">123 Kangaroo Street,</p>
            <p className="small-text">SYD 2000</p>
          </div>
        </Item>
        <Item className="address-contact-item">
          <div className="call-us">
            <p className="heading-p">Call Us:</p>
            <p className="small-text">63480-7888</p>
            <p className="small-text">1300 7658712</p>
          </div>
        </Item>
        <Item className="address-contact-item">
          <div className="call-us">
            <p className="heading-p">Opening Hours:</p>
            <p className="small-text">Monday-Friday 8am-8pm</p>
            <p className="small-text">Saturday 10am-5pm</p>
            <p className="small-text">Sunday closed</p>
          </div>
        </Item>
      </Stack>
    </div>
  );
}

export default ContactUs;
