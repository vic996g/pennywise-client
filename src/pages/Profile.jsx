import { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import api from '../services/api'
import Loading from '../components/Loading'

function Profile() {
  const [user, setUser] = useState(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ==================================
  // FETCH USER PROFILE
  // ==================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError('')

        const token =
          localStorage.getItem('token')

        const config = {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }

        const response =
          await api.get(
            '/auth/profile',
            config
          )

        const profile =
          response.data.user

        setUser(profile)

        setName(profile.name || '')
        setEmail(profile.email || '')
      } catch (error) {
        console.error(
          'Profile error:',
          error
        )

        setError(
          error.response?.data?.message ||
            'Unable to load profile.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // ==================================
  // UPDATE PROFILE
  // ==================================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!name.trim()) {
      setError(
        'Name cannot be empty.'
      )
      return
    }

    try {
      setSaving(true)

      const token =
        localStorage.getItem('token')

      const config = {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }

      const response =
        await api.put(
          '/auth/profile',
          {
            name: name.trim(),
          },
          config
        )

      const updatedUser =
        response.data.user

      setUser(updatedUser)
      setName(updatedUser.name || '')
      setEmail(updatedUser.email || '')

      localStorage.setItem(
        'user',
        JSON.stringify(updatedUser)
      )

      setSuccess(
        'Profile updated successfully.'
      )
    } catch (error) {
      console.error(
        'Profile update error:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to update profile.'
      )
    } finally {
      setSaving(false)
    }
  }

  // ==================================
  // LOADING
  // ==================================

  if (loading) {
  return (
    <Loading message="Loading your profile..." />
  )
}

  return (
    <div className="container-fluid py-4">

      {/* ==================================
          PAGE HEADER
      ================================== */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Profile
        </h2>

        <p className="text-secondary mb-0">
          Manage your PENNYWISE account information.
        </p>

      </div>


      {/* ==================================
          ALERTS
      ================================== */}

      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      {success && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccess('')}
        >
          {success}
        </Alert>
      )}


      <Row className="g-4">

        {/* ==================================
            PROFILE INFORMATION
        ================================== */}

        <Col lg={8}>

          <Card className="border-0 shadow-sm">

            <Card.Body className="p-4">

              <h5 className="fw-bold mb-4">
                Personal Information
              </h5>

              <Form onSubmit={handleSubmit}>

                {/* NAME */}

                <Form.Group className="mb-4">

                  <Form.Label>
                    Full Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="Enter your name"
                  />

                </Form.Group>


                {/* EMAIL */}

                <Form.Group className="mb-4">

                  <Form.Label>
                    Email Address
                  </Form.Label>

                  <Form.Control
                    type="email"
                    value={email}
                    disabled
                  />

                  <Form.Text className="text-secondary">
                    Your email address cannot be changed here.
                  </Form.Text>

                </Form.Group>


                <Button
                  type="submit"
                  variant="dark"
                  disabled={saving}
                >
                  {saving
                    ? 'Saving...'
                    : 'Save Changes'}
                </Button>

              </Form>

            </Card.Body>

          </Card>

        </Col>


        {/* ==================================
            ACCOUNT INFORMATION
        ================================== */}

        <Col lg={4}>

          <Card className="border-0 shadow-sm">

            <Card.Body className="p-4">

              <h5 className="fw-bold mb-4">
                Account
              </h5>

              <div className="mb-3">

                <p className="text-secondary mb-1">
                  Name
                </p>

                <p className="fw-semibold mb-0">
                  {user?.name || 'Not available'}
                </p>

              </div>


              <div className="mb-3">

                <p className="text-secondary mb-1">
                  Email
                </p>

                <p className="fw-semibold mb-0">
                  {user?.email || 'Not available'}
                </p>

              </div>


              <div>

                <p className="text-secondary mb-1">
                  Account Status
                </p>

                <span className="badge text-bg-success">
                  Active
                </span>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </div>
  )
}

export default Profile