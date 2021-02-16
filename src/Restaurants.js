import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import {
  Row,
  Container,
  Card,
  Spinner,
  Col,
  Alert,
  Pagination,
} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import { LocationOn, RestaurantMenu } from '@material-ui/icons';
import { motion } from "framer-motion"
import {getGradeAverage} from "./Restaurant";
import "./Restaurants.css";

async function loadApi(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }
  return res.json();
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Restaurants() {
  document.title = "New York Restaurants"
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
    if(borough) {
      setPage(1);
    }

  }, [borough])

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
    <Container >
      <Row >
        <Card style={{ width: "100% " }} className="mt-3">
          <Card.Body>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Subtitle>
              Full List Of Restaurants. Optionally sorted by borough
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </Row>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <Row className="mt-3">
          {restaurants.map((restaurant) => (
            <Col xs={12} md={6} lg={4} xl={3} key={restaurant._id} className="cards">
                <Card
                  style={{
                    verticalAlign: "center",

                    paddingTop: "5px"

                  }}
                  className="m-3 text-center rest-card"
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <Card.Title style={{fontWeight: "bold"}}>{restaurant.name}</Card.Title>
                  <Card.Subtitle><RestaurantMenu/>{restaurant.cuisine}</Card.Subtitle>
                  <Card.Text>
                  <LocationOn/>{restaurant.address.building} {restaurant.address.street}
                    <br />
                    {restaurant.borough}
                    <br />
                    <Rating
                      name="half-rating-read"
                      defaultValue={Math.round(
                        (getGradeAverage(restaurant.grades))
                      )}
                      precision={0.5}
                      readOnly
                    /> 
                  </Card.Text>
                </Card>
            </Col>
          ))}
        </Row>
        </motion.div>

      <Pagination>
        <Pagination.Prev onClick={previousPage} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </Container>
  );
}
