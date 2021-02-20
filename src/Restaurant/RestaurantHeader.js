// React-Bootstrap Components
import { Card, Row } from "react-bootstrap";

//Material UI components
import { Rating } from "@material-ui/lab";
import { LocationOn, RestaurantMenu } from "@material-ui/icons";

//Custom functions
import { getGradeAverage } from "../Load";

export default function RestaurantHeader({ restaurant }) {
  return (
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
  );
}
