import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function LandingPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h2>
            Smart decisions made simple with our automated credit card system.
            Howzat?
          </h2>
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

export default LandingPage;
