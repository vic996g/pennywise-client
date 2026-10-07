import { useState } from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'

import api from '../services/api'

function Register() {
  // Form values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Validation errors
  const [errors, setErrors] = useState({})

  // Show/hide passwords
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Loading state
  const [loading, setLoading] = useState(false)

  // Success message
  const [successMessage, setSuccessMessage] = useState('')

  // Server error
  const [serverError, setServerError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Clear previous messages
    setSuccessMessage('')
    setServerError('')

    // Create an empty object for validation errors
    const newErrors = {}

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }

    // Validate email
    if (!email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Validate password
    if (!password.trim()) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Validate confirm password
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Display validation errors
    setErrors(newErrors)

    // Stop if there are validation errors
    if (Object.keys(newErrors).length > 0) {
      return
    }

    try {
      setLoading(true)

      // Send registration data to the backend
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      console.log(response.data)

      // Show success message
      setSuccessMessage('Account created successfully!')

      // Clear form
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setErrors({})

    } catch (error) {
      console.error('Registration failed:', error)

      if (error.response) {
        setServerError(
          error.response.data.message || 'Registration failed'
        )
      } else {
        setServerError(
          'Unable to connect to the server. Please make sure the backend is running.'
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} xl={5}>

            <Card className="border-0 shadow-sm rounded-4">
              <Card.Body className="p-4 p-md-5">

                {/* Heading */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold">
                    Create Your Account
                  </h2>

                  <p className="text-secondary mb-0">
                    Start taking control of your money with PENNYWISE.
                  </p>
                </div>

                {/* Success message */}
                {successMessage && (
                  <Alert
                    variant="success"
                    className="mb-4"
                  >
                    {successMessage}
                  </Alert>
                )}

                {/* Server error */}
                {serverError && (
                  <Alert
                    variant="danger"
                    className="mb-4"
                  >
                    {serverError}
                  </Alert>
                )}

                {/* Registration form */}
                <Form onSubmit={handleSubmit}>

                  {/* Name */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Full Name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!errors.name}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email Address
                    </Form.Label>

                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Password
                    </Form.Label>

                    <InputGroup>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!!errors.password}
                      />

                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>

                      {errors.password && (
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>

                    {!errors.password && (
                      <Form.Text className="text-secondary">
                        Password must be at least 6 characters.
                      </Form.Text>
                    )}
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Confirm Password
                    </Form.Label>

                    <InputGroup>
                      <Form.Control
                        type={
                          showConfirmPassword
                            ? 'text'
                            : 'password'
                        }
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        isInvalid={!!errors.confirmPassword}
                      />

                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? 'Hide' : 'Show'}
                      </Button>

                      {errors.confirmPassword && (
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      )}
                    </InputGroup>

                    {errors.confirmPassword && (
                      <div className="text-danger small mt-1">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Group>

                  {/* Submit button */}
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 py-2"
                    disabled={loading}
                  >
                    {loading
                      ? 'Creating Account...'
                      : 'Create Account'}
                  </Button>

                </Form>

                {/* Login link */}
                <div className="text-center mt-4">
                  <span className="text-secondary">
                    Already have an account?{' '}
                  </span>

                  <Link
                    to="/login"
                    className="text-success fw-semibold text-decoration-none"
                  >
                    Login
                  </Link>
                </div>

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Register