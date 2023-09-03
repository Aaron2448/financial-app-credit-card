import DashboardHomePageCustomerView from "./page-views/DashboardHomePageCustomerView";

// Will contain two views - customer dashboard, and staff dashboard
// The view that is rendered depends on the user that is logged in
function DashboardHomePage() {
  return <DashboardHomePageCustomerView />;
}

export default DashboardHomePage;
