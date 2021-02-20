import { Card, Accordion, ListGroup } from "react-bootstrap";

export const projects = [
  {
    id: 1,
    name: "System Manager",
    keywords: [
      "Node.js",
      "Express.js",
      "Handlebars.js",
      "MongoDB",
      "PostgreSQL",
    ],
    description: [
      "Experienced front-end template engine (in particular, handlebar.js), as demonstrated when I was designing and building an MVC application for a company to control its departments and employees records",
      "Established a system that allows user to add and delete departments and employees",
      "Created a SQL database using PostgreSQL to hold departments and employees tables",
      "Designed a login and register system using MongoDB and utilizing a password hashing tool (bcrypt.js) to encrypt the password before sending it to the server",
      "Developed a dynamic system that accepts image uploading and form submission using express middleware as body-parser and multer",
    ],
    link: "https://mysystemmanager.herokuapp.com/",
  },
  {
    id: 2,
    name: "Pasta Chef",
    keywords: ["Node.js", "Express.js", "Handlebars.js", "MongoDB", "MVC"],
    description: [
      "Created a dynamic web application which allows user to register, login and select a meal plan for the week",
      "Implemented a MongoDB connection to hold the user data and meals data departments and employees",
      "Experienced front-end designing while developing a user interface with Bootstrap, CSSand JavaScript for creating modal pop-ups for login, register and meal addition form",
      "Designed a login and register system using MongoDB and utilizing a password hashing tool (bcrypt.js) to encrypt the password before sending it to the server",
    ],
    link: "https://pasta-chef.herokuapp.com/",
  },
];

export function MCard({ value }) {
  return value.map((item) => (
    <Accordion defaultActiveKey="0">
      <Card className="bg-transparent mt-2 m-card">
        <Accordion.Toggle as={Card.Header} eventKey={item.id}>
          <Card.Title>{item.name}</Card.Title>
          <Card.Subtitle>{item.keywords.join(", ")}</Card.Subtitle>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={item.id}>
          <Card.Body>
            <ListGroup variant="flush" style={{backgroundColor: 'transparent !important'}}>
              {item.description.map((e) => (
                <ListGroup.Item style={{backgroundColor: 'transparent !important'}}>{e}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  ));
}
