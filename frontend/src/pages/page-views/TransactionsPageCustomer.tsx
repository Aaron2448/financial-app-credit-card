import SideNavBar from "../../components/SideNavBar";
import Grid from "@mui/material/Grid";
import { date } from "yup";
import "../../styles/TransactionsPage.css";
import { useEffect, useState } from "react";
import { get } from "react-hook-form";
import {MDBTable, MDBTableHead, MDBTableBody, MDBBtn, MDBIcon} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function TransactionsPageCustomer() {
  
    const [transactions, setTransactions] = useState([]);
    const [myBalance, setMyBalance] = useState('');

    useEffect(() => {
        
        const fetchUser = async () => {
		
		const auth = `Bearer ${localStorage.getItem('token')}`;	
		const userId = localStorage.getItem('id');	
			
            try {
                
                const response = await fetch('http://localhost:3309/api/transaction/getAll', {
					method: "POST",
                    headers: {
                        Authorization: auth,
                        'Content-Type': 'application/json',
	                    "Access-Control-Allow-Headers": "*",
	        			"Access-Control-Allow-Origin": "*",
	        			"Access-Control-Allow-Methods": "*"
                    },
                    body: JSON.stringify(userId)
                });

                if (response.ok) {
                    const data = await response.json();
                    setTransactions(data.slice().reverse());
                } else {
					window.location.href = '/dashboard';
                    throw new Error('Failed to fetch transactions!');
                }
                
            } catch (error) {
                console.error(error);
            }
            
             try {
                
                const response = await fetch('http://localhost:3309/api/cardAccount/getBalance', {
					method: "POST",
                    headers: {
                        Authorization: auth,
                        'Content-Type': 'application/json',
	                    "Access-Control-Allow-Headers": "*",
	        			"Access-Control-Allow-Origin": "*",
	        			"Access-Control-Allow-Methods": "*"
                    },
                    body: JSON.stringify(userId)
                });

                if (response.ok) {
                    
                    const format = await response.text();
                    var formatted = Number(format).toLocaleString();
                    setMyBalance(formatted);
                    console.log("THIS IS MY BALANCE" + myBalance)
                } else {
					
                }
                
            } catch (error) {
                console.error(error);
            }
            
        };

        fetchUser();
    }, []); 
    
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
        <h2 className="icons" > ${myBalance} AUD</h2>
        
        <Grid>
          <div className="transaction-history-div-one">
            <h3>Transaction History</h3>

            <div className="table-div-one">
              <table className="table-style">
                <thead>
                  <td align="left">TID</td>
                  <td align="left">Date</td>
                  <td align="justify">Merchant</td>
                  <td align="justify">Amount</td>
                  <td align="justify">Balance</td>
                </thead>
                <tbody>
                  {transactions.map((value) => (
                    <tr
                      key={
						value.transaction_id +
						value.transaction_date +
                        value.merchant_name +
                        value.amount +
                        value.balance
                      }
                    >
                      <td align="left"><b>{value.transaction_id}</b></td>
                      <td align="left"><b>{value.transaction_date}</b></td>
                      <td align="left"><b>{value.merchant_name}</b></td>
                      <td align="left"> <b style={{color:"white"}}>-${Number(value.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}</b></td>
                      <td align="left"> <b style={{color:"green"}}>${Number(value.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}</b></td>
                    </tr>
                  ))}
                </tbody>
              </table>   
            </div>
            
          </div>
          <br>
          </br>
          <Grid className="icons">
            <MDBBtn>
                <Link to="/pay">
                    Make Payment
                </Link>
            </MDBBtn>
        </Grid>
        
        </Grid>

      </div>
    </>
  );
}

export default TransactionsPageCustomer;
