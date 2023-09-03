import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function PaymentUnsuccessfulPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h2>
            Payment Unsuccessful. 
          </h2>
          <p>
          	That payment was not approved and sent successfully! 
          	Please ensure credit card details are inputted correctly and try again. Otherwise, you can contact customer service from AEST 9:00 - 17:00 on 1300 HOW ZAT.
          	We apologise if we have caused this inconvienience. 
          </p>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            View my dashboard
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

export default PaymentUnsuccessfulPage;
