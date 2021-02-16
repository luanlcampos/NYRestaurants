import {
  Card,
  Container,
  ListGroup,
  Jumbotron,
  Row,
  Col,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { GitHub, LinkedIn } from "@material-ui/icons";
import "./About.css";
import bgimage from "./public/jumbotron-bg.jpg";

export default function About() {
  document.title = "About me";
  return (
    <div className="mt-2 abt-page">
      <Jumbotron className="jumb-bg">
        <Container>
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
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>System Manager</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Keywords: Node.js, Express.js, Handlebars.js, MongoDB, PostgreSQL
            </Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Experienced front-end template engine (in particular,
                handlebar.js), as demonstrated when I was designing and building
                an MVC application for a company to control its departments and
                employees records
              </ListGroup.Item>
              <ListGroup.Item>
                DEstablished a system that allows user to add and delete
                departments and employees
              </ListGroup.Item>
              <ListGroup.Item>
                Created a SQL database using PostgreSQL to hold departments and
                employees tables
              </ListGroup.Item>
              <ListGroup.Item>
                Designed a login and register system using MongoDB and utilizing
                a password hashing tool (bcrypt.js) to encrypt the password
                before sending it to the server
              </ListGroup.Item>
              <ListGroup.Item>
                Developed a dynamic system that accepts image uploading and form
                submission usingnode.js middlewares as body-parser and multer
              </ListGroup.Item>
            </ListGroup>
            <Card.Link href="https://mysystemmanager.herokuapp.com/">
              Heroku Link
            </Card.Link>
          </Card.Body>
        </Card>
        <Card className="mt-2">
          <Card.Body>
            <Card.Title>Pasta Chef</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Keywords: Node.js, Express.js, Handlebars.js, MongoDB, MVC
            </Card.Subtitle>
            <ListGroup variant="flush">
              <ListGroup.Item>
                Created a dynamic web application which allows user to register,
                login and select a meal plan for the week
              </ListGroup.Item>
              <ListGroup.Item>
                Implemented a MongoDB connection to hold the user data and meals
                data departments and employees
              </ListGroup.Item>
              <ListGroup.Item>
                Experienced front-end designing while developing a user
                interface with Bootstrap, CSSand JavaScript for creating modal
                pop-ups for login, register and meal addition form
              </ListGroup.Item>
              <ListGroup.Item>
                Designed a login and register system using MongoDB and utilizing
                a password hashing tool (bcrypt.js) to encrypt the password
                before sending it to the server
              </ListGroup.Item>
            </ListGroup>
            <Card.Link href="https://pasta-chef.herokuapp.com/">
              Heroku Link
            </Card.Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
