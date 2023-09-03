import SideNavBar from "../../components/SideNavBar";
import { ReactNode, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "../../components/Button";
import "../../styles/SettingsPage.css";
import SecuritySection from "./SecuritySection";
import { PersonalDetailsSection } from "./PersonalDetailsSection";

const sections = [
  "Personal Details",
  "Personal Contact details",
  "Tax File Number",
  "Tax Residency",
  "Security",
  "Sign In",
  "Daily Limit",
];

const renderSwitch = (index:any) => {
  switch(index){
    case 0:
      return <PersonalDetailsSection />;
    case 1:
      return <Container maxWidth="sm" className="form-container">Personal Contact details</Container>;
    case 2:
      return <Container maxWidth="sm" className="form-container">Tax File Number</Container>;
    case 3:
      return <Container maxWidth="sm" className="form-container">Tax Residency</Container>;
    case 4:
      return <SecuritySection/>;
    case 5:
      return <Container maxWidth="sm" className="form-container">Sign In</Container>;
    case 6:
      return <Container maxWidth="sm" className="form-container">Daily Limit</Container>;
  }
}

function SettingsPageCustomerView() {
  const [activeSection, setActiveSection] = useState(0);
  return (
    <div>
      <SideNavBar />
      <h1 className="settings-top-header">Settings</h1>
      <Grid container sx={{marginLeft: "15rem", marginRight: "15rem", columnGap:"3rem", width:"unset"}}>
        <Grid item sx={{flexBasis:"max-content"}}>
          <div className="button-settings">
            {sections.map((section, index) => (
                  <Button key={section} className="button-individual" onClick={() => {setActiveSection(index)}}>
                    {section}
                  </Button>
            ))}
          </div>
        </Grid>
        <Grid item sx={{flexGrow:0.5}}>
          {renderSwitch(activeSection)}
        </Grid>
      </Grid>
    </div>
  );
}

export default SettingsPageCustomerView;
