import { useNavigate } from "react-router-dom";
import "../styles/AboutPage.css";
import { useState } from "react";
import CreditCardImg from "../images/howzat-credit-card-shiny.png";


function AboutPage() {
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
    
      <div>
        <title>About Page</title>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="../../styles/FAQPage.css"></link>
      </div>
      <h1 className="about-heading">About Us</h1>
      <div className="about-container">
        <div className="about-body">
          <p className="about-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris in aliquam sem fringilla ut morbi. Nibh tellus molestie nunc non blandit massa. Sem integer vitae justo eget magna fermentum iaculis eu. Mi quis hendrerit dolor magna eget. Etiam tempor orci eu lobortis elementum. Pellentesque adipiscing commodo elit at imperdiet dui accumsan. Nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Vulputate ut pharetra sit amet. Donec adipiscing tristique risus nec feugiat in fermentum posuere. Laoreet suspendisse interdum consectetur libero id faucibus nisl. Erat velit scelerisque in dictum non consectetur a. At volutpat diam ut venenatis tellus in metus vulputate eu. Amet aliquam id diam maecenas ultricies mi eget mauris pharetra. Donec et odio pellentesque diam volutpat commodo. Enim nunc faucibus a pellentesque. Eget felis eget nunc lobortis.</p>
          <br/>
          <p className="about-body">Nulla facilisi cras fermentum odio eu feugiat pretium. Maecenas sed enim ut sem viverra aliquet. Elit sed vulputate mi sit amet mauris. Id velit ut tortor pretium viverra suspendisse potenti nullam. Semper viverra nam libero justo. Congue quisque egestas diam in arcu cursus euismod. Justo laoreet sit amet cursus sit amet dictum sit. At tempor commodo ullamcorper a lacus vestibulum sed arcu. Eu facilisis sed odio morbi quis commodo odio. Tempor nec feugiat nisl pretium fusce id. Amet cursus sit amet dictum sit amet. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Diam maecenas ultricies mi eget mauris. Amet volutpat consequat mauris nunc. Vestibulum lorem sed risus ultricies tristique. Vivamus at augue eget arcu dictum varius duis at consectetur. Lectus nulla at volutpat diam ut venenatis tellus. Lectus mauris ultrices eros in cursus turpis massa tincidunt.</p>
          <br/>
          <p className="about-body">Lacinia at quis risus sed. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Ultricies mi eget mauris pharetra et ultrices neque. Tempus egestas sed sed risus pretium quam vulputate. Et pharetra pharetra massa massa ultricies mi quis. Euismod in pellentesque massa placerat duis ultricies lacus. Ut faucibus pulvinar elementum integer. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Dui ut ornare lectus sit amet. Ultrices sagittis orci a scelerisque purus semper eget duis. Tellus elementum sagittis vitae et leo duis ut diam. Neque volutpat ac tincidunt vitae semper quis lectus nulla. Neque convallis a cras semper. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Aliquam sem et tortor consequat. Magna sit amet purus gravida quis blandit turpis cursus. Nunc id cursus metus aliquam eleifend mi in. Enim ut tellus elementum sagittis vitae et.</p>
        </div>
        <div className="card-img-container">
          <img
              className="about-card-img"
              src={CreditCardImg}
              alt="An image of the Howzart credit card"
            />
        </div>
      </div>
    </div>
  );
}
export default AboutPage;
