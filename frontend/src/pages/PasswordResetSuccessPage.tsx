import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function PasswordResetSuccessPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h1>
            Reset successful!    
          </h1>
          <p>
            Check your email for a temporary password which expires in 5 minutes.
          </p>
          <Button onClick={() => (window.location.href = "/login")}>
            Login
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

export default PasswordResetSuccessPage;
