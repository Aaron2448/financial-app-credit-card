import SideNavBar from "../../components/SideNavBar";
import Button from "../../components/Button";

function ApplicationsPageCustomerView() {
  return (
    <>
      <SideNavBar />
      <div>
        <Button
          onClick={() => (window.location.href = "/applications/apply")}
          marginleft="25%"
          margintop="10%"
          width="300px"
          fontWeight="bold"
          fontSize="18px"
          padding="20px"
        >
          Apply for a new credit card
        </Button>
      </div>
    </>
  );
}

export default ApplicationsPageCustomerView;
