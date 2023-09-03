import Grid from "@mui/material/Grid";
import SideNavBar from "../../components/SideNavBar";
import Button from "../../components/Button";
import { Security } from "@mui/icons-material";
import "../../css/pages-css/page-views-css/DashboardHomePageCustomerView.sass";
import { useEffect, useState } from "react";
import RepaymentDueDateButton from "../../components/RepaymentDueDateButton";
import CreditCardImg from "../../images/howzat-credit-card-shiny.png";
import green from "@mui/material/colors/green";

function DashboardHomePageCustomerView() {
 
  const [cardDetails, setCardDetails] = useState<{[key: string]: any}>({});
  const [transactions, setTransactions] = useState([]);
  const GET_CARD_DETAILS_API_CALL = "http://localhost:3309/api/cardAccount/getCardAccount"
  const GET_TRANSACTIONS_API_CALL = "http://localhost:3309/api/transaction/getAllUserTransactions";

  const getCardDetails = () => {
      fetch(GET_CARD_DETAILS_API_CALL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
      .then(async(response) => {
          const data = await response.json();
          let expirationDate = new Date(data.card_account_expiration_date);
          const fixedData = { ...data, card_account_expiration_date: expirationDate.toLocaleDateString('en-GB', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) 
          }
          setCardDetails(fixedData);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const getAllTransactions = () => {
    fetch(GET_TRANSACTIONS_API_CALL, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(async(response) => {
        const data = await response.json();
        setTransactions(data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getCardDetails();
    getAllTransactions();
  }, []);

  return (
    <>
      <SideNavBar />
      {Object.keys(cardDetails).length > 0 ?
        <Grid container>
          <Grid item xs={4.5}>
            <RepaymentDueDateButton />
          </Grid>
          <Grid item xs={4.5}>
            <Button
              display="block"
              colour="white"
              backgroundcolour="#17181d"
              hovercolour="#17181d"
              hoverbackgroundcolour="#f7ad19"
              borderradius="20px"
              fontWeight="normal"
              width="60%"
              marginleft="15%"
              margintop="14.5%"
            >
              <h3>Credit card/s</h3>
              <p className="credit-card-numbers-p">{cardDetails.card_account_number}</p>
              <p className="total-credit-allowance-p">
                Total credit allowance: <b>${cardDetails.card_account_max_balance}</b>
              </p>
              <p className="renewal-info-p">
                *Will renew on <b>{cardDetails.card_account_expiration_date}</b>
              </p>
            </Button>
          </Grid>
          <Grid item xs={3}>
            <div className="balance-circle">
              <h3>Balance</h3>
              <p>${Number(cardDetails.card_account_balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="transaction-history-div">
              <h3>Transaction history</h3>
              <a href="#">See all</a>
              <div className="table-div">
                <table>
                  <tbody>
                    {transactions.map((data: any) => (
                      <tr key={data.transaction_id}>
                        <td align="left">
                          <b>{data.merchant_name}</b>
                        </td>
                        <td className="table-date-cell">{data.transaction_date}</td>
                        <td align="right" className="table-transaction-cell">
                          <b style={{color:"green"}}>${Number(data.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="security-fraud-div">
              <Security fontSize="large" sx={{ color: "#f7ad19" }} />
              <h3>Fraud detection</h3>
              <p className="security-fraud-div-status-p">
                No fraudulent activity detected on your account
              </p>
              <p className="security-fraud-div-last-checked-p">
                Recommended actions: NONE
              </p>
            </div>
          </Grid>
        </Grid>
      :
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className="main-text-section">
              <h2>
                Sign up for a new credit card! 
              </h2>
              <p>
                Get approved for a credit card in seconds with our advanced
                automated decisioning system. Enjoy fast, secure, and reliable
                credit decisions with ease.
              </p>
              <Button onClick={() => (window.location.href = "/applications")}>
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
      }
    </>
  );
}

export default DashboardHomePageCustomerView;
