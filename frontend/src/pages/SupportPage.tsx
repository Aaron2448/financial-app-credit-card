import SupportPageCustomerNotLoggedInView from "./page-views/SupportPageCustomerNotLoggedInView";
import SupportPageCustomerLoggedInView from "./page-views/SupportPageCustomerLoggedInView";
import "../styles/SupportPage.css";

function SupportPage() {
  if(localStorage.getItem("token") === null){
    console.log(localStorage.getItem("token"))
    return <SupportPageCustomerNotLoggedInView />;
  }
  
  console.log(localStorage.getItem("token"))
  return <SupportPageCustomerLoggedInView/>;
}
export default SupportPage;
