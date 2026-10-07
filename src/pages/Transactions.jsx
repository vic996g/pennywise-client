import { useEffect, useRef, useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'

import api from '../services/api'
import Loading from '../components/Loading'


function Transactions() {
  // ==============================
  // FORM STATE
  // ==============================

  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')


  // ==============================
  // TRANSACTIONS STATE
  // ==============================

  const [transactions, setTransactions] = useState([])


  // ==============================
  // UI STATE
  // ==============================

  // Used when saving or editing
  const [loading, setLoading] = useState(false)

  // Used when initially fetching transactions
  const [fetching, setFetching] = useState(true)

  const [deletingId, setDeletingId] = useState(null)
  const [editingId, setEditingId] = useState(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  // ==============================
  // FORM REFERENCE
  // ==============================

  const formSectionRef = useRef(null)


  // ==============================
  // FILTER STATE
  // ==============================

  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')


  // ==============================
  // FORM CATEGORIES
  // ==============================

  const categories =
    type === 'income'
      ? [
          'Salary',
          'Freelance',
          'Business',
          'Investment',
          'Gift',
          'Other',
        ]
      : [
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
  // GET TRANSACTIONS
  // ==============================

  const getTransactions = async () => {
    try {
      setError('')
      setFetching(true)

      const token =
        localStorage.getItem('token')

      const response =
        await api.get(
          '/transactions',
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

      setTransactions(
        response.data.transactions || []
      )
    } catch (error) {
      console.error(
        'Failed to get transactions:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to load transactions.'
      )
    } finally {
      setFetching(false)
    }
  }


  useEffect(() => {
    getTransactions()
  }, [])


  // ==============================
  // SCROLL TO FORM
  // ==============================

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }


  // ==============================
  // ADD / EDIT TRANSACTION
  // ==============================

  const handleSubmit = async (e) => {
    e.preventDefault()

    setMessage('')
    setError('')

    if (!category || !amount) {
      setError(
        'Please enter a category and amount.'
      )

      return
    }

    if (Number(amount) <= 0) {
      setError(
        'Amount must be greater than zero.'
      )

      return
    }

    try {
      setLoading(true)

      const token =
        localStorage.getItem('token')

      if (editingId) {
        const response =
          await api.put(
            `/transactions/${editingId}`,
            {
              type,
              category,
              amount: Number(amount),
              description,
            },
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

        setEditingId(null)
      } else {
        const response =
          await api.post(
            '/transactions',
            {
              type,
              category,
              amount: Number(amount),
              description,
            },
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
      }

      setType('expense')
      setCategory('')
      setAmount('')
      setDescription('')

      await getTransactions()
    } catch (error) {
      console.error(
        'Failed to save transaction:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to save transaction.'
      )
    } finally {
      setLoading(false)
    }
  }


  // ==============================
  // EDIT TRANSACTION
  // ==============================

  const handleEdit = (transaction) => {
    setMessage('')
    setError('')

    setEditingId(transaction._id)
    setType(transaction.type)
    setCategory(transaction.category)
    setAmount(transaction.amount)
    setDescription(
      transaction.description || ''
    )

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  // ==============================
  // CANCEL EDIT
  // ==============================

  const handleCancelEdit = () => {
    setEditingId(null)
    setType('expense')
    setCategory('')
    setAmount('')
    setDescription('')

    setMessage('')
    setError('')
  }


  // ==============================
  // DELETE TRANSACTION
  // ==============================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        'Are you sure you want to delete this transaction?'
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
          `/transactions/${id}`,
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

      await getTransactions()
    } catch (error) {
      console.error(
        'Failed to delete transaction:',
        error
      )

      setError(
        error.response?.data?.message ||
          'Unable to delete transaction.'
      )
    } finally {
      setDeletingId(null)
    }
  }


  // ==============================
  // CLEAR FILTERS
  // ==============================

  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterType('all')
    setFilterCategory('all')
    setSortBy('date-desc')
  }


  // ==============================
  // FILTER CATEGORIES
  // ==============================

  const filterCategories = [
    ...new Set(
      transactions.map(
        (transaction) =>
          transaction.category
      )
    ),
  ].sort()


  // ==============================
  // FILTER + SORT TRANSACTIONS
  // ==============================

  const filteredTransactions =
    transactions
      .filter((transaction) => {
        const search =
          searchTerm
            .trim()
            .toLowerCase()

        const matchesSearch =
          !search ||
          transaction.category
            ?.toLowerCase()
            .includes(search) ||
          transaction.description
            ?.toLowerCase()
            .includes(search)

        const matchesType =
          filterType === 'all' ||
          transaction.type === filterType

        const matchesCategory =
          filterCategory === 'all' ||
          transaction.category ===
            filterCategory

        return (
          matchesSearch &&
          matchesType &&
          matchesCategory
        )
      })
      .sort((a, b) => {
        if (sortBy === 'date-desc') {
          return (
            new Date(b.date) -
            new Date(a.date)
          )
        }

        if (sortBy === 'date-asc') {
          return (
            new Date(a.date) -
            new Date(b.date)
          )
        }

        if (sortBy === 'amount-desc') {
          return (
            Number(b.amount) -
            Number(a.amount)
          )
        }

        if (sortBy === 'amount-asc') {
          return (
            Number(a.amount) -
            Number(b.amount)
          )
        }

        return 0
      })


  // ==============================
  // SUMMARY
  // ==============================

  const totalIncome =
    transactions
      .filter(
        (transaction) =>
          transaction.type === 'income'
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      )

  const totalExpenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type === 'expense'
      )
      .reduce(
        (total, transaction) =>
          total +
          Number(transaction.amount),
        0
      )


  // ==============================
  // INITIAL LOADING STATE
  // ==============================

  if (fetching) {
    return (
      <Loading
        message="Loading your transactions..."
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
            Transactions
          </h2>

          <p className="text-secondary mb-0">
            Record and manage your income
            and expenses.
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


        {/* SUMMARY CARDS */}

        <Row className="g-4 mb-4">

          <Col md={4}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-secondary mb-2">
                  Total Transactions
                </p>

                <h3 className="fw-bold mb-0">
                  {transactions.length}
                </h3>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-secondary mb-2">
                  Total Income
                </p>

                <h3 className="fw-bold text-success mb-0">
                  ₦
                  {totalIncome.toLocaleString()}
                </h3>

              </Card.Body>

            </Card>

          </Col>


          <Col md={4}>

            <Card className="border-0 shadow-sm h-100">

              <Card.Body>

                <p className="text-secondary mb-2">
                  Total Expenses
                </p>

                <h3 className="fw-bold text-danger mb-0">
                  ₦
                  {totalExpenses.toLocaleString()}
                </h3>

              </Card.Body>

            </Card>

          </Col>

        </Row>


        {/* MAIN CONTENT */}

        <Row className="g-4">

          {/* TRANSACTION FORM */}

          <Col
            lg={4}
            ref={formSectionRef}
          >

            <Card className="border-0 shadow-sm">

              <Card.Body className="p-4">

                <h5 className="fw-bold mb-4">

                  {editingId
                    ? 'Edit Transaction'
                    : 'Add Transaction'}

                </h5>


                <Form
                  onSubmit={
                    handleSubmit
                  }
                >

                  {/* TYPE */}

                  <Form.Group className="mb-3">

                    <Form.Label>
                      Transaction Type
                    </Form.Label>

                    <Form.Select
                      value={type}
                      onChange={(e) => {
                        setType(
                          e.target.value
                        )

                        setCategory('')
                      }}
                    >

                      <option value="expense">
                        Expense
                      </option>

                      <option value="income">
                        Income
                      </option>

                    </Form.Select>

                  </Form.Group>


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
                      Amount
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) =>
                        setAmount(
                          e.target.value
                        )
                      }
                    />

                  </Form.Group>


                  {/* DESCRIPTION */}

                  <Form.Group className="mb-4">

                    <Form.Label>
                      Description
                    </Form.Label>

                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Optional description"
                      value={
                        description
                      }
                      onChange={(e) =>
                        setDescription(
                          e.target.value
                        )
                      }
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
                        : 'Add Transaction'}
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


          {/* TRANSACTION LIST */}

          <Col lg={8}>

            <Card className="border-0 shadow-sm">

              <Card.Body className="p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>

                    <h5 className="fw-bold mb-1">
                      Transactions
                    </h5>

                    <p className="text-secondary mb-0">
                      Showing{' '}
                      {filteredTransactions.length}{' '}
                      of{' '}
                      {transactions.length}
                    </p>

                  </div>

                  <Badge
                    bg="success"
                    className="px-3 py-2"
                  >
                    {filteredTransactions.length}{' '}
                    Results
                  </Badge>

                </div>


                {/* SEARCH */}

                <Form.Group className="mb-3">

                  <Form.Label>
                    Search
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Search category or description..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(
                        e.target.value
                      )
                    }
                  />

                </Form.Group>


                {/* FILTERS */}

                <Row className="g-3 mb-4">

                  <Col md={4}>

                    <Form.Label>
                      Type
                    </Form.Label>

                    <Form.Select
                      value={filterType}
                      onChange={(e) =>
                        setFilterType(
                          e.target.value
                        )
                      }
                    >

                      <option value="all">
                        All Types
                      </option>

                      <option value="income">
                        Income
                      </option>

                      <option value="expense">
                        Expense
                      </option>

                    </Form.Select>

                  </Col>


                  <Col md={4}>

                    <Form.Label>
                      Category
                    </Form.Label>

                    <Form.Select
                      value={
                        filterCategory
                      }
                      onChange={(e) =>
                        setFilterCategory(
                          e.target.value
                        )
                      }
                    >

                      <option value="all">
                        All Categories
                      </option>

                      {filterCategories.map(
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

                  </Col>


                  <Col md={4}>

                    <Form.Label>
                      Sort By
                    </Form.Label>

                    <Form.Select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value
                        )
                      }
                    >

                      <option value="date-desc">
                        Newest First
                      </option>

                      <option value="date-asc">
                        Oldest First
                      </option>

                      <option value="amount-desc">
                        Highest Amount
                      </option>

                      <option value="amount-asc">
                        Lowest Amount
                      </option>

                    </Form.Select>

                  </Col>

                </Row>


                {/* CLEAR FILTERS */}

                <div className="mb-4">

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={
                      handleClearFilters
                    }
                  >
                    Clear Filters
                  </Button>

                </div>


                {/* EMPTY STATE */}

                {transactions.length === 0 ? (

                  <div className="text-center py-5 px-3">

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
                      No transactions yet
                    </h5>

                    <p className="text-secondary mb-4 mx-auto" style={{ maxWidth: '450px' }}>
                      Start tracking your money by
                      adding your first income or
                      expense. Your transactions will
                      appear here and help PENNYWISE
                      understand your spending habits.
                    </p>

                    <Button
                      variant="success"
                      onClick={scrollToForm}
                    >
                      Add Your First Transaction
                    </Button>

                  </div>

                ) : filteredTransactions.length === 0 ? (

                  <div className="text-center py-5 px-3">

                    <h5 className="fw-bold mb-2">
                      No matching transactions
                    </h5>

                    <p className="text-secondary mb-3">
                      We couldn't find any
                      transactions matching your
                      current search or filters.
                    </p>

                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={
                        handleClearFilters
                      }
                    >
                      Clear Filters
                    </Button>

                  </div>

                ) : (

                  <div className="table-responsive">

                    <Table
                      hover
                      className="align-middle"
                    >

                      <thead>

                        <tr>

                          <th>
                            Type
                          </th>

                          <th>
                            Category
                          </th>

                          <th>
                            Amount
                          </th>

                          <th>
                            Description
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

                        {filteredTransactions.map(
                          (transaction) => (

                            <tr
                              key={
                                transaction._id
                              }
                            >

                              <td>

                                <span
                                  className={
                                    transaction.type ===
                                    'income'
                                      ? 'text-success fw-semibold'
                                      : 'text-danger fw-semibold'
                                  }
                                >
                                  {transaction.type}
                                </span>

                              </td>


                              <td>
                                {
                                  transaction.category
                                }
                              </td>


                              <td>

                                <span
                                  className={
                                    transaction.type ===
                                    'income'
                                      ? 'text-success fw-semibold'
                                      : 'text-danger fw-semibold'
                                  }
                                >
                                  {transaction.type ===
                                  'income'
                                    ? '+'
                                    : '-'}
                                  ₦
                                  {Number(
                                    transaction.amount
                                  ).toLocaleString()}
                                </span>

                              </td>


                              <td>
                                {
                                  transaction.description ||
                                  '-'
                                }
                              </td>


                              <td>

                                {new Date(
                                  transaction.date
                                ).toLocaleDateString()}

                              </td>


                              <td>

                                <div className="d-flex gap-2">

                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() =>
                                      handleEdit(
                                        transaction
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
                                      transaction._id
                                    }
                                    onClick={() =>
                                      handleDelete(
                                        transaction._id
                                      )
                                    }
                                  >

                                    {deletingId ===
                                    transaction._id
                                      ? 'Deleting...'
                                      : 'Delete'}

                                  </Button>

                                </div>

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

          </Col>

        </Row>

      </Container>

    </main>
  )
}

export default Transactions