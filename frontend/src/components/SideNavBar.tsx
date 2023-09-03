import { useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import {ReceiptLong, Payments, Task, SupportAgent, Settings} from "@mui/icons-material";
import "../css/components-css/SideNavBar.sass";

function SideNavBar() {
  const location = useLocation();

  const sideNavBarContent = [
    {
      icon: <HomeIcon fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "Dashboard",
    },
    {
      icon: <ReceiptLong fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "Billing",
    },
    {
      icon: <Payments fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "Transactions",
    },
    {
      icon: <Task fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "Applications",
    },
    {
      icon: <SupportAgent fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "Support",
    },
    {
      icon: <Settings fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "Settings",
    },
    {
      icon: <Settings fontSize="large" sx={{ color: "#f7ad19" }} />,
      section: "MyCard",
    }
  ];

  function pageRouteMatchesSideBarElement(contentSection: string): boolean {
    // location.pathname returns "/dashboard" so we call the substring method to return
    // the string after the forward slash
    // return contentSection.toLowerCase() === location.pathname.substring(1);
    return location.pathname
      .substring(1)
      .includes(contentSection.toLowerCase());
  }

  return (
    <div className="side-nav-bar">
      {sideNavBarContent.map((content) => (
        <ul
          key={content.section}
          className={
            pageRouteMatchesSideBarElement(content.section)
              ? "side-nav-bar-ul-highlighted"
              : "side-nav-bar-ul"
          }
        >
          <a href={"/" + content.section.toLowerCase()}>
            {content.icon}
            <span className="side-nav-bar-span">{content.section}</span>
          </a>
        </ul>
      ))}
    </div>
  );
}

export default SideNavBar;
