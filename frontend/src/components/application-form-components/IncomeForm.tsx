import React from "react";
import ApplicationAttribrute from "./ApplicationAttribute";

export default function IncomeForm({incomeRequest, setIncomeRequest}: any){
    return(
        <React.Fragment>
            <ApplicationAttribrute type={"Finances"} attributeRequest={incomeRequest} setAttributeRequest={setIncomeRequest}/>
        </React.Fragment>
    );
}