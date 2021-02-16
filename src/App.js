import { useState } from "react";
//importing Bootstrap components
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
//importing react router
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
//importing react router bootstrap
import { LinkContainer } from "react-router-bootstrap";
import Restaurants from "./Restaurants";
import Restaurant from "./Restaurant";
import About from "./About";
import NotFound from "./NotFound";
//Loading css
import "./App.css";
import StickyFooter from "./Footer";

function App() {
  const [searchString, setSearchString] = useState("");
  let history = useHistory();
  function handleSubmit(e) {
    e.preventDefault();
    history.push(`/restaurants?borough=${searchString}`);
    setSearchString("");
  }

  return (
    <>
      <div fluid className="content">
        <Navbar bg="light" expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>New York Restaurants</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/restaurants">
                <Nav.Link>Full List</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form onSubmit={handleSubmit} inline>
              <FormControl
                type="text"
                placeholder="Borough"
                autoFocus
                className="mr-sm-2"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
              />
              <Button type="submit" variant="outline-success">
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
          <Route path="/Restaurants">
            <Restaurants />
          </Route>
          <Route path="/Restaurant/:id">
            <Restaurant />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <StickyFooter className="footer"/>

      <br />
    </>
  );
}

export default App;
