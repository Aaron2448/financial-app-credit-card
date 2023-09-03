import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

/*
  Some property names aren't written in camel case because React
  does not recognize some names as a prop on a DOM element. The
  workaround to using some of these names as a custom attribute
  is to spell it as lowercase.
*/
interface Props {
  display?: string;
  colour?: string;
  backgroundcolour?: string;
  hovercolour?: string;
  hoverbackgroundcolour?: string;
  borderradius?: string;
  fontWeight?: string;
  fontSize?: string;
  width?: string;
  textalign?:
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
  marginleft?: string;
  margintop?: string;
  padding?: string;
  onClick?: () => void;
}

const Button = styled(MuiButton)(
  ({
    display,
    colour = "#17181d",
    backgroundcolour = "#f7ad19",
    hovercolour = "#17181d",
    hoverbackgroundcolour = "#fcd9b8",
    borderradius = "7px",
    fontWeight = "bold",
    fontSize,
    width,
    textalign = "center",
    marginleft,
    margintop,
    padding,
    onClick,
  }: Props) => ({
    display: display,
    color: colour,
    backgroundColor: backgroundcolour,
    borderRadius: borderradius,
    fontWeight: fontWeight,
    fontSize: fontSize,
    textTransform: "none",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
    width: width,
    textAlign: textalign,
    marginLeft: marginleft,
    marginTop: margintop,
    padding: padding,
    "&:hover": {
      color: hovercolour,
      backgroundColor: hoverbackgroundcolour,
    },
  })
);

export default Button;
