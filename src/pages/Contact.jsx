import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import api from '../services/api.js'


function Contact() {

  // ==============================
  // FORM DATA
  // ==============================

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })


  // ==============================
  // SUBMISSION STATES
  // ==============================

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState('')

  const [error, setError] =
    useState('')


  // ==============================
  // HANDLE INPUT CHANGES
  // ==============================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target


    setFormData({
      ...formData,
      [name]: value,
    })

  }


  // ==============================
  // HANDLE FORM SUBMISSION
  // ==============================

  const handleSubmit = async (event) => {

    event.preventDefault()


    setLoading(true)
    setSuccess('')
    setError('')


    try {

      const response =
        await api.post(
          '/contact',
          formData
        )


      setSuccess(
        response.data.message
      )


      // Clear the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })

    } catch (error) {

      console.error(
        'Contact form error:',
        error
      )


      setError(
        error.response?.data?.message ||
        'Unable to send your message. Please try again.'
      )

    } finally {

      setLoading(false)

    }

  }


  return (
    <main>

      {/* Hero */}

      <section className="py-5 bg-light">

        <Container>

          <Row className="justify-content-center text-center">

            <Col lg={8}>

              <span className="text-success fw-semibold">
                CONTACT PENNYWISE
              </span>

              <h1 className="display-5 fw-bold mt-2">
                We're here to help.
              </h1>

              <p className="lead text-secondary mt-3">
                Have a question, feedback, or something you'd like
                to tell us? Send us a message and we'll get back to you.
              </p>

            </Col>

          </Row>

        </Container>

      </section>


      {/* Contact Section */}

      <section className="py-5">

        <Container>

          <Row className="g-5">

            {/* Contact Information */}

            <Col lg={5}>

              <span className="text-success fw-semibold">
                GET IN TOUCH
              </span>

              <h2 className="fw-bold mt-2">
                We'd love to hear from you.
              </h2>

              <p className="text-secondary mt-3">
                Whether you have a question about PENNYWISE,
                need help with your account, or want to share
                feedback, you can reach out to us.
              </p>


              {/* Email */}

              <div className="d-flex align-items-start mt-4">

                <div
                  className="bg-success bg-opacity-10 rounded-3 p-3 me-3"
                >
                  <span className="fs-4">
                    ✉️
                  </span>
                </div>

                <div>

                  <h6 className="fw-bold mb-1">
                    Email
                  </h6>

                  <p className="text-secondary mb-0">
                    support@pennywise.com
                  </p>

                </div>

              </div>


              {/* Support */}

              <div className="d-flex align-items-start mt-4">

                <div
                  className="bg-success bg-opacity-10 rounded-3 p-3 me-3"
                >
                  <span className="fs-4">
                    💬
                  </span>
                </div>

                <div>

                  <h6 className="fw-bold mb-1">
                    Support
                  </h6>

                  <p className="text-secondary mb-0">
                    We're here to help with your PENNYWISE
                    experience.
                  </p>

                </div>

              </div>


              {/* Feedback */}

              <div className="d-flex align-items-start mt-4">

                <div
                  className="bg-success bg-opacity-10 rounded-3 p-3 me-3"
                >
                  <span className="fs-4">
                    💡
                  </span>
                </div>

                <div>

                  <h6 className="fw-bold mb-1">
                    Feedback
                  </h6>

                  <p className="text-secondary mb-0">
                    Have an idea that could improve PENNYWISE?
                    Let us know.
                  </p>

                </div>

              </div>

            </Col>


            {/* Contact Form */}

            <Col lg={7}>

              <Card className="border-0 shadow-sm rounded-4">

                <Card.Body className="p-4 p-md-5">

                  <h4 className="fw-bold mb-4">
                    Send us a message
                  </h4>


                  {/* SUCCESS MESSAGE */}

                  {success && (
                    <div className="alert alert-success">
                      {success}
                    </div>
                  )}


                  {/* ERROR MESSAGE */}

                  {error && (
                    <div className="alert alert-danger">
                      {error}
                    </div>
                  )}


                  <Form
                    onSubmit={handleSubmit}
                  >

                    {/* Name */}

                    <Form.Group className="mb-3">

                      <Form.Label>
                        Full Name
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />

                    </Form.Group>


                    {/* Email */}

                    <Form.Group className="mb-3">

                      <Form.Label>
                        Email Address
                      </Form.Label>

                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />

                    </Form.Group>


                    {/* Subject */}

                    <Form.Group className="mb-3">

                      <Form.Label>
                        Subject
                      </Form.Label>

                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is your message about?"
                        required
                      />

                    </Form.Group>


                    {/* Message */}

                    <Form.Group className="mb-4">

                      <Form.Label>
                        Message
                      </Form.Label>

                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Write your message here..."
                        required
                      />

                    </Form.Group>


                    {/* Submit */}

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100 py-2"
                      disabled={loading}
                    >
                      {loading
                        ? 'Sending...'
                        : 'Send Message'}
                    </Button>

                  </Form>

                </Card.Body>

              </Card>

            </Col>

          </Row>

        </Container>

      </section>


      {/* FAQ / Help */}

      <section className="py-5 bg-light">

        <Container>

          <Row className="justify-content-center text-center">

            <Col lg={8}>

              <h3 className="fw-bold">
                Need help with your account?
              </h3>

              <p className="text-secondary mt-3">
                For account-related questions, keep your registered
                email address available so our support team can
                assist you more efficiently.
              </p>

            </Col>

          </Row>

        </Container>

      </section>

    </main>
  )
}


export default Contact