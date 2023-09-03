import { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


function RepaymentDueDateButton() {
    const navigate = useNavigate();

    const [repaymentInfo, setRepaymentInfo] = useState({
        amount: "0.00",
        dueDate: "-",
        overDue: false,
        owedName: ""
    })

    const loadData = async () => {
        const url = "http://localhost:3309/api/repayment";
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        try {
            const response = await fetch(url, requestOptions)

            if (response.ok) {
                const data = await response.json()

                // Formatting amount
                let amount = data.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })

                const fixedData = { ...data, amount: amount }

                setRepaymentInfo(fixedData)
            }
            else {
                console.log(response)
            }

        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const onButtonClick = () => {
        const amount: number = +repaymentInfo.amount.replace(",", "");
        const name = repaymentInfo.owedName.trim();

        if (name.length !== 0 && amount > 0) {
            navigate("../pay", {state: {name: repaymentInfo.owedName, amount: amount}})
        }
    }

    return (
        <>
            <Button
                display="block"
                colour="white"
                backgroundcolour="#17181d"
                hovercolour="#17181d"
                hoverbackgroundcolour="#f7ad19"
                borderradius="20px"
                fontWeight="normal"
                width="60%"
                marginleft="50%"
                margintop="14.5%"
                onClick={onButtonClick}
            >
                <h3>Repayment Period</h3>
                {repaymentInfo.overDue ?
                    <h2 style={{ color: "red" }}>
                        {repaymentInfo.dueDate}
                    </h2>
                    :
                    <h2>
                        {repaymentInfo.dueDate}
                    </h2>
                }
                <p>
                    Amount: <b>${repaymentInfo.amount}</b>
                </p>
            </Button>
        </>
    )

}


export default RepaymentDueDateButton;