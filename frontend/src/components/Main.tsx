import { ReactNode } from "react";
import "../css/components-css/Main.css";

interface Props {
  children: ReactNode;
}

function Main({ children }: Props) {
  return <div className="main-body">{children}</div>;
}

export default Main;
