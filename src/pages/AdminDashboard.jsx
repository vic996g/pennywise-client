import { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import api from '../services/api.js'
import Loading from '../components/Loading.jsx'


function AdminDashboard() {

  const [users, setUsers] = useState([])

  const [messages, setMessages] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [updatingMessage, setUpdatingMessage] =
    useState(null)


  // ==============================
  // FETCH USERS AND MESSAGES
  // ==============================

  useEffect(() => {

    const fetchAdminData = async () => {

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


        // ==============================
        // FETCH USERS
        // ==============================

        const usersResponse =
          await api.get(
            '/admin/users',
            config
          )


        setUsers(
          usersResponse.data.users
        )


        // ==============================
        // FETCH CONTACT MESSAGES
        // ==============================

        const messagesResponse =
          await api.get(
            '/contact',
            config
          )


        setMessages(
          messagesResponse.data.messages
        )

      } catch (error) {

        console.error(
          'Error loading admin data:',
          error
        )

        setError(
          error.response?.data?.message ||
          'Unable to load admin dashboard'
        )

      } finally {

        setLoading(false)

      }

    }


    fetchAdminData()

  }, [])


  // ==============================
  // MARK MESSAGE AS READ
  // ==============================

  const markAsRead = async (
    messageId
  ) => {

    try {

      setUpdatingMessage(
        messageId
      )


      const token =
        localStorage.getItem('token')


      const response =
        await api.patch(
          `/contact/${messageId}/read`,
          {},
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )


      const updatedMessage =
        response.data.contactMessage


      // ==============================
      // UPDATE MESSAGE IN STATE
      // ==============================

      setMessages(
        (currentMessages) =>
          currentMessages.map(
            (message) =>
              message._id === messageId
                ? {
                    ...message,
                    status:
                      updatedMessage.status,
                  }
                : message
          )
      )

    } catch (error) {

      console.error(
        'Error marking message as read:',
        error
      )

      setError(
        error.response?.data?.message ||
        'Unable to update message'
      )

    } finally {

      setUpdatingMessage(null)

    }

  }


  // ==============================
  // LOADING STATE
  // ==============================

  if (loading) {

    return (
      <Loading
        message="Loading admin dashboard..."
      />
    )

  }


  // ==============================
  // ERROR STATE
  // ==============================

  if (error) {

    return (
      <div className="container py-5">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>
    )

  }


  // ==============================
  // DASHBOARD
  // ==============================

  return (

    <div className="container py-5">

      {/* PAGE TITLE */}

      <div className="mb-4">

        <h2 className="fw-bold">
          Admin Dashboard
        </h2>

        <p className="text-secondary mb-0">
          Manage users and view PENNYWISE feedback messages.
        </p>

      </div>


      {/* SUMMARY CARDS */}

      <div className="row g-4 mb-4">

        {/* TOTAL USERS */}

        <div className="col-md-4">

          <Card className="border-0 shadow-sm h-100">

            <Card.Body>

              <p className="text-secondary mb-2">
                Total Users
              </p>

              <h2 className="fw-bold mb-0">
                {users.length}
              </h2>

            </Card.Body>

          </Card>

        </div>


        {/* TOTAL MESSAGES */}

        <div className="col-md-4">

          <Card className="border-0 shadow-sm h-100">

            <Card.Body>

              <p className="text-secondary mb-2">
                Contact Messages
              </p>

              <h2 className="fw-bold mb-0">
                {messages.length}
              </h2>

            </Card.Body>

          </Card>

        </div>


        {/* UNREAD MESSAGES */}

        <div className="col-md-4">

          <Card className="border-0 shadow-sm h-100">

            <Card.Body>

              <p className="text-secondary mb-2">
                Unread Messages
              </p>

              <h2 className="fw-bold mb-0">
                {
                  messages.filter(
                    (message) =>
                      message.status === 'unread'
                  ).length
                }
              </h2>

            </Card.Body>

          </Card>

        </div>

      </div>


      {/* USERS TABLE */}

      <Card className="border-0 shadow-sm mb-4">

        <Card.Body className="p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h5 className="fw-bold mb-0">
              Registered Users
            </h5>

            <span className="text-secondary">
              {users.length} users
            </span>

          </div>


          {users.length === 0 ? (

            <p className="text-secondary mb-0">
              No registered users found.
            </p>

          ) : (

            <div className="table-responsive">

              <Table
                hover
                responsive
                className="mb-0"
              >

                <thead>

                  <tr>

                    <th>
                      Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Currency
                    </th>

                    <th>
                      Role
                    </th>

                    <th>
                      Registered
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user._id}
                    >

                      <td className="fw-semibold">
                        {user.name}
                      </td>

                      <td>
                        {user.email}
                      </td>

                      <td>
                        {user.currency}
                      </td>

                      <td>

                        <span
                          className={
                            user.role === 'admin'
                              ? 'badge bg-success'
                              : 'badge bg-secondary'
                          }
                        >
                          {user.role}
                        </span>

                      </td>

                      <td>
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </Table>

            </div>

          )}

        </Card.Body>

      </Card>


      {/* CONTACT MESSAGES */}

      <Card className="border-0 shadow-sm">

        <Card.Body className="p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h5 className="fw-bold mb-0">
              Contact Messages
            </h5>

            <span className="text-secondary">
              {messages.length} messages
            </span>

          </div>


          {messages.length === 0 ? (

            <p className="text-secondary mb-0">
              No contact messages found.
            </p>

          ) : (

            <div className="table-responsive">

              <Table
                hover
                responsive
                className="mb-0"
              >

                <thead>

                  <tr>

                    <th>
                      Name
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Subject
                    </th>

                    <th>
                      Message
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {messages.map(
                    (message) => (

                      <tr
                        key={message._id}
                      >

                        <td className="fw-semibold">
                          {message.name}
                        </td>

                        <td>
                          {message.email}
                        </td>

                        <td>
                          {message.subject}
                        </td>

                        <td
                          style={{
                            minWidth: '250px',
                          }}
                        >
                          {message.message}
                        </td>

                        <td>

                          <span
                            className={
                              message.status === 'unread'
                                ? 'badge bg-danger'
                                : 'badge bg-success'
                            }
                          >
                            {message.status}
                          </span>

                        </td>

                        <td>
                          {new Date(
                            message.createdAt
                          ).toLocaleDateString()}
                        </td>

                        <td>

                          {message.status === 'unread' ? (

                            <Button
                              variant="success"
                              size="sm"
                              onClick={() =>
                                markAsRead(
                                  message._id
                                )
                              }
                              disabled={
                                updatingMessage ===
                                message._id
                              }
                            >
                              {updatingMessage ===
                              message._id
                                ? 'Updating...'
                                : 'Mark as Read'}
                            </Button>

                          ) : (

                            <span className="text-success">
                              ✓ Read
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </Table>

            </div>

          )}

        </Card.Body>

      </Card>

    </div>

  )
}


export default AdminDashboard