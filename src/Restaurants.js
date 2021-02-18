//React Hooks
import { useState, useEffect } from "react";
//React-Router-Dom Hooks
import { useLocation, useHistory } from "react-router-dom";
//React-Bootstrap Components
import {
  Row,
  Container,
  Card,
  Spinner,
  Col,
  Alert,
  Pagination,
} from "react-bootstrap";
//Custom Components
import RestaurantList from './RestaurantList';
//Custom Functions
import {loadApi} from './Load';
//Custom CSS
import "./Restaurants.css";

//Get the query from the URL 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Restaurants() {
  document.title = "New York Restaurants";
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  let query = useQuery();
  let borough = query.get("borough");
  let history = useHistory();

  useEffect(() => {
    let apiUrl = `https://dry-lowlands-75857.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${borough}`;
    if (!borough) {
      apiUrl = `https://dry-lowlands-75857.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
    }

    loadApi(apiUrl)
      .then((results) => {
        if (results) {
          setRestaurants(results);
        }
      })
      .catch((err) => console.log(err));
  }, [borough, page]);

  useEffect(() => {
    if (borough) {
      setPage(1);
    }
  }, [borough]);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    setPage(page + 1);
  }

  if (!restaurants) {
    return (
      <Col>
        <Spinner animation="border" role="status" className="centerSpinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  if (restaurants && restaurants.length === 0) {
    return (
      <Col>
        <Alert variant="warning">
          {borough} is not found! Please, try again
        </Alert>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Card
          style={{
            width: "100% ",
            background: 'transparent',
            color: '#FFF',
            border: "1px solid #FFF",
          }}
          className="mt-3"
        >
          <Card.Body>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Subtitle>
              Full List Of Restaurants. Optionally sorted by borough
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Row>
          <RestaurantList restaurants={restaurants} history={history} />

      <Pagination className="justify-content-end">
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item >{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </Container>
  );
}
