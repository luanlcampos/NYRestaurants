//React Components
import { useState, useEffect } from 'react';

//React-Bootstrap Components
import {Col, Card } from 'react-bootstrap';

//Moment Components
import Moment from "react-moment";

//Moment UI Components
import { AccountCircle } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";

//Chance Component -> generates random text
//https://chancejs.com/
import Chance from 'chance';

//Custom functions
import {getGradeAverage} from './Load';

//Setup the chance object
const chance = new Chance();


export default function ReviewSection({restaurant}) {
  const [revName, setRevName] = useState("");
  const [revText, setRevText] = useState("");
  useEffect(() => {
    setRevName(chance.name());
    setRevText(chance.paragraph({ sentences: 2 }));
  }, []);

  return (
      restaurant.grades.map((e) => (
        <Col xs={12} md={6} lg={4} xl={4} style={{ marginBottom: "2rem" }}>
          <Card className="rating-card">
            <Card.Header>
              <AccountCircle /> {revName}
              <br />
              <Rating
                name="half-rating-read"
                defaultValue={Math.round(getGradeAverage(restaurant.grades))}
                precision={0.5}
                readOnly
              />
              <br />
              {"Reviewed on "}
              <Moment format="LL">{e.date}</Moment>
            </Card.Header>
            <Card.Body>{revText}</Card.Body>
          </Card>
        </Col>
      ))

  );
}
