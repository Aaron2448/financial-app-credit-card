import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function RegisterFailurePage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h1>
            An account already exists with that email. Please try again.   
          </h1>
          <p>
            Get approved for a credit card in seconds with our advanced
            automated decisioning system. Enjoy fast, secure, and reliable
            credit decisions with ease.
          </p>
          <Button onClick={() => (window.location.href = "/signup")}>
            Get Started
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

export default RegisterFailurePage;
