import React from "react";
import ApplicationAttribrute from "./ApplicationAttribute";

export default function ExpenseForm({expenseRequest, setExpenseRequest}: any){
    return(
        <React.Fragment>
            <ApplicationAttribrute type={"Expenses"} attributeRequest={expenseRequest} setAttributeRequest={setExpenseRequest} />
        </React.Fragment>
    );
}