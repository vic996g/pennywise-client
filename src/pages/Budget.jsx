import { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'

import api from '../services/api'
import Loading from '../components/Loading'


function Budgets() {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState(
    new Date().getFullYear()
  )

  const [budgets, setBudgets] = useState([])

  const [editingId, setEditingId] = useState(null)

  // Used when creating or editing a budget
  const [loading, setLoading] = useState(false)

  // Used when loading budgets from backend
  const [fetching, setFetching] = useState(true)

  const [deletingId, setDeletingId] = useState(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  // ==============================
  // BUDGET CATEGORIES
  // ==============================

  const categories = [
    'Food',
    'Transport',
    'Rent',
    'Bills',
    'Shopping',
    'Entertainment',
    'Health',
    'Education',
    'Other',
  ]


  // ==============================
  // MONTHS
  // ==============================

  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ]


  // ==============================
  // GET BUDGETS
  // ==============================

  const getBudgets = async () => {
    try {
      setError('')
      setFetching(true)

      const token =
        localStorage.getItem('token')

      const response =
        await api.get(
          '/budgets',
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setBudgets(
        response.data.budgets || []
      )
    } catch (error) {
      console.error(
        'Failed to get budgets:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to load budgets.'
      )
    } finally {
      setFetching(false)
    }
  }


  // ==============================
  // LOAD BUDGETS
  // ==============================

  useEffect(() => {
    getBudgets()
  }, [])


  // ==============================
  // RESET FORM
  // ==============================

  const resetForm = () => {
    setCategory('')
    setAmount('')
    setMonth('')
    setYear(
      new Date().getFullYear()
    )
    setEditingId(null)
  }


  // ==============================
  // CREATE / EDIT BUDGET
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    if (
      !category ||
      !amount ||
      !month ||
      !year
    ) {
      setError(
        'Please complete all budget fields.'
      )

      return
    }

    if (Number(amount) <= 0) {
      setError(
        'Budget amount must be greater than zero.'
      )

      return
    }

    if (Number(year) < 2020) {
      setError(
        'Please enter a valid year.'
      )

      return
    }

    try {
      setLoading(true)

      const token =
        localStorage.getItem('token')

      const budgetData = {
        category,
        amount: Number(amount),
        month: Number(month),
        year: Number(year),
      }

      let response

      if (editingId) {
        response =
          await api.put(
            `/budgets/${editingId}`,
            budgetData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )
      } else {
        response =
          await api.post(
            '/budgets',
            budgetData,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )
      }

      setMessage(
        response.data.message
      )

      resetForm()

      await getBudgets()
    } catch (error) {
      console.error(
        'Failed to save budget:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to save budget.'
      )
    } finally {
      setLoading(false)
    }
  }


  // ==============================
  // EDIT BUDGET
  // ==============================

  const handleEdit = (budget) => {
    setMessage('')
    setError('')

    setEditingId(budget._id)
    setCategory(budget.category)
    setAmount(budget.amount)
    setMonth(budget.month)
    setYear(budget.year)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  // ==============================
  // CANCEL EDIT
  // ==============================

  const handleCancelEdit = () => {
    resetForm()

    setMessage('')
    setError('')
  }


  // ==============================
  // DELETE BUDGET
  // ==============================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this budget?'
      )

    if (!confirmDelete) {
      return
    }

    try {
      setMessage('')
      setError('')
      setDeletingId(id)

      const token =
        localStorage.getItem('token')

      const response =
        await api.delete(
          `/budgets/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setMessage(
        response.data.message
      )

      await getBudgets()
    } catch (error) {
      console.error(
        'Failed to delete budget:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to delete budget.'
      )
    } finally {
      setDeletingId(null)
    }
  }


  // ==============================
  // GET MONTH NAME
  // ==============================

  const getMonthName = (monthNumber) => {
    const month =
      months.find(
        (item) =>
          item.value ===
          Number(monthNumber)
      )

    return month
      ? month.name
      : monthNumber
  }


  // ==============================
  // INITIAL LOADING STATE
  // ==============================

  if (fetching) {
    return (
      <Loading
        message="Loading your budgets..."
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
            Budgets
          </h2>

          <p className="text-secondary">
            Set spending limits and track your
            monthly spending.
          </p>

        </div>


        {/* ALERTS */}

        {message && (
          <Alert
            variant="success"
            dismissible
            onClose={() =>
              setMessage('')
            }
          >
            {message}
          </Alert>
        )}

        {error && (
          <Alert
            variant="danger"
            dismissible
            onClose={() =>
              setError('')
            }
          >
            {error}
          </Alert>
        )}


        {/* MAIN CONTENT */}

        <Row className="g-4">

          {/* BUDGET FORM */}

          <Col lg={4}>

            <Card className="border-0 shadow-sm">

              <Card.Body className="p-4">

                <h5 className="fw-bold mb-4">

                  {editingId
                    ? 'Edit Budget'
                    : 'Create Budget'}

                </h5>


                <Form
                  onSubmit={handleSubmit}
                >

                  {/* CATEGORY */}

                  <Form.Group className="mb-3">

                    <Form.Label>
                      Category
                    </Form.Label>

                    <Form.Select
                      value={category}
                      onChange={(e) =>
                        setCategory(
                          e.target.value
                        )
                      }
                      required
                    >

                      <option value="">
                        Select category
                      </option>

                      {categories.map(
                        (item) => (
                          <option
                            key={item}
                            value={item}
                          >
                            {item}
                          </option>
                        )
                      )}

                    </Form.Select>

                  </Form.Group>


                  {/* AMOUNT */}

                  <Form.Group className="mb-3">

                    <Form.Label>
                      Budget Amount
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="1"
                      placeholder="Enter budget amount"
                      value={amount}
                      onChange={(e) =>
                        setAmount(
                          e.target.value
                        )
                      }
                      required
                    />

                  </Form.Group>


                  {/* MONTH */}

                  <Form.Group className="mb-3">

                    <Form.Label>
                      Month
                    </Form.Label>

                    <Form.Select
                      value={month}
                      onChange={(e) =>
                        setMonth(
                          e.target.value
                        )
                      }
                      required
                    >

                      <option value="">
                        Select month
                      </option>

                      {months.map(
                        (item) => (
                          <option
                            key={item.value}
                            value={item.value}
                          >
                            {item.name}
                          </option>
                        )
                      )}

                    </Form.Select>

                  </Form.Group>


                  {/* YEAR */}

                  <Form.Group className="mb-4">

                    <Form.Label>
                      Year
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="2020"
                      value={year}
                      onChange={(e) =>
                        setYear(
                          e.target.value
                        )
                      }
                      required
                    />

                  </Form.Group>


                  {/* SUBMIT */}

                  <Button
                    variant="success"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading
                      ? 'Saving...'
                      : editingId
                        ? 'Save Changes'
                        : 'Create Budget'}
                  </Button>


                  {/* CANCEL */}

                  {editingId && (
                    <Button
                      variant="outline-secondary"
                      type="button"
                      className="w-100 mt-2"
                      onClick={
                        handleCancelEdit
                      }
                    >
                      Cancel Edit
                    </Button>
                  )}

                </Form>

              </Card.Body>

            </Card>

          </Col>


          {/* BUDGET CARDS */}

          <Col lg={8}>

            <Row className="g-4">

              {budgets.length === 0 ? (

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
                        No Budgets Yet
                      </h5>

                      <p
                        className="text-secondary mb-0 mx-auto"
                        style={{
                          maxWidth: '450px',
                        }}
                      >
                        Create your first budget
                        to set a spending limit
                        and keep track of your
                        expenses throughout the
                        month.
                      </p>

                    </Card.Body>

                  </Card>

                </Col>

              ) : (

                budgets.map((budget) => {

                  const spent =
                    Number(
                      budget.spent || 0
                    )

                  const budgetAmount =
                    Number(
                      budget.amount || 0
                    )

                  const remaining =
                    Number(
                      budget.remaining ??
                      budgetAmount - spent
                    )

                  const percentageUsed =
                    Number(
                      budget.percentageUsed || 0
                    )

                  const progress =
                    Math.min(
                      Math.max(
                        percentageUsed,
                        0
                      ),
                      100
                    )

                  const isOverBudget =
                    remaining < 0


                  return (
                    <Col
                      md={6}
                      key={budget._id}
                    >

                      <Card className="border-0 shadow-sm h-100">

                        <Card.Body className="p-4">

                          <div className="d-flex justify-content-between align-items-start mb-3">

                            <div>

                              <h5 className="fw-bold mb-1">
                                {budget.category}
                              </h5>

                              <small className="text-secondary">
                                {getMonthName(
                                  budget.month
                                )}{' '}
                                {budget.year}
                              </small>

                            </div>

                            <span className="fw-bold">
                              ₦
                              {budgetAmount.toLocaleString()}
                            </span>

                          </div>


                          {/* SPENT */}

                          <div className="d-flex justify-content-between mb-2">

                            <span className="text-secondary">
                              Spent
                            </span>

                            <span className="fw-semibold">
                              ₦
                              {spent.toLocaleString()}
                            </span>

                          </div>


                          {/* PROGRESS */}

                          <ProgressBar
                            now={progress}
                            label={`${Math.round(
                              percentageUsed
                            )}%`}
                            variant={
                              isOverBudget
                                ? 'danger'
                                : percentageUsed >= 80
                                  ? 'warning'
                                  : 'success'
                            }
                            className="mb-3"
                          />


                          {/* REMAINING */}

                          <div className="d-flex justify-content-between mb-3">

                            <span className="text-secondary">

                              {isOverBudget
                                ? 'Over budget'
                                : 'Remaining'}

                            </span>

                            <span
                              className={
                                isOverBudget
                                  ? 'text-danger fw-bold'
                                  : 'text-success fw-bold'
                              }
                            >

                              {isOverBudget
                                ? '-'
                                : ''}

                              ₦
                              {Math.abs(
                                remaining
                              ).toLocaleString()}

                            </span>

                          </div>


                          {/* ACTIONS */}

                          <div className="d-flex gap-2">

                            <Button
                              variant="outline-primary"
                              size="sm"
                              onClick={() =>
                                handleEdit(
                                  budget
                                )
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              variant="outline-danger"
                              size="sm"
                              disabled={
                                deletingId ===
                                budget._id
                              }
                              onClick={() =>
                                handleDelete(
                                  budget._id
                                )
                              }
                            >

                              {deletingId ===
                              budget._id
                                ? 'Deleting...'
                                : 'Delete'}

                            </Button>

                          </div>

                        </Card.Body>

                      </Card>

                    </Col>
                  )
                })

              )}

            </Row>

          </Col>

        </Row>

      </Container>

    </main>
  )
}

export default Budgets