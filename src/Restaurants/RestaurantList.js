//React Bootstrap Components
import {Card, Row, Col} from 'react-bootstrap';
//Framer Components
import {motion} from 'framer-motion';
//Material UI Components
import {RestaurantMenu, LocationOn} from '@material-ui/icons';
import {Rating} from '@material-ui/lab';

//Custom Functions
import {getGradeAverage} from '../Load';


export default function RestaurantList ({restaurants, history}) {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <Row className="mt-3">
          {restaurants.map((restaurant) => (
            <Col
              xs={12}
              md={6}
              lg={4}
              xl={4}
              key={restaurant._id}
              className="cards"
            >
              <Card
                style={{
                  verticalAlign: "center",
                  paddingTop: "5px",
                  background: "transparent",
                  color: "#FFF",
                  border: "1px solid #FFF",
                }}
                className="mb-3 text-center rest-card"
                onClick={() => {
                  history.push(`/restaurant/${restaurant._id}`);
                }}
              >
                <Card.Title style={{ fontWeight: "bold" }}>
                  {restaurant.name}
                </Card.Title>
                <Card.Subtitle>
                  <RestaurantMenu />
                  {restaurant.cuisine}
                </Card.Subtitle>
                <Card.Text>
                  <LocationOn />
                  {restaurant.address.building} {restaurant.address.street}
                  <br />
                  {restaurant.borough}
                  <br />
                  <Rating
                    name="half-rating-read"
                    defaultValue={Math.round(
                      getGradeAverage(restaurant.grades)
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
    )
}