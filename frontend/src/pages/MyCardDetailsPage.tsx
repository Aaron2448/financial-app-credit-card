import Grid from "@mui/material/Grid";
import "../css/pages-css/LandingPage.css";
import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import "../styles/TransactionsPage.css";
import {MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function MyCardDetailsPage() {
  
  	const [full_name, setFull_name] = useState('');
  	const [card_account_number, setCard_account_number] = useState('');
  	const [card_account_expiration_date, setCard_account_expiration_date] = useState('');
  	const [card_account_CVV, setCard_account_CVV] = useState('');
    const [cardDetails, setCardDetails] = useState<{[key: string]: any}>({});
    const GET_CARD_DETAILS_API_CALL = "http://localhost:3309/api/cardAccount/getCardAccount"

    useEffect(() => {

		getCardDetails();
       
    }, []); 
    
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
          
          setFull_name(data.full_name)
          setCard_account_number(data.card_account_number)
          setCard_account_expiration_date(fixedData.card_account_expiration_date)
          setCard_account_CVV(data.card_account_CVV)
      })
      .catch((error) => {
        console.log(error);
      })
  };
  
  return (  
 <>
      <SideNavBar />
      
      <div>

        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs></Grid>
        </Grid>
   
        <Grid container spacing={3}>
          <Grid item xs>
            <h2></h2>
          </Grid>
          <Grid item xs={6}>
            <p className="transaction-title-one"></p>
          </Grid>
          <Grid item xs>
            <h2></h2>
          </Grid>
        </Grid>
    
    <br></br>
        <h2 className="icons" >Card Details</h2>
    
    <Grid>
        <div className="transaction-history-div-one">
            <h3>My Card Details</h3>
            
            <div className="table-div-one">
              <table className="table-style">
                <thead>
                  <td align="left">Full Name</td>
                  <td align="justify">Card Number</td>
                  <td align="justify">Expiration Date</td>
                  <td align="justify">CVV</td>
                </thead>
                <tbody>
                
                    <tr>
                      <td align="left"><b>{full_name}</b></td>
                      <td align="left"><b>{card_account_number}</b></td>
                      <td align="left"><b>{card_account_expiration_date}</b></td>
                      <td align="left"><b>{card_account_CVV}</b></td>
                    </tr>
               
                </tbody>
              </table>   
            </div>
          </div>
          <br>
          </br>
             <Grid className="icons">
            <MDBBtn>
                <Link to="/dashboard">
                    Dashboard
                </Link>
            </MDBBtn>
        </Grid>
      </Grid>
    </div>    
         
</>
       
    
  );
}

export default MyCardDetailsPage;
