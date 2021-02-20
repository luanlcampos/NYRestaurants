import {Container} from 'react-bootstrap';

//Custom CSS
import './NotFound.css';

export default function NotFound() {
  return (
    // <Container className="centerText flex-column align-middle text-center">
    <Container className="centerText text-center">
      <h1>Not Found</h1>
      <p>We can't find what you're looking for...</p>
    </Container>
  );
}
