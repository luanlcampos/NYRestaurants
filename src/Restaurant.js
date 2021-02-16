import { useParams } from "react-router";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Alert,
  Col,
  Spinner,
} from "react-bootstrap";
import Rating from "@material-ui/lab/Rating";
import {
  LocationOn,
  RestaurantMenu,
  AccountCircle
} from "@material-ui/icons";
import Moment from "react-moment";
import React from "react";
import Chance from "chance";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "./Restaurant.css";
const chance = new Chance();

let customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

async function loadRestaurant(id) {
  let apiURL = `https://dry-lowlands-75857.herokuapp.com/api/restaurants/${id}`;
  const res = await fetch(apiURL);
  if (!res.ok) {
    throw new Error(`error loading ${id} (${res.status})`);
  }
  return res.json();
}

export function getGradeAverage(grades) {
  let convertedAverage = 0;
  grades.forEach((e) => {
    if (e.grade.toUpperCase() === "A") {
      convertedAverage += 5;
    } else if (e.grade.toUpperCase() === "B") {
      convertedAverage += 4;
    } else if (e.grade.toUpperCase() === "C") {
      convertedAverage += 3;
    } else if (e.grade.toUpperCase() === "D") {
      convertedAverage += 2;
    } else {
      convertedAverage += 1;
    }
  });
  return convertedAverage / grades.length;
}

export default function Restaurant() {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRestaurant(id)
      .then((data) => {
        if (data) {
          if (data.hasOwnProperty("_id")) {
            setRestaurant(data);
            document.title = data.name;
            setLoading(false);
          }
        } else {
          setLoading(true);
          setRestaurant(null);
        }
      })
      .catch((err) => {
        setRestaurant([]);
        setLoading(false);
      });
  }, [id]);

 

  if (loading) {
    return (
      <Col>
        <Spinner animation="border" role="status" className="centerSpinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  if (restaurant && restaurant.length === 0) {
    return <Alert variant="warning">Restaurant Not Found!</Alert>;
  }

  return (
    <Container className="mt-2">
      <React.Fragment>
        <Card>
          <Card.Header>
            <Row>
              <h2>
                {restaurant.name}
                {"   "}
                <Rating
                  name="half-rating-read"
                  defaultValue={Math.round(getGradeAverage(restaurant.grades))}
                  precision={0.5}
                  readOnly
                />
                <span
                  style={{
                    lineHeight: "1rem",
                    fontSize: "14pt",
                    paddingLeft: "10px",
                    verticalAlign: "5px",
                  }}
                >
                  {"("}
                  {restaurant.grades.length}{" "}
                  {restaurant.grades.length > 1 ? "reviews" : "review"}
                  {")"}
                </span>
              </h2>
            </Row>
            <LocationOn></LocationOn>
            {restaurant.address.building} {restaurant.address.street} <br />
            <RestaurantMenu></RestaurantMenu>
            {restaurant.cuisine}
          </Card.Header>
        </Card>
        <MapContainer
          style={{ height: "400px" }}
          center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[
              restaurant.address.coord[1],
              restaurant.address.coord[0],
            ]}
            icon={customIcon}
          ></Marker>
        </MapContainer>

        
        <Row className="rating-section">
          {restaurant.grades.map((e) => (
            <Col xs={12} md={6} lg={4} xl={4}>
              <Card className="rating-card">
                <Card.Header>
                  <AccountCircle /> {chance.name()}
                  <br />
                  <Rating
                    name="half-rating-read"
                    defaultValue={Math.round(
                      getGradeAverage(restaurant.grades)
                    )}
                    precision={0.5}
                    readOnly
                  />
                  <br />
                  {"Reviewed on "}
                  <Moment format="LL">{e.date}</Moment>
                </Card.Header>

                <Card.Body>{chance.paragraph({ sentences: 2 })}</Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
 
      </React.Fragment>
    </Container>
  );
}
