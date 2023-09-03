import * as Yup from "yup";
import axios from "axios"
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "../../styles/FAQPage.css";
import { useEffect } from "react";
import { useState } from "react";

function FAQPage() {
  const navigate = useNavigate();
  const [answerVisibility, setAnswerVisibility] = useState(Array(5).fill(false));

  const toggleAnswerVisibility = (index: any) => {
    setAnswerVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  return (
    <div className="support-div">
      <div className="button-group">
        <Button onClick={() => navigate("/support")}>
          Submit a support ticket
        </Button>
      </div>

      <div>
        <title>FAQ Page</title>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="../../styles/FAQPage.css"></link>
      </div>

      <div className="faqBigBody">
        <h1 className="faq-heading">FAQ'S</h1>

        <section className="faq-container">

          <div className="faq-one">
            <h1 className={`faq-page ${
              answerVisibility[0] ? "active" : ""
            }`}
            onClick={() => toggleAnswerVisibility(0)} >How long does the application process take?</h1>
            <div className="faq-body"
            style={{
              display: answerVisibility[0] ? "block" : "none",
            }}>
              <p>
                It should take around 10 minutes to apply if you have all of your personal information handy. If you need to, you can save your partially completed application and continue right where you left off any time within 30 days.
                Once you have submitted your application, you will receive a confirmation email in approximately 60 seconds, containing your application number, and a link which you can use to check the status of your application online. If your application needs further assessment, we’ll advise you when you can expect to hear from us.
                If your application is approved, you should receive your card in 3-5 working days.
              </p>
            </div>
          </div>
          <hr className="hr-line"></hr>

          <div className="faq-two">
            <h1 className={`faq-page ${
              answerVisibility[1] ? "active" : ""
            }`}
            onClick={() => toggleAnswerVisibility(1)}>How do I activate my card?</h1>
            <div className="faq-body"
            style={{
              display: answerVisibility[1] ? "block" : "none",
            }}>
              <p>
                It only takes a minute to activate your card and choose your card PIN online at Howzat app. You wont receive a card PIN in the mail.
                Simply log in to Howzat app anytime, anywhere with your ID number, surname and PIN to access your Howzat card.
                Select your Howzat card and enter your 3-digit CVC number located on the back of your card. You will then be prompted to enter your password which is a combination of letters, numbers and special characters.
                During activation of your card, you will be prompted to create a 4-digit card PIN. You can change your PIN at any time via the Howzat app.
              </p>
            </div>
          </div>
          <hr className="hr-line"></hr>

          <div className="faq-three">
            <h1  className={`faq-page ${
              answerVisibility[2] ? "active" : ""
            }`}
            onClick={() => toggleAnswerVisibility(2)} >How does Howzat protect my Howzat account?</h1>
            <div className="faq-body"
            style={{
              display: answerVisibility[2] ? "block" : "none",
            }}>
              <p>
                There are a number of ways we protect your Howzat account, so you can rest assured that your money is in safe hands.
                With 24/7 fraud protection, we monitor every transaction you make on your Howzat credit card for irregular activity. If a suspicious transaction is detected, we may contact you to take action or may direct you to call us on 13 2222 where we will verify you and your account, and one of our friendly team members will be available to assist you in resolving the problem as soon as possible.
                Please call this number only if youre directed to. For all general enquiries or to report transactions that you dont recognise, please call Howzat card support on 13 2222.
                We also ask you to enter a password when you access features that are considered high risk such as activating your card, choosing your PIN, viewing statements and notices, locking your card or reporting it lost or stolen. This provides an extra layer of security to help protect your account from unauthorised access.
              </p>
            </div>
          </div>
          <hr className="hr-line"></hr>

          <div className="faq-four">
            <h1  className={`faq-page ${
              answerVisibility[3] ? "active" : ""
            }`}
            onClick={() => toggleAnswerVisibility(3)} >What do I do if I receive a suspicious phone call?</h1>
            <div className="faq-body"
            style={{
              display: answerVisibility[3] ? "block" : "none",
            }}>
              <p>
                If someone calls you with a Howzat credit card offer and asks for your personal information, you can call us on 132222 to confirm if the call is genuine. 
                Howzat cardholders can call their Dedicated Concierge using the number found on the back of their card or in the Howzat App.
              </p>
            </div>
          </div>
          <hr className="hr-line"></hr>
    

        </section>
      </div>
        
    </div>
  );
}
export default FAQPage;
