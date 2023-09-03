import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function SupportTicketNotLoggedInUnsuccessfulPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h2>
            An error has occurred!
          </h2>
          <p>
          	Your support ticket was not submitted.
            Please try again.
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

export default SupportTicketNotLoggedInUnsuccessfulPage;