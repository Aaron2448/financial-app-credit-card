import React, { useEffect } from "react";
import { Routes, Route, Router } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FAQPage from "./pages/FAQPage";
import DashboardHomePage from "./pages/DashboardHomePage";
import NewApplicationFormPage from "./pages/NewApplicationFormPage";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import RegisterFailurePage from "./pages/RegisterFailurePage";
import LoginFailurePage from "./pages/LoginFailurePage";
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import TransactionsPage from "./pages/TransactionsPage";
import BillingPage from "./pages/BillingPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SettingsPage";
import MakePaymentPage from "./pages/MakePaymentPage";
import OneAppPerCustomerPage from "./pages/OneAppPerCustomerPage";
import PaymentSuccessfulPage from "./pages/PaymentSuccessfulPage";
import PaymentUnsuccessfulPage from "./pages/PaymentUnsuccessfulPage";
import SupportTicketLoggedInSuccessfulPage from "./pages/SupportTicketLoggedInSuccessfulPage";
import SupportTicketLoggedInUnsuccessfulPage from "./pages/SupportTicketLoggedInUnsuccessfulPage";
import SupportTicketNotLoggedInSuccessfulPage from "./pages/SupportTicketNotLoggedInSuccessfulPage";
import SupportTicketNotLoggedInUnsuccessfulPage from "./pages/SupportTicketNotLoggedInUnsuccessfulPage";
import EligibilityMessagePage from "./pages/EligibilityMessagePage"
import FAQPage2 from "./pages/page-views/FAQPage"
import { ProfilePage } from "./pages/ProfilePage";
import MyCardDetailsPage from "./pages/MyCardDetailsPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AboutPage from "./pages/AboutPage";
import PasswordResetSuccessPage from "./pages/PasswordResetSuccessPage";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/registerSuccess" element={<RegisterSuccessPage />} />
          <Route path="/registerFailure" element={<RegisterFailurePage />} />
          <Route path="/loginFailure" element={<LoginFailurePage />} />
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/applications" element={<NewApplicationFormPage />} />
          <Route path="/applications/apply"element={<NewApplicationFormPage />}/>
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/billing" element={<BillingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/pay" element={<MakePaymentPage />} />
          <Route path="/service" element={<OneAppPerCustomerPage />} />
          <Route path="/paySuccessful" element={<PaymentSuccessfulPage />} />
          <Route path="/payUnsuccessful" element={<PaymentUnsuccessfulPage />} />
          <Route path="/supportTicketLoggedInSuccess" element={<SupportTicketLoggedInSuccessfulPage />} />
          <Route path="/supportTicketLoggedInFailure" element={<SupportTicketLoggedInUnsuccessfulPage />} />
          <Route path="/supportTicketNotLoggedInSuccess" element={<SupportTicketNotLoggedInSuccessfulPage />} />
          <Route path="/supportTicketNotLoggedInFailure" element={<SupportTicketNotLoggedInUnsuccessfulPage />} />
          <Route path="/eligibilityMessage" element={<EligibilityMessagePage />} />
          <Route path="/myCard" element={<MyCardDetailsPage />} />
          <Route path="/faq" element={<FAQPage2 />} />
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/passwordReset" element={<ResetPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resetSuccess" element={<PasswordResetSuccessPage />} />

        </Routes>
        <Footer />
      </Main>
    </LocalizationProvider>
  );
}

export default App;
