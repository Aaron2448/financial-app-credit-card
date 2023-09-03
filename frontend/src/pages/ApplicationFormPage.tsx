import { ReactNode, useState } from "react";
import { Formik, Form } from "formik";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import SideNavBar from "../components/SideNavBar";
import TextField from "../components/form-components/TextFieldWrapper";
import Select from "../components/form-components/SelectWrapper";
import countries from "../data/countries.json";
import states from "../data/states.json";
import employmentStatus from "../data/employmentStatus.json";
import employmentTypes from "../data/employmentTypes.json";
import Button from "../components/Button";
import "../css/pages-css/ApplicationFormPage.sass";

/**
 *  This page is currently in progress.
 *  For simplicity and time, formik may not need to be used if it is too difficult to
 *  handle the form validation
 */

const sections = [
  "Address",
  "Identification checks",
  "Occupation",
  "Income",
  "Expenses",
  "Assets",
  "Review details",
  "Outcome",
];

// const createNewAddressPayload = {
//   street: "",
//   city: "",
//   state: "",
//   zip: "",
//   dateMovedIn: "",
// };

// const createNewOccupationPayload = {
//   description: "",
//   occupationType: "",
//   salary: ""
// };

// const createNewAttributePayload = {
//   description: "",
//   amount: 0,
//   frequency: "",
//   type:""
// }

const addressInitialFormState = {
  isAustralianPROrCitizen: false,
  country: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  yearsAtCurrentAddress: 0,
  monthsAtCurrentAddress: 0,
  isResidentialAddressDifferentFromMailingAddress: false,
  homeOwnershipOption: "",
};

const identificationChecksInitialFormState = {
  passport: null,
  proofOfAge: null,
  proofOfAddress: null,
};

const occupationInitialFormState = {
  occupationStatus: "",
  occupationType: "",
  currentEmployerCompanyName: "",
  employerAddressCountry: "",
  employerAddressStreet: "",
  employerAddressCity: "",
  employerAddressState: "",
  employerAddressZip: "",
  yearsAtCurrentOccupation: 0,
  monthsAtCurrentOccupation: 0,
};

const generateYears = () => {
  const myObject: { [index: number]: number } = {};
  for (var i = 0; i <= 100; ++i) {
    myObject[i] = i;
  }
  return myObject;
};

const generateMonths = () => {
  const myObject: { [index: number]: number } = {};
  for (var i = 0; i <= 12; ++i) {
    myObject[i] = i;
  }
  return myObject;
};

