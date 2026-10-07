import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <Container fluid className="px-4 px-lg-5">
        <Row>
          
          {/* Brand */}
          <Col md={6} className="mb-4 mb-md-0">
            <h4 className="fw-bold">
              PENNY<span className="text-success">WISE</span>
            </h4>

            <p className="text-secondary mt-3">
              Take control of your money, manage your spending,
              and work towards your financial goals.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4 mb-md-0">
            <h6 className="fw-bold">Quick Links</h6>

            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-secondary px-0">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about" className="text-secondary px-0">
                About
              </Nav.Link>

              <Nav.Link as={Link} to="/contact" className="text-secondary px-0">
                Contact
              </Nav.Link>
            </Nav>
          </Col>

          {/* Account */}
          <Col md={3}>
            <h6 className="fw-bold">Account</h6>

            <Nav className="flex-column">
              <Nav.Link as={Link} to="/login" className="text-secondary px-0">
                Login
              </Nav.Link>

              <Nav.Link as={Link} to="/register" className="text-secondary px-0">
                Create Account
              </Nav.Link>
            </Nav>
          </Col>

        </Row>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary">
          <small>
            © 2026 PENNYWISE. All rights reserved.
          </small>
        </div>

      </Container>
    </footer>
  )
}

export default Footer