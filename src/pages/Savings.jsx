import { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'

import api from '../services/api'
import Loading from '../components/Loading'

function Savings() {
  const [savingsGoals, setSavingsGoals] =
    useState([])

  const [name, setName] = useState('')
  const [targetAmount, setTargetAmount] =
    useState('')
  const [currentAmount, setCurrentAmount] =
    useState('')
  const [targetDate, setTargetDate] =
    useState('')

  const [editingGoal, setEditingGoal] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  // ==============================
  // ADD MONEY STATES
  // ==============================

  const [showAddMoneyModal, setShowAddMoneyModal] =
    useState(false)

  const [selectedGoal, setSelectedGoal] =
    useState(null)

  const [addAmount, setAddAmount] =
    useState('')

  const [addingMoney, setAddingMoney] =
    useState(false)


  // ==============================
  // GET SAVINGS GOALS
  // ==============================

  const fetchSavingsGoals = async () => {
    try {
      setError('')

      const token =
        localStorage.getItem('token')

      const response =
        await api.get('/savings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

      setSavingsGoals(
        response.data.savingsGoals
      )
    } catch (error) {
      console.error(
        'Failed to load savings goals:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to load savings goals.'
      )
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchSavingsGoals()
  }, [])


  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {
    setName('')
    setTargetAmount('')
    setCurrentAmount('')
    setTargetDate('')
    setEditingGoal(null)
  }


  // ==============================
  // CREATE / UPDATE SAVINGS GOAL
  // ==============================

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    const target =
      Number(targetAmount)

    const current =
      Number(currentAmount || 0)

    if (!name || !target) {
      setError(
        'Name and target amount are required.'
      )

      return
    }

    if (target <= 0) {
      setError(
        'Target amount must be greater than zero.'
      )

      return
    }

    if (current < 0) {
      setError(
        'Current amount cannot be negative.'
      )

      return
    }

    if (current > target) {
      setError(
        'Current amount cannot be greater than the target amount.'
      )

      return
    }

    try {
      const token =
        localStorage.getItem('token')

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const data = {
        name: name.trim(),
        targetAmount: target,
        currentAmount: current,
        targetDate: targetDate || null,
      }

      if (editingGoal) {
        await api.put(
          `/savings/${editingGoal._id}`,
          data,
          config
        )

        setSuccess(
          'Savings goal updated successfully.'
        )
      } else {
        await api.post(
          '/savings',
          data,
          config
        )

        setSuccess(
          'Savings goal created successfully.'
        )
      }

      resetForm()

      await fetchSavingsGoals()
    } catch (error) {
      console.error(
        'Savings goal error:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to save savings goal.'
      )
    }
  }


  // ==============================
  // EDIT SAVINGS GOAL
  // ==============================

  const handleEdit = (goal) => {
    setEditingGoal(goal)

    setName(goal.name)

    setTargetAmount(
      goal.targetAmount
    )

    setCurrentAmount(
      goal.currentAmount
    )

    setTargetDate(
      goal.targetDate
        ? new Date(
            goal.targetDate
          )
            .toISOString()
            .split('T')[0]
        : ''
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  // ==============================
  // DELETE SAVINGS GOAL
  // ==============================

  const handleDelete = async (id) => {
    const confirmed =
      window.confirm(
        'Are you sure you want to delete this savings goal?'
      )

    if (!confirmed) {
      return
    }

    try {
      setError('')
      setSuccess('')

      const token =
        localStorage.getItem('token')

      await api.delete(
        `/savings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setSuccess(
        'Savings goal deleted successfully.'
      )

      await fetchSavingsGoals()
    } catch (error) {
      console.error(
        'Delete savings goal error:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to delete savings goal.'
      )
    }
  }


  // ==============================
  // OPEN ADD MONEY MODAL
  // ==============================

  const handleOpenAddMoney = (goal) => {
    setSelectedGoal(goal)
    setAddAmount('')
    setError('')
    setSuccess('')
    setShowAddMoneyModal(true)
  }


  // ==============================
  // CLOSE ADD MONEY MODAL
  // ==============================

  const handleCloseAddMoney = () => {
    setShowAddMoneyModal(false)
    setSelectedGoal(null)
    setAddAmount('')
  }


  // ==============================
  // ADD MONEY TO SAVINGS GOAL
  // ==============================

  const handleAddMoney = async () => {
    setError('')
    setSuccess('')

    const amount =
      Number(addAmount)

    if (!amount || amount <= 0) {
      setError(
        'Please enter a valid amount.'
      )

      return
    }

    if (!selectedGoal) {
      return
    }

    const remaining =
      Number(
        selectedGoal.targetAmount
      ) -
      Number(
        selectedGoal.currentAmount
      )

    if (amount > remaining) {
      setError(
        `You can only add up to ₦${remaining.toLocaleString()}.`
      )

      return
    }

    try {
      setAddingMoney(true)

      const token =
        localStorage.getItem('token')

      await api.patch(
        `/savings/${selectedGoal._id}/add-money`,
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      handleCloseAddMoney()

      setSuccess(
        'Money added to savings successfully.'
      )

      await fetchSavingsGoals()
    } catch (error) {
      console.error(
        'Add money error:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to add money to savings goal.'
      )
    } finally {
      setAddingMoney(false)
    }
  }


  // ==============================
  // INITIAL LOADING
  // ==============================

  if (loading) {
    return (
      <Loading
        message="Loading your savings goals..."
      />
    )
  }


  // ==============================
  // RENDER
  // ==============================

  return (
    <main className="py-5 bg-light">

      <Container
        fluid
        className="px-4 px-lg-5"
      >

        {/* PAGE HEADER */}

        <div className="mb-4">

          <h2 className="fw-bold">
            Savings Goals
          </h2>

          <p className="text-secondary">
            Set savings targets and track your progress.
          </p>

        </div>


        {/* MESSAGES */}

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


        {/* CREATE / EDIT FORM */}

        <Card className="border-0 shadow-sm mb-4">

          <Card.Body className="p-4">

            <h5 className="fw-bold mb-4">

              {editingGoal
                ? 'Edit Savings Goal'
                : 'Create Savings Goal'}

            </h5>

            <Form onSubmit={handleSubmit}>

              <Row className="g-3">

                <Col md={6}>

                  <Form.Group>

                    <Form.Label>
                      Goal Name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="e.g. New Laptop"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                    />

                  </Form.Group>

                </Col>


                <Col md={6}>

                  <Form.Group>

                    <Form.Label>
                      Target Amount
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="500000"
                      value={targetAmount}
                      onChange={(event) =>
                        setTargetAmount(
                          event.target.value
                        )
                      }
                    />

                  </Form.Group>

                </Col>


                <Col md={6}>

                  <Form.Group>

                    <Form.Label>
                      Current Amount
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="150000"
                      value={currentAmount}
                      onChange={(event) =>
                        setCurrentAmount(
                          event.target.value
                        )
                      }
                    />

                  </Form.Group>

                </Col>


                <Col md={6}>

                  <Form.Group>

                    <Form.Label>
                      Target Date
                    </Form.Label>

                    <Form.Control
                      type="date"
                      value={targetDate}
                      onChange={(event) =>
                        setTargetDate(
                          event.target.value
                        )
                      }
                    />

                  </Form.Group>

                </Col>

              </Row>


              <div className="mt-4">

                <Button
                  type="submit"
                  variant="success"
                  className="me-2"
                >
                  {editingGoal
                    ? 'Update Goal'
                    : 'Create Goal'}
                </Button>

                {editingGoal && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                )}

              </div>

            </Form>

          </Card.Body>

        </Card>


        {/* SAVINGS GOALS */}

        <Row className="g-4">

          {savingsGoals.length === 0 ? (

            <Col>

              <Card className="border-0 shadow-sm">

                <Card.Body className="text-center py-5 px-4">

                  <div className="mb-3">

                    <span
                      className="d-inline-flex justify-content-center align-items-center bg-success-subtle text-success rounded-circle"
                      style={{
                        width: '64px',
                        height: '64px',
                        fontSize: '28px',
                      }}
                    >
                      ₦
                    </span>

                  </div>

                  <h5 className="fw-bold mb-2">
                    Start Your Savings Journey
                  </h5>

                  <p
                    className="text-secondary mb-4 mx-auto"
                    style={{
                      maxWidth: '500px',
                    }}
                  >
                    You don't have any savings
                    goals yet. Create a goal above
                    to start tracking how much
                    you've saved and how much more
                    you need to reach your target.
                  </p>

                  <div className="d-flex justify-content-center gap-4 flex-wrap text-secondary small">

                    <span>
                      ✓ Set a target
                    </span>

                    <span>
                      ✓ Track progress
                    </span>

                    <span>
                      ✓ Add money
                    </span>

                  </div>

                </Card.Body>

              </Card>

            </Col>

          ) : (

            savingsGoals.map((goal) => {

              const target =
                Number(
                  goal.targetAmount || 0
                )

              const current =
                Number(
                  goal.currentAmount || 0
                )

              const percentage =
                Number(
                  goal.percentage || 0
                )

              const progress =
                Math.min(
                  Math.max(
                    percentage,
                    0
                  ),
                  100
                )

              const remaining =
                Math.max(
                  target - current,
                  0
                )

              const isComplete =
                current >= target

              return (
                <Col
                  md={6}
                  lg={4}
                  key={goal._id}
                >

                  <Card className="border-0 shadow-sm h-100">

                    <Card.Body className="p-4">

                      <div className="d-flex justify-content-between align-items-start mb-3">

                        <h5 className="fw-bold mb-0">
                          {goal.name}
                        </h5>

                        {isComplete && (
                          <span className="badge bg-success">
                            Completed
                          </span>
                        )}

                      </div>


                      <div className="mb-3">

                        <div className="d-flex justify-content-between mb-2">

                          <span className="text-secondary">
                            Saved
                          </span>

                          <strong>
                            ₦
                            {current.toLocaleString()}
                          </strong>

                        </div>

                        <ProgressBar
                          now={progress}
                          label={`${Math.round(
                            percentage
                          )}%`}
                          variant="success"
                        />

                      </div>


                      <div className="d-flex justify-content-between mb-3">

                        <span className="text-secondary">
                          Target
                        </span>

                        <span className="fw-semibold">
                          ₦
                          {target.toLocaleString()}
                        </span>

                      </div>


                      <div className="d-flex justify-content-between mb-4">

                        <span className="text-secondary">
                          Remaining
                        </span>

                        <span className="text-success fw-bold">
                          ₦
                          {remaining.toLocaleString()}
                        </span>

                      </div>


                      {goal.targetDate && (
                        <p className="text-secondary small mb-4">

                          Target date:{' '}

                          {new Date(
                            goal.targetDate
                          ).toLocaleDateString()}

                        </p>
                      )}


                      {/* ACTION BUTTONS */}

                      <div className="d-flex gap-2">

                        {!isComplete && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() =>
                              handleOpenAddMoney(
                                goal
                              )
                            }
                          >
                            Add Money
                          </Button>
                        )}

                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            handleEdit(goal)
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            handleDelete(
                              goal._id
                            )
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </Card.Body>

                  </Card>

                </Col>
              )
            })

          )}

        </Row>


        {/* ADD MONEY MODAL */}

        <Modal
          show={showAddMoneyModal}
          onHide={handleCloseAddMoney}
          centered
        >

          <Modal.Header closeButton>

            <Modal.Title>
              Add Money
            </Modal.Title>

          </Modal.Header>


          <Modal.Body>

            {selectedGoal && (
              <>

                <p className="text-secondary">
                  Add money to:
                </p>

                <h5 className="fw-bold mb-4">
                  {selectedGoal.name}
                </h5>


                <div className="d-flex justify-content-between mb-3">

                  <span className="text-secondary">
                    Current savings
                  </span>

                  <span className="fw-semibold">
                    ₦
                    {Number(
                      selectedGoal.currentAmount
                    ).toLocaleString()}
                  </span>

                </div>


                <div className="d-flex justify-content-between mb-4">

                  <span className="text-secondary">
                    Remaining
                  </span>

                  <span className="text-success fw-semibold">
                    ₦
                    {(
                      Number(
                        selectedGoal.targetAmount
                      ) -
                      Number(
                        selectedGoal.currentAmount
                      )
                    ).toLocaleString()}
                  </span>

                </div>


                <Form.Group>

                  <Form.Label>
                    Amount to add
                  </Form.Label>

                  <Form.Control
                    type="number"
                    min="1"
                    placeholder="50000"
                    value={addAmount}
                    onChange={(event) =>
                      setAddAmount(
                        event.target.value
                      )
                    }
                    autoFocus
                  />

                </Form.Group>

              </>
            )}

          </Modal.Body>


          <Modal.Footer>

            <Button
              variant="secondary"
              onClick={
                handleCloseAddMoney
              }
              disabled={addingMoney}
            >
              Cancel
            </Button>

            <Button
              variant="success"
              onClick={handleAddMoney}
              disabled={addingMoney}
            >
              {addingMoney
                ? 'Adding...'
                : 'Add Money'}
            </Button>

          </Modal.Footer>

        </Modal>

      </Container>
    </main>
  )
}

export default Savings