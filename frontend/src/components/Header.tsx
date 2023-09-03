import Button from "../components/Button";
import Logo from "../images/howzat-logo.png";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import "../css/components-css/Header.css";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function LoggedInHeader(userName: string | null) {
  const navigate = useNavigate();
  return (
    <>
     
        <Link className="logo-link" to="/">
          <img
            className="howzart-logo"
            src={Logo}
            alt="The Howzart company logo"
          />
        </Link>
       <div className="logged-in-buttons">
          <div className="button-group-logged-in">
            <Link to="/about">About us</Link>
            <Link to="/data-privacy">Data & Privacy</Link>
            <Button onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          </div>
          <div className="user-name-dropdown">
            <h2 className="user-name-dropdown-h">{userName}</h2>
            <div className="user-name-dropdown-content">
              <a
                href="/"
                onClick={() => {
                  localStorage.removeItem("loggedIn")
                  localStorage.removeItem("email")
                  localStorage.removeItem("name")
                  localStorage.removeItem('token')
                  localStorage.removeItem('id')
                }}
              >
                Log out
              </a>
              <Link to="/profilePage">Profile</Link>
            </div>
            <ArrowDropDownCircleIcon
              fontSize="large"
              sx={{
                color: "#f7ad19"
              }}
            />
          </div>
      </div>
    </>
  );
}

function DefaultHeader() {
  const navigate = useNavigate();

  return (
    <>
      <Link className="logo-link" to="/">
        <img
          className="howzart-logo"
          src={Logo}
          alt="The Howzart company logo"
        />
      </Link>
      <div className="button-group">
        <a href="/about">About us</a>
        <a href="/faqs">FAQs</a>
        <a href="/data-privacy">Data & Privacy</a>
        <a href="/support">Support</a>
        <Button onClick={() => navigate("/login")}>
          Log in
        </Button>
        <Button onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </div>
    </>
  );
}

function Header() {
  const [name, setName] = useState('');

  const isTokenExpired = async () => {
    const ISJWTEXPIRED_API_CALL = 'http://localhost:3309/api/userInfo/tokenExpiration'
    const jwtToken = localStorage.getItem("token");
    try {
      const response = await fetch(ISJWTEXPIRED_API_CALL + "?token=" + jwtToken, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*" 
        }
      })
      if (response.ok) {
        const data = await response.json();
        if (data == true) {
          // Redirect to loginPage
          window.location.href = '/login';
          // Token has expired, perform logout and clear local storage
          localStorage.removeItem("loggedIn");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          localStorage.removeItem('token');
          localStorage.removeItem('id');
        } else {
          console.log("Token valid");
          return (false);
        }
      }
    } catch (error) {
      console.error('Error checking token expiration:', error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem("token")){
      isTokenExpired();
    }
    const LocalStorageName = localStorage.getItem("name");
    if (LocalStorageName !== null) {
      setName(LocalStorageName)
    }

  }, []);
	
  return (
    <header className="header">
      {/* Once we set up login functionality and can retrieve a logged in user's name, we render the appropriate header */}
      {localStorage.getItem('token')
        ? LoggedInHeader(localStorage.getItem('name'))
        : DefaultHeader()}
    </header>
  );
}

export default Header;

