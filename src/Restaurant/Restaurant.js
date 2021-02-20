//import useParams to request the search parameters
import { useParams } from "react-router";
//React Hooks
import { useEffect, useState } from "react";
//React-Bootstrap Components
import { Container, Row, Alert, Col, Spinner } from "react-bootstrap";
//Custom Components
import ReviewSection from "./ReviewSection";
import RestaurantHeader from "./RestaurantHeader";

//Custom Functions
import { loadRestaurant } from "../Load";
//Custom CSS
import "./Restaurant.css";

//Leaflet
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
let customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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
        <Spinner animation="border" role="status" className="centerSpinner" variant="light">
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
      <RestaurantHeader restaurant={restaurant} />
      <MapContainer
        style={{ height: "400px", marginTop: "5px" }}
        center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[restaurant.address.coord[1], restaurant.address.coord[0]]}
          icon={customIcon}
        ></Marker>
      </MapContainer>
      <Row className="rating-section">
        <ReviewSection restaurant={restaurant} />
      </Row>
    </Container>
  );
}
