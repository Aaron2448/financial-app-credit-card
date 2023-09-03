import Button from "../components/Button";
import Grid from "@mui/material/Grid";
// import CreditCardImg from "../images/howzat-credit-card.png";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";
import "../css/pages-css/LandingPage.css";

function OneAppPerCustomerPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div className="main-text-section">
          <h2>
            You have already made a successfull application. 
          </h2>
          <p>
          	You can now navigate your finances with us!
            Make and monitor payments on the go with Howzat Credit Card Services. 
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

export default OneAppPerCustomerPage;
