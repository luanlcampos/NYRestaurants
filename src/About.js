
import {  Container, Jumbotron } from "react-bootstrap";
import { motion } from "framer-motion";
import { GitHub, LinkedIn} from "@material-ui/icons";
import "./About.css";
import { projects, MCard } from "./Projects";

export default function About() {
  document.title = "About me";
  document.body.style.background = "#FFFFFF";
  return (
    <div className="abt-page">
      <Jumbotron className="jumb-bg">
        <Container className="mb-auto ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ ease: "easeOut", duration: 2 }}
          >
            <h1>
              Hi, my name is Luan. <br />I am Front End / Back End Developer
              living in Toronto, ON{" "}
            </h1>
          </motion.div>
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://github.com/luanlcampos"}
            >
              <GitHub style={{ fontSize: 35 }} color="primary" />
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={"https://www.linkedin.com/in/luan-campos/"}
            >
              <LinkedIn style={{ fontSize: 41 }} color="primary" />
            </a>
          </p>
        </Container>
      </Jumbotron>
      <Container id="proj">
        <h2 style={{color: '#FFF'}}>Projects</h2>
        <MCard value={projects} />
      </Container>
    </div>
  );
}
