import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";
import { useLocation } from "react-router";

function SupportTicketNotLoggedInSuccessfulPage() {
  //getting estimatedResponseTimeDays from SupportPageCustommerLoggedInView.tsx
  const {state} = useLocation();
  const {days} = state

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h2>
            Support Ticket Succesfully Submitted!
          </h2>
          <p>
          	We aim to get back to you within {days} business days.
            Your patience is greatly appreciated.
            <br></br>
            If you have any further queries, please feel free to call us on 0800 66 66 39.
          </p>
          <Button onClick={() => (window.location.href = "/")}>
            Home
          </Button>
        </div>
      </Grid>
      <Grid item xs={6}>
        <img
          className="howzat-credit-card-img"
          src={CreditCardImg}
          alt="An image of the Howzart credit card"
        />
      </Grid>
    </Grid>
  );
}

export default SupportTicketNotLoggedInSuccessfulPage;

