import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function EligibilityMessagePage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h1>
            It looks like the Eligibility Criteria hasn't been Met
          </h1>
          <p>
            Unfortunately your application does not qualify for a credit card with us at this moment. 
            We calculate ratios based upon expenses and income to determine eligibility. 
            We advise you to apply another time when your ratios are different. 
            Thank you. 
          </p>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            Back to dashbaord
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

export default EligibilityMessagePage;