function ApplicationFormPage() {
  const [activeSection, setActiveSection] = useState(0);

  const [isAustralianPROrCitizen, setIsAustralianPROrCitizen] = useState(false);
  const [isMailingAddressDifferent, setIsMailingAddressDifferent] =
    useState(false);
  const [homeOwnershipOption, setHomeOwnershipOption] = useState("");

  const handleNextSection = (): void => {
    setActiveSection((previousActiveSection) => previousActiveSection + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleBackSection = (): void => {
    setActiveSection((previousActiveSection) => previousActiveSection - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const renderAddressForm = (): ReactNode => {
    const handleSetIsAustralianPROrCitizen = (
      event: React.MouseEvent<HTMLElement>,
      newIsAustralianPROrCitizen: boolean
    ) => {
      setIsAustralianPROrCitizen(newIsAustralianPROrCitizen);
    };

    const handleSetIsMailingAddressDifferent = (
      event: React.MouseEvent<HTMLElement>,
      newIsMailingAddressDifferent: boolean
    ) => {
      setIsMailingAddressDifferent(newIsMailingAddressDifferent);
    };

    const handleSetHomeOwnershipOption = (
      event: React.MouseEvent<HTMLElement>,
      newHomeOwnerShipOption: string
    ) => {
      setHomeOwnershipOption(newHomeOwnerShipOption);
    };

    return (
      <Formik
        initialValues={{ ...addressInitialFormState }}
        validationSchema={null}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h2 className="address-form-h">Address</h2>
            </Grid>
            <Grid item xs={12}>
              <h2 className="residency-status-h">Residency status</h2>
              <p className="residency-status-question-p">
                Are you an <b>Australian Permanent Resident</b> or{" "}
                <b>Citizen?</b>
              </p>
              <ToggleButtonGroup
                color="warning"
                value={isAustralianPROrCitizen}
                exclusive
                onChange={handleSetIsAustralianPROrCitizen}
                fullWidth
              >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <h2 className="residencial-address-h">Residential address</h2>
              <p className="residencial-country-question-p">
                Please select your <b>country of residence</b>.
              </p>
              <Select name="country" label="Country" options={countries} />
            </Grid>
            <Grid item xs={12}>
              <p>
                Please enter your <b>residential address</b>.
              </p>
              <TextField name="street" label="Street" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="city" label="City" />
            </Grid>
            <Grid item xs={4}>
              <Select name="state" label="State" options={states} />
            </Grid>
            <Grid item xs={4}>
              <TextField name="zip" label="Zip code" />
            </Grid>
            <Grid item xs={12}>
              <p>How long have you lived at this address?</p>
            </Grid>
            <Grid item xs={6}>
              <Select
                name="yearsAtCurrentAddress"
                label="Years"
                options={generateYears()}
              />
              {/* <TextField
                name="yearsAtCurrentAddress"
                label="Years"
                type="number"
              /> */}
            </Grid>
            <Grid item xs={6}>
              <Select
                name="monthsAtCurrentAddress"
                label="Months"
                options={generateMonths()}
              />
              {/* <TextField
                name="monthsAtCurrentAddress"
                label="Months"
                type="number"
              /> */}
            </Grid>
            <Grid item xs={12}>
              <p>
                Is the above address different from your <b>mailing address</b>?
              </p>
              <ToggleButtonGroup
                color="warning"
                value={isMailingAddressDifferent}
                exclusive
                onChange={handleSetIsMailingAddressDifferent}
                fullWidth
              >
                <ToggleButton value={true}>Yes</ToggleButton>
                <ToggleButton value={false}>No</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <p>Select the home ownership option that best applies to you.</p>
              <ToggleButtonGroup
                color="warning"
                value={homeOwnershipOption}
                exclusive
                onChange={handleSetHomeOwnershipOption}
                fullWidth
                size="small"
              >
                <ToggleButton value="Home owner with mortgage">
                  Home owner with mortgage
                </ToggleButton>
                <ToggleButton value="Home owner">Home owner</ToggleButton>
                <ToggleButton value="Renting">Renting</ToggleButton>
                <ToggleButton value="Other">Other</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={6}>
              <Button
                width="100%"
                backgroundcolour="#f53134"
                colour="white"
                hoverbackgroundcolour="#f76365"
                hovercolour="white"
                margintop="20px"
                onClick={() => (window.location.href = "/applications")}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button width="100%" margintop="20px" onClick={handleNextSection}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    );
  };

  const renderIdentificationCheckForm = (): ReactNode => {
    return (
      <Formik
        initialValues={{ ...identificationChecksInitialFormState }}
        validationSchema={null}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h2 className="identification-form-h">Identification checks</h2>
            </Grid>
            <Grid item xs={12}>
              <p>Upload the following documents to verify your identity</p>
              <li key="passport">
                Australian or foreign <b>passport</b>
              </li>
              <li key="proofOfAge">
                <b>Proof of age document</b>
              </li>
              <li key="proofOfAddress">
                Utility bill or other <b>proof of address</b>
              </li>
            </Grid>
            <Grid item xs={12}>
              <p>
                Upload <b>passport</b> document
              </p>
              <TextField name="passport" label="" type="file" />
              {/* <input name="passport" type="file" /> */}
            </Grid>
            <Grid item xs={12}>
              <p>
                Upload <b>proof of age</b> document
              </p>
              <TextField name="proofOfAge" label="" type="file" />
            </Grid>
            <Grid item xs={12}>
              <p>
                Upload <b>proof of address</b> document
              </p>
              <TextField name="proofOfAddress" label="" type="file" />
            </Grid>
            <Grid item xs={6}>
              <Button
                width="100%"
                backgroundcolour="#f53134"
                colour="white"
                hoverbackgroundcolour="#f76365"
                hovercolour="white"
                margintop="20px"
                onClick={handleBackSection}
              >
                Previous
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button width="100%" margintop="20px" onClick={handleNextSection}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    );
  };

  const renderOccupationForm = (): ReactNode => {
    return (
      <Formik
        initialValues={{ ...addressInitialFormState }}
        validationSchema={null}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <h2 className="occupation-form-h">Occupation</h2>
            </Grid>
            <Grid item xs={12}>
              <p>
                Please select your <b>employment status</b>
              </p>
              <Select
                name="occupationStatus"
                label="Employment status"
                options={employmentStatus}
              />
            </Grid>
            <Grid item xs={12}>
              <p>
                Please select your <b>employment type</b>
              </p>
              <Select
                name="occupationType"
                label="Employment type"
                options={employmentTypes}
              />
            </Grid>
            <Grid item xs={12}>
              <h2 className="occupation-address-h">
                Current employment address
              </h2>
              <p className="occupation-country-question-p">
                Please select your <b>country of residence</b>.
              </p>
              <Select
                name="employerAddressCountry"
                label="Country"
                options={countries}
              />
            </Grid>
            <Grid item xs={12}>
              <p>
                Please enter your <b>company address</b>.
              </p>
              <TextField name="employerAddressStreet" label="Street" />
            </Grid>
            <Grid item xs={4}>
              <TextField name="employerAddressCity" label="City" />
            </Grid>
            <Grid item xs={4}>
              <Select
                name="employerAddressState"
                label="State"
                options={states}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField name="employerAddressZip" label="Zip code" />
            </Grid>
            <Grid item xs={12}>
              <p>How long have you lived at this address?</p>
            </Grid>
            <Grid item xs={6}>
              <Select
                name="yearsAtCurrentOccupation"
                label="Years"
                options={generateYears()}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="monthsAtCurrentOccupation"
                label="Months"
                options={generateMonths()}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                width="100%"
                backgroundcolour="#f53134"
                colour="white"
                hoverbackgroundcolour="#f76365"
                hovercolour="white"
                margintop="20px"
                onClick={handleBackSection}
              >
                Previous
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button width="100%" margintop="20px" onClick={handleNextSection}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    );
  };

  return (
    <>
      <SideNavBar />
      <h1 className="top-header">Credit card application</h1>
      <Grid container>
        <Grid item xs={2}>
          <div className="form-sections-list">
            {sections.map((section, index) => (
              <ul
                key={section}
                className={
                  activeSection === index
                    ? "form-section-ul-highlighted"
                    : "form-section-ul"
                }
              >
                {section}
              </ul>
            ))}
          </div>
        </Grid>
        <Grid item xs={10}>
          <Container maxWidth="sm" className="form-container">
            {activeSection === 0 && renderAddressForm()}
            {activeSection === 1 && renderIdentificationCheckForm()}
            {activeSection === 2 && renderOccupationForm()}
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default ApplicationFormPage;
