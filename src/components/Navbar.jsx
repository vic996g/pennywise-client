import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'


function NavigationBar() {

  const location = useLocation()
  const navigate = useNavigate()


  // ==============================
  // AUTHENTICATION
  // ==============================

  const token =
    localStorage.getItem('token')

  const storedUser =
    localStorage.getItem('user')

  const isLoggedIn =
    Boolean(token)


  // ==============================
  // GET CURRENT USER
  // ==============================

  let user = null

  if (storedUser) {

    try {

      user = JSON.parse(
        storedUser
      )

    } catch (error) {

      console.error(
        'Unable to read user data:',
        error
      )

    }

  }


  const isAdmin =
    user?.role === 'admin'


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {

    localStorage.removeItem(
      'token'
    )

    localStorage.removeItem(
      'user'
    )

    navigate('/login')

  }


  // ==============================
  // ACTIVE LINK
  // ==============================

  const isActive = (path) => {

    return (
      location.pathname === path
    )

  }


  return (

    <Navbar
      expand="lg"
      className="bg-white shadow-sm py-3"
    >

      <Container
        fluid
        className="px-4 px-lg-5"
      >

        {/* BRAND */}

        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold fs-4"
        >
          PENNY
          <span className="text-success">
            WISE
          </span>
        </Navbar.Brand>


        {/* MOBILE TOGGLE */}

        <Navbar.Toggle
          aria-controls="pennywise-navbar"
        />


        <Navbar.Collapse
          id="pennywise-navbar"
        >

          <Nav className="ms-auto align-items-lg-center gap-lg-2">

            {/* HOME */}

            <Nav.Link
              as={Link}
              to="/"
              active={isActive('/')}
            >
              Home
            </Nav.Link>


            {/* ABOUT */}

            <Nav.Link
              as={Link}
              to="/about"
              active={isActive('/about')}
            >
              About
            </Nav.Link>


            {/* CONTACT */}

            <Nav.Link
              as={Link}
              to="/contact"
              active={isActive('/contact')}
            >
              Contact
            </Nav.Link>


            {isLoggedIn ? (

              <>

                {/* DASHBOARD */}

                <Nav.Link
                  as={Link}
                  to="/dashboard"
                  active={isActive('/dashboard')}
                >
                  Dashboard
                </Nav.Link>


                {/* TRANSACTIONS */}

                <Nav.Link
                  as={Link}
                  to="/transactions"
                  active={isActive('/transactions')}
                >
                  Transactions
                </Nav.Link>


                {/* BUDGETS */}

                <Nav.Link
                  as={Link}
                  to="/budgets"
                  active={isActive('/budgets')}
                >
                  Budgets
                </Nav.Link>


                {/* SAVINGS */}

                <Nav.Link
                  as={Link}
                  to="/savings"
                  active={isActive('/savings')}
                >
                  Savings
                </Nav.Link>


                {/* ANALYTICS */}

                <Nav.Link
                  as={Link}
                  to="/analytics"
                  active={isActive('/analytics')}
                >
                  Analytics
                </Nav.Link>


                {/* PROFILE */}

                <Nav.Link
                  as={Link}
                  to="/profile"
                  active={isActive('/profile')}
                >
                  Profile
                </Nav.Link>


                {/* ADMIN */}

                {isAdmin && (

                  <Nav.Link
                    as={Link}
                    to="/admin"
                    active={isActive('/admin')}
                  >
                    Admin
                  </Nav.Link>

                )}


                {/* LOGOUT */}

                <Button
                  variant="outline-danger"
                  className="px-4 ms-lg-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>

              </>

            ) : (

              <>

                {/* LOGIN */}

                <Nav.Link
                  as={Link}
                  to="/login"
                  active={isActive('/login')}
                >
                  Login
                </Nav.Link>


                {/* REGISTER */}

                <Button
                  as={Link}
                  to="/register"
                  variant="success"
                  className="px-4 ms-lg-2"
                >
                  Get Started
                </Button>

              </>

            )}

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>

  )

}


export default NavigationBar