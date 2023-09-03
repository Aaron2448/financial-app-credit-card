import { Alert, Button, Container, Grid, IconButton, Snackbar, TextField } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Form } from "formik";
import { useEffect, useState } from "react"
import "../../styles/SecuritySection.css"

const CopyToClipboardButton = ({recovery} : { recovery: Array<number> }) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        let codes = "";

        for (let i = 0; i < recovery.length; i++) {
            console.log(recovery[i].toString())
            codes = codes + " \n" + recovery[i].toString();
        }

        setOpen(true)
        console.log(codes)
        navigator.clipboard.writeText(codes);
    }
    
    return (
        <>
        <IconButton onClick={handleClick} color="primary">
            <ContentCopyIcon/>
        </IconButton>
        <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
            sx={{position:"absolute", top:'0%', left:'50% !important', bottom:"unset !important", right:"unset !important", transform: 'translate(-50%, -50%)'}}
        />
        </>
    )
}

function SecuritySection() {

    const [ qrCode , setQrCode ] = useState("");
    const [ start , setStart ] = useState(0);
    const [ deactive , setDeactive] = useState<boolean>();
    const [ code , setCode ] = useState();
    const [valid, setValid] = useState(true);
    const [recovery, setRecovery] = useState<Array<number>>([]);
    const [customerDetails, setCustomerDetails] = useState<{[key: string]: any}>({});
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmNewPassword, setConfirmNewPassword ] = useState("");

    const UPDATEPASSWORD_API_CALL = 'http://localhost:3309/api/userInfo/updatePassword';
    const GENERATE_QR_API_CALL = 'http://localhost:3309/api/code/generate/'
    const VALIDATE_CODE_API_CALL = 'http://localhost:3309/api/code/validate/key'
    const RECOVERY_CODE_API_CALL = 'http://localhost:3309/api/code/scratches/'
    const VALIDATE_RECOVERY_API_CALL = 'http://localhost:3309/api/code/scratches'
    const CUSTOMER_INFO_API_CALL = 'http://localhost:3309/api/userInfo/getProfile'

    useEffect(() => {
        getCustomerDetails();
    }, []);

    const getCustomerDetails = () => {
        fetch(CUSTOMER_INFO_API_CALL, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(async(response) => {
            const data = await response.json();
            setCustomerDetails(data);
        })
        .catch((error) => {
            console.log(error);
            window.location.href = "/login";
        })
    };

    const getQrCode = async () => {
        try {
            const response = await fetch(GENERATE_QR_API_CALL + customerDetails.email, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                }
            });

            if (response.ok) {
                response.blob().then((blob) => {
                        setQrCode(URL.createObjectURL(blob));
                })
            } else {
                
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmitAuth = async (event: any) => {

        event.preventDefault();

        const ValidatePayload = {
            username: customerDetails.email,
            code: code,
        };

        try {
            const response = await fetch(VALIDATE_CODE_API_CALL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                },
                body: JSON.stringify(ValidatePayload)
            });

            if (response.ok) {
                response.blob().then((blob) => {
                    blob.text()
                            .then(value => {
                               let passed = JSON.parse(value).valid;

                               setValid(passed);

                               if(passed) {
                                    setStart(2);
                                    getRecoveryCodes();
                                    setCode(undefined);
                               }

                             })
                             .catch(error => {
                               console.log("Something went wrong" + error);
                             });

                })
            } else {
                
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getRecoveryCodes = async () => {

        try {
            const response = await fetch(RECOVERY_CODE_API_CALL + customerDetails.email, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                }
            });

            if (response.ok) {
                response.blob().then((blob) => {
                    blob.text()
                        .then(value => {
                            setRecovery(JSON.parse(value));
                        })
                        .catch(error => {
                            console.log("Something went wrong" + error);
                        });
                })
            } else {
                
            }
        } catch (error) {
            console.error(error);
        }

    }

    const handleDeactive = async (event:any) => {
        
        event.preventDefault();

        const ValidatePayload = {
            username: customerDetails.email,
            code: code,
        };

        try {
            const response = await fetch(VALIDATE_RECOVERY_API_CALL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
                },
                body: JSON.stringify(ValidatePayload)
            });

            if (response.ok) {
                response.blob().then((blob) => {
                    blob.text()
                            .then(value => {
                               let passed = JSON.parse(value).valid;

                               setValid(passed);

                               if(passed) {
                                    setStart(0);
                                    getCustomerDetails();
                                    setCode(undefined);
                               }

                             })
                             .catch(error => {
                               console.log("Something went wrong" + error);
                             });

                })
            } else {
                
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const handleSubmit = (password: string, confirmPassword: string) => {
        if(password == confirmPassword && password != ""){
            const userPayload = {
                id: localStorage.getItem("id"),
                password: password
            };

            fetch(UPDATEPASSWORD_API_CALL, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*" 
            },
                body: JSON.stringify(userPayload),
            })
                .then(async(data) => {
                    const response = await data.text();
                    window.alert("Successfully changed password");
                
                })
                .catch((error) => console.log(error));
            console.log("Payload: ", JSON.stringify(userPayload));
        } else {
            window.alert("Can not change password. Password must not be empty and must match confirm password");
        }
    }

    return (
        <Container maxWidth="sm" className="form-container" sx={{minHeight:"200px"}}>
            <h2 className="security-header">Security</h2>
            <div className="twoFA-wrapper">
            <h3>2 Factor Authentication</h3>
            {customerDetails.use2FA === true ?
                <>
                    {deactive ?
                    <>
                        <p>To Deactive 2FA, please enter a recovery code </p>
                        <form className="twoFA-form" onSubmit={handleDeactive}>
                            <TextField type="tel" name="Code" label="Code" value={code} onChange={(e:any) => {setCode(e.target.value)}}></TextField>
                            <Button color="error" type="submit" variant="contained" className="security-buttons">Deactivate</Button>
                        </form>
                    </>
                    :
                    <>
                        <p>You are currently using 2-Factor Authentication</p>
                        <Button color="error" variant="contained" className="security-buttons" onClick={() => setDeactive(true)}>Deactivate</Button>
                    </>
                    }
                </>
            :customerDetails.use2FA === false ?
                <>
                    {start === 0 ? 
                    <>
                        <p>Set up your 2-Factor Authenitication for stronger protection</p>
                        <Button variant="contained" className="security-buttons" onClick={() => {getQrCode(); setStart(1)}}>Set Up</Button>
                    </> 
                    :start === 1 ?
                    <>
                        <p>Scan the QR code with your Google Authenticator App</p>
                        <img src={qrCode}/>

                        <p>Input the 6 digit code below</p>
                        <form className="twoFA-form" onSubmit={handleSubmitAuth}>
                            <TextField type="tel" name="Code" label="Code" value={code} onChange={(e:any) => {setCode(e.target.value)}}></TextField>
                            {valid ? 
                            <></> :
                            <Alert severity="error">
                                <strong>Invalid code try again</strong>
                            </Alert>
                            }
                            <Button type="submit" variant="contained" className="security-buttons">Set Up</Button>
                        </form>
                    </> 
                    :start === 2 ?
                    <>
                        <p>2FA is now activated, Please save the recovery codes below.</p>
                        
                        <div className="recovery-codes">
                        <div className="copy-button">
                            <CopyToClipboardButton recovery={recovery}/>
                        </div>
                        <Grid container columnGap={"1rem"} alignItems={"center"}>
                        {recovery.map((code) => (
                            <Grid item><p>{code}</p></Grid>
                        ))}
                        </Grid>
                        </div>
                        <p>If you would like to deactive 2FA you will need the recovery codes</p>
                        <Button variant="contained" className="security-buttons" onClick={getCustomerDetails}>Done</Button>
                    </>
                    :
                    <>
                    </>
                    }
                </>
            :
                <></>
            }
            </div>
            <div className="change-pass-wrapper">
            <h3>Change Password</h3>
            <div className="password-textfields">
            <TextField
                type="password"
                id="password" 
                name="password" 
                label="Password"
                onChange={(e) => {setNewPassword(e.target.value)}}
            />
             <TextField
                type="password"
                id="confirmPassword" 
                name="confirmPassword" 
                label="Confirm Password"
                onChange={(e) => {setConfirmNewPassword(e.target.value)}}
            />
            </div>
            <Button variant="contained" onClick={() => handleSubmit(newPassword, confirmNewPassword)} style={{marginTop: "1rem", color: "white"}}>Update Password</Button>
            </div>
        </Container>
    )
}

export default SecuritySection