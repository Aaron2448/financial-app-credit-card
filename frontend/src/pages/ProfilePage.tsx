import { useEffect, useState } from "react";
import "../css/pages-css/ProfilePage.css";
import { Button } from "@mui/material";
import customerIcon from "../images/customer-icon.png";
import inboxIcon from "../images/inbox-icon.png";
import rewardsIcon from "../images/rewards-icon.png";
import requestsIcon from "../images/requests-icon.png";
import arrowIcon from "../images/arrow-icon.png";
import SideNavBar from "../components/SideNavBar";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState<{[key: string]: any}>({});
    const CUSTOMER_INFO_API_CALL = 'http://localhost:3309/api/userInfo/getProfile'

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
        })
    };

    useEffect(() => {
        getCustomerDetails();
    }, []);

    const handleShowDetails = () => {
        console.log(customerDetails)
    }

    const handleProfileNavigation = (page: string) => {
        if (page == "settings"){
            navigate("/settings");
        }
    }

    return (
        <div className="profile-page">
            <div className="profile-page-side-navbar">
                <SideNavBar />
            </div>
            <div className="profile-page-contents">
                <div className="profile-page-header-profile">
                    <p style={{fontSize: "2em", color: "white"}}>Profile</p>
                </div>
                <div className="profile-page-header">
                    <div className="profile-page-header-customer">
                        <div className="profile-page-header-customer-icon">
                            <img alt="customIcon" className="profile-page-header-customer-icon-image" src={customerIcon} />
                        </div>
                        <div className="profile-page-header-customer-details">
                            <p style={{fontSize: "2rem"}}>Hello {customerDetails.userFirstname}</p>
                            <p style={{fontSize: "1rem"}}>Customer ID {customerDetails.id}</p>
                        </div>
                    </div>
                </div>
                <div className="profile-page-buttons">
                    <Button onClick={handleShowDetails}><img alt="inboxIcon" className="profile-page-buttons-inbox-icon" src={inboxIcon}/>INBOX</Button>
                    <Button onClick={handleShowDetails}><img alt="rewardsIcon" className="profile-page-buttons-rewards-icon" src={rewardsIcon}/>REWARDS</Button>
                    <Button onClick={handleShowDetails}><img alt="requestsIcon" className="profile-page-buttons-requests-icon" src={requestsIcon}/>REQUESTS</Button>
                </div>
                <div className="profile-page-links">
                    <Button onClick={() => handleProfileNavigation("settings")}>Settings<img alt="arrowIcon" className="profile-page-links-arrow-icon"src={arrowIcon}/></Button>
                    <Button onClick={handleShowDetails}>Documents<img alt="arrowIcon" className="profile-page-links-arrow-icon"src={arrowIcon}/></Button>
                    <Button onClick={handleShowDetails}>Payments<img alt="arrowIcon" className="profile-page-links-arrow-icon"src={arrowIcon}/></Button>
                    <Button onClick={handleShowDetails}>Payees and Billers<img alt="arrowIcon" className="profile-page-links-arrow-icon"src={arrowIcon}/></Button>
                    <Button onClick={handleShowDetails}>Help<img alt="arrowIcon" className="profile-page-links-arrow-icon"src={arrowIcon}/></Button>
                </div>
            </div>
        </div>
    )
}