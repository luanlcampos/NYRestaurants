//React Hooks
import { useState } from "react";
//importing Bootstrap components
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";
//React-router-dom components and hooks
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
//React-router-bootstrap components
import { LinkContainer } from "react-router-bootstrap";
//Custom Components
import Restaurants from "./Restaurants";
import Restaurant from "./Restaurant";
import About from "./About";
import NotFound from "./NotFound";
import StickyFooter from "./Footer";
//Loading Custom CSS
import "./App.css";


function App() {
  const [searchString, setSearchString] = useState("");
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    if(searchString){
      history.push(`/restaurants?borough=${searchString}`);
    }
    setSearchString("");
  }

  return (
    <>
      <Container>
        <Navbar expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand className="m-nav">New York Restaurants</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/restaurants">
                <Nav.Link className="m-nav">Full List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link className="m-nav">About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form onSubmit={handleSubmit} inline>
              <FormControl
                type="text"
                placeholder="Borough"
                className="mr-sm-2"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                style={{ background: "transparent", color: "white" }}
              />
              <Button
                type="submit"
                className="sub-button"
                style={{
                  background: "transparent",
                  color: "#FFF",
                  border: "1px solid #FFF",
                }}
              >
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <Route exact path="/">
            <Redirect to="/Restaurants" />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/Restaurants">
            <Restaurants />
          </Route>
          <Route path="/Restaurant/:id">
            <Restaurant />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Container>
      <StickyFooter className="footer" />

      <br />
    </>
  );
}

export default App;
