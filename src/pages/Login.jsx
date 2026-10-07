
import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { Link, useNavigate } from 'react-router-dom'

import api from '../services/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setMessage('')

    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    try {
      setLoading(true)

      const response = await api.post(
        '/auth/login',
        {
          email,
          password,
        }
      )

      const { token, user } = response.data

      localStorage.setItem('token', token)

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      )

      setMessage('Login successful!')

      setEmail('')
      setPassword('')

      navigate('/dashboard')
    } catch (error) {
      console.error(
        'Login error:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to login. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-5 bg-light min-vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col
            xs={12}
            sm={10}
            md={8}
            lg={5}
            xl={4}
          >
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4 p-md-5">

                <div className="text-center mb-4">
                  <h2 className="fw-bold">
                    Welcome Back
                  </h2>

                  <p className="text-secondary mb-0">
                    Login to your PENNYWISE account
                  </p>
                </div>

                {message && (
                  <Alert variant="success">
                    {message}
                  </Alert>
                )}

                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email Address
                    </Form.Label>

                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Password
                    </Form.Label>

                    <div className="position-relative">
                      <Form.Control
                        type={
                          showPassword
                            ? 'text'
                            : 'password'
                        }
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                        className="pe-5"
                      />

                      <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        aria-label={
                          showPassword
                            ? 'Hide password'
                            : 'Show password'
                        }
                      >
                        {showPassword
                          ? '🙈'
                          : '👁️'}
                      </button>
                    </div>
                  </Form.Group>

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading
                      ? 'Logging in...'
                      : 'Login'}
                  </Button>

                </Form>

                <div className="text-center mt-4">
                  <p className="text-secondary mb-0">
                    Don't have an account?{' '}

                    <Link
                      to="/register"
                      className="text-success fw-semibold text-decoration-none"
                    >
                      Create an account
                    </Link>
                  </p>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login

