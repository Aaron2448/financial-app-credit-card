import SideNavBar from "../../components/SideNavBar";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import * as React from "react";
import axios from "axios";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Collapse, Typography } from "@mui/material";
import { number } from "yup";
import { KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";

const tableCellSx = {
  color: "white",
  borderBottom: "none"
}

const tabValues = {
  all: "",
  upcomming: "UP COMMING",
  overdue: "OVERDUE",
  paid: "PAID"
}

function CardPaymentPeriodDTO(
  date: string,
  totalAmount: Number,
  overDueAmount: Number,
  paiedAmount: Number,
  status: String,
  repayments: [
    {
      amount: Number,
      payPeriod: string,
      repaymentId: Number,
      transactionDate: string,
      transactionTime: string,
      userInfoId: Number
    }
  ]
) {
  return {
    date,
    totalAmount,
    overDueAmount,
    paiedAmount,
    status,
    repayments
  }
}

function useBilling() {
  const [state, setSate] = React.useState([CardPaymentPeriodDTO("", 0, 0, 0, "", [])])

  const loadData = () => {
    const url = "http://localhost:3309/api/repayment/all"
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }

    axios.get(url, requestOptions)
      .then((response) => {
        setSate(response.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  React.useEffect(loadData, [])

  return [state, setSate]
}

function Row(props: { row: ReturnType<typeof CardPaymentPeriodDTO> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'none' } }}>
        <TableCell style={tableCellSx}>
          <IconButton size="small" onClick={() => setOpen(!open)} >
            {open ? <KeyboardArrowUpOutlined style={tableCellSx} /> : <KeyboardArrowDownOutlined style={tableCellSx} />}

          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" style={tableCellSx}>
          {row.date}
        </TableCell>

        <TableCell style={tableCellSx} align="right">
          ${row.totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </TableCell>

        <TableCell style={tableCellSx} align="right">
          ${row.overDueAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </TableCell>

        <TableCell style={tableCellSx} align="right">
          ${row.paiedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </TableCell>

        <TableCell style={tableCellSx} align="right">
          {row.status}
        </TableCell>

      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: "none" }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, width: "500px" }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ color: "white" }}>
                Payments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={tableCellSx}>TID</TableCell>
                    <TableCell style={tableCellSx}>Date</TableCell>
                    <TableCell style={tableCellSx} align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.repayments.map((repayment, index) => (
                    <TableRow key={index}>
                      <TableCell style={tableCellSx}>{repayment.repaymentId.toFixed(0)}</TableCell>
                      <TableCell style={tableCellSx}>{repayment.transactionDate} {repayment.transactionTime}</TableCell>
                      <TableCell style={tableCellSx} align="right">{repayment.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function BillingPageCustomerView() {
  const [billingData] = useBilling()

  const [tab, setTab] = React.useState(tabValues.all);

  const handleMakePayment = () => { };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <div>
      <SideNavBar />
      <div>
        <Box
          sx={{
            marginLeft: "36%",
            marginTop: "6%",
            width: "40%",
            bgcolor: "#f7ad19",
            borderRadius: "5px",
            textDecorationColor: "white",
          }}
        >
          <Tabs value={tab} onChange={handleChange} centered>
            <Tab label="All" value={tabValues.all} />
            <Tab label="Upcoming" value={tabValues.upcomming} />
            <Tab label="Overdue" value={tabValues.overdue} />
            <Tab label="Paid" value={tabValues.paid} />
          </Tabs>
        </Box>
      </div>
      <Grid>
        <div className="transaction-history-div">
          <h3>Billing</h3>

          <div className="table-div">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={tableCellSx} />
                  <TableCell style={tableCellSx}>Billing Period</TableCell>
                  <TableCell style={tableCellSx} align="right">Total Amount</TableCell>
                  <TableCell style={tableCellSx} align="right">Overdue fees</TableCell>
                  <TableCell style={tableCellSx} align="right">Amount Paid</TableCell>
                  <TableCell style={tableCellSx} align="right">Status</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {billingData.filter(data => data.status.toUpperCase().includes(tab))
                  .map((value: typeof CardPaymentPeriodDTO, index: number) => (
                    <Row key={index} row={value} />
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default BillingPageCustomerView;
