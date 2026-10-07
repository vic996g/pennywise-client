import { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'

import { Link } from 'react-router-dom'

import api from '../services/api'

import RecentTransactions from '../components/RecentTransactions'
import SpendingChart from '../components/SpendingChart'
import Loading from '../components/Loading'

function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [budgets, setBudgets] = useState([])
  const [savingsGoals, setSavingsGoals] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ==================================
  // FETCH DASHBOARD DATA
  // ==================================

  useEffect(() => {
    const fetchDashboardData = async () => {
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

        const [
          transactionsResponse,
          budgetsResponse,
          savingsResponse,
        ] = await Promise.all([
          api.get(
            '/transactions',
            config
          ),

          api.get(
            '/budgets',
            config
          ),

          api.get(
            '/savings',
            config
          ),
        ])

        setTransactions(
          transactionsResponse.data
            .transactions || []
        )

        setBudgets(
          budgetsResponse.data
            .budgets || []
        )

        setSavingsGoals(
          savingsResponse.data
            .savingsGoals || []
        )
      } catch (error) {
        console.error(
          'Dashboard error:',
          error
        )

        setError(
          error.response?.data?.message ||
            'Unable to load dashboard.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // ==================================
  // FINANCIAL CALCULATIONS
  // ==================================

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

  const availableBalance =
    totalIncome - totalExpenses

  // ==================================
  // CURRENT MONTH
  // ==================================

  const now = new Date()

  const currentMonth =
    now.getMonth() + 1

  const currentYear =
    now.getFullYear()

  const currentMonthBudgets =
    budgets.filter(
      (budget) =>
        Number(budget.month) ===
          currentMonth &&
        Number(budget.year) ===
          currentYear
    )

  // ==================================
  // BUDGET COMMITMENTS
  // ==================================

  const totalBudgetCommitments =
    currentMonthBudgets.reduce(
      (total, budget) => {
        const remaining =
          Math.max(
            0,
            Number(
              budget.remaining
            )
          )

        return total + remaining
      },
      0
    )

  // ==================================
  // SAFE TO SPEND
  // ==================================

  const safeToSpend =
    availableBalance -
    totalBudgetCommitments

  // ==================================
  // FINANCIAL HEALTH
  // ==================================

  const savingsRate =
    totalIncome > 0
      ? (
          ((totalIncome -
            totalExpenses) /
            totalIncome) *
          100
        )
      : 0

  const expenseRate =
    totalIncome > 0
      ? (
          (totalExpenses /
            totalIncome) *
          100
        )
      : 0

  const totalBudgetAmount =
    currentMonthBudgets.reduce(
      (total, budget) =>
        total +
        Number(budget.amount),
      0
    )

  const totalBudgetSpent =
    currentMonthBudgets.reduce(
      (total, budget) =>
        total +
        Number(budget.spent),
      0
    )

  const budgetUtilization =
    totalBudgetAmount > 0
      ? (
          (totalBudgetSpent /
            totalBudgetAmount) *
          100
        )
      : 0

  // ==================================
  // LOADING STATE
  // ==================================

  if (loading) {
  return (
    <Loading message="Loading your dashboard..." />
  )
}

  // ==================================
  // ERROR STATE
  // ==================================

  if (error) {
    return (
      <div className="container-fluid py-5">

        <div className="alert alert-danger">
          {error}
        </div>

      </div>
    )
  }

  return (
    <div className="container-fluid py-4">

      {/* ==================================
          HEADER
      ================================== */}

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Dashboard
          </h2>

          <p className="text-secondary mb-0">
            Here's an overview of your finances.
          </p>

        </div>

        <Button
          as={Link}
          to="/transactions"
          variant="dark"
        >
          + Add Transaction
        </Button>

      </div>


      {/* ==================================
          QUICK ACTIONS
      ================================== */}

      <Row className="g-4 mb-4">

        <Col md={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <h5 className="fw-bold mb-2">
                Add Transaction
              </h5>

              <p className="text-secondary mb-3">
                Record your income or expenses.
              </p>

              <Button
                as={Link}
                to="/transactions"
                variant="dark"
              >
                Add Transaction
              </Button>

            </Card.Body>

          </Card>

        </Col>


        <Col md={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <h5 className="fw-bold mb-2">
                Create Budget
              </h5>

              <p className="text-secondary mb-3">
                Set a spending limit for a category.
              </p>

              <Button
                as={Link}
                to="/budgets"
                variant="dark"
              >
                Create Budget
              </Button>

            </Card.Body>

          </Card>

        </Col>


        <Col md={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <h5 className="fw-bold mb-2">
                Add Savings Goal
              </h5>

              <p className="text-secondary mb-3">
                Start saving towards something important.
              </p>

              <Button
                as={Link}
                to="/savings"
                variant="dark"
              >
                Add Savings Goal
              </Button>

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* ==================================
          FINANCIAL SUMMARY
      ================================== */}

      <Row className="g-4 mb-4">

        {/* AVAILABLE BALANCE */}

        <Col md={6} lg={3}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Available Balance
              </p>

              <h3 className="fw-bold mb-0">
                ₦
                {availableBalance.toLocaleString()}
              </h3>

            </Card.Body>

          </Card>

        </Col>


        {/* TOTAL INCOME */}

        <Col md={6} lg={3}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

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


        {/* TOTAL EXPENSES */}

        <Col md={6} lg={3}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

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


        {/* SAFE TO SPEND */}

        <Col md={6} lg={3}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Safe to Spend
              </p>

              <h3
                className={`fw-bold ${
                  safeToSpend >= 0
                    ? 'text-success'
                    : 'text-danger'
                }`}
              >
                ₦
                {Math.max(
                  safeToSpend,
                  0
                ).toLocaleString()}
              </h3>

              <small className="text-secondary">
                After budget commitments
              </small>

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* ==================================
          BUDGET COMMITMENTS
          + SAFE-TO-SPEND EXPLANATION
      ================================== */}

      <Row className="g-4 mb-4">

        <Col md={6}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Budget Commitments
              </p>

              <h4 className="fw-bold mb-2">
                ₦
                {totalBudgetCommitments.toLocaleString()}
              </h4>

              <p className="text-secondary mb-0">
                Money reserved for your remaining
                monthly budgets.
              </p>

            </Card.Body>

          </Card>

        </Col>


        <Col md={6}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Safe-to-Spend Calculation
              </p>

              <h6 className="fw-semibold mb-2">

                ₦
                {availableBalance.toLocaleString()}

                {' - '}

                ₦
                {totalBudgetCommitments.toLocaleString()}

                {' = '}

                ₦
                {Math.max(
                  safeToSpend,
                  0
                ).toLocaleString()}

              </h6>

              <p className="text-secondary mb-0">
                Available balance minus remaining
                budget commitments.
              </p>

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* ==================================
          FINANCIAL HEALTH
      ================================== */}

      <Row className="g-4 mb-4">

        {/* SAVINGS RATE */}

        <Col md={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Savings Rate
              </p>

              <h3 className="fw-bold mb-2">
                {Math.max(
                  savingsRate,
                  0
                ).toFixed(1)}%
              </h3>

              <ProgressBar
                now={Math.min(
                  Math.max(
                    savingsRate,
                    0
                  ),
                  100
                )}
                variant="success"
              />

              <small className="text-secondary d-block mt-2">
                Percentage of income remaining
                after expenses.
              </small>

            </Card.Body>

          </Card>

        </Col>


        {/* EXPENSE RATE */}

        <Col md={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Expense Rate
              </p>

              <h3 className="fw-bold mb-2">
                {expenseRate.toFixed(1)}%
              </h3>

              <ProgressBar
                now={Math.min(
                  expenseRate,
                  100
                )}
                variant="danger"
              />

              <small className="text-secondary d-block mt-2">
                Percentage of income spent.
              </small>

            </Card.Body>

          </Card>

        </Col>


        {/* BUDGET UTILIZATION */}

        <Col md={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <p className="text-secondary mb-2">
                Budget Utilization
              </p>

              <h3 className="fw-bold mb-2">
                {budgetUtilization.toFixed(1)}%
              </h3>

              <ProgressBar
                now={Math.min(
                  budgetUtilization,
                  100
                )}
                variant={
                  budgetUtilization > 100
                    ? 'danger'
                    : 'dark'
                }
              />

              <small className="text-secondary d-block mt-2">
                Current month's budget already spent.
              </small>

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* ==================================
          SPENDING CHART + BUDGET OVERVIEW
      ================================== */}

      <Row className="g-4 mb-4">

        {/* SPENDING CHART */}

        <Col lg={8}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <h5 className="fw-bold mb-1">
                Spending Overview
              </h5>

              <p className="text-secondary mb-4">
                See where your money is going.
              </p>

              <SpendingChart
                transactions={transactions}
              />

            </Card.Body>

          </Card>

        </Col>


        {/* BUDGET OVERVIEW */}

        <Col lg={4}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="fw-bold mb-0">
                  Budget Overview
                </h5>

                <Button
                  as={Link}
                  to="/budgets"
                  variant="link"
                  className="p-0 text-decoration-none"
                >
                  View All
                </Button>

              </div>

              {currentMonthBudgets.length === 0 ? (

                <div>

                  <p className="text-secondary">
                    No budgets created for this month.
                  </p>

                  <Button
                    as={Link}
                    to="/budgets"
                    variant="outline-dark"
                    size="sm"
                  >
                    Create Budget
                  </Button>

                </div>

              ) : (

                currentMonthBudgets
                  .slice(0, 4)
                  .map((budget) => {

                    const percentage =
                      Math.min(
                        Number(
                          budget.percentageUsed
                        ) || 0,
                        100
                      )

                    const isOverBudget =
                      Number(
                        budget.remaining
                      ) < 0

                    return (
                      <div
                        key={budget._id}
                        className="mb-4"
                      >

                        <div className="d-flex justify-content-between mb-1">

                          <span className="fw-semibold">
                            {budget.category}
                          </span>

                          <span className="text-secondary">
                            ₦
                            {Number(
                              budget.spent
                            ).toLocaleString()}
                            {' / '}
                            ₦
                            {Number(
                              budget.amount
                            ).toLocaleString()}
                          </span>

                        </div>

                        <ProgressBar
                          now={percentage}
                          variant={
                            isOverBudget
                              ? 'danger'
                              : 'dark'
                          }
                        />

                        <div className="d-flex justify-content-between mt-1">

                          <small
                            className={
                              isOverBudget
                                ? 'text-danger'
                                : 'text-secondary'
                            }
                          >
                            {isOverBudget
                              ? 'Over budget'
                              : `${percentage.toFixed(0)}% used`}
                          </small>

                          <small className="text-secondary">

                            ₦
                            {Math.abs(
                              Number(
                                budget.remaining
                              )
                            ).toLocaleString()}

                            {' '}

                            {isOverBudget
                              ? 'over'
                              : 'remaining'}

                          </small>

                        </div>

                      </div>
                    )
                  })
              )}

            </Card.Body>

          </Card>

        </Col>

      </Row>


      {/* ==================================
          RECENT TRANSACTIONS + SAVINGS
      ================================== */}

      <Row className="g-4 mb-4">

        {/* RECENT TRANSACTIONS */}

        <Col lg={7}>

          <RecentTransactions
            transactions={transactions}
          />

        </Col>


        {/* SAVINGS OVERVIEW */}

        <Col lg={5}>

          <Card className="border-0 shadow-sm h-100">

            <Card.Body className="p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-bold mb-0">
                  Savings Overview
                </h5>

                <Button
                  as={Link}
                  to="/savings"
                  variant="link"
                  className="p-0 text-decoration-none"
                >
                  View All
                </Button>

              </div>

              {savingsGoals.length === 0 ? (

                <div>

                  <p className="text-secondary">
                    You don't have any savings goals yet.
                  </p>

                  <Button
                    as={Link}
                    to="/savings"
                    variant="outline-dark"
                    size="sm"
                  >
                    Create Savings Goal
                  </Button>

                </div>

              ) : (

                savingsGoals
                  .slice(0, 4)
                  .map((goal) => {

                    const percentage =
                      Math.min(
                        Number(
                          goal.percentage
                        ) || 0,
                        100
                      )

                    const isCompleted =
                      percentage >= 100

                    return (
                      <div
                        key={goal._id}
                        className="mb-4"
                      >

                        <div className="d-flex justify-content-between align-items-center mb-1">

                          <span className="fw-semibold">
                            {goal.name}
                          </span>

                          {isCompleted && (
                            <span className="badge text-bg-success">
                              Completed
                            </span>
                          )}

                        </div>

                        <ProgressBar
                          now={percentage}
                          variant="success"
                        />

                        <div className="d-flex justify-content-between mt-1">

                          <small className="text-secondary">
                            ₦
                            {Number(
                              goal.currentAmount
                            ).toLocaleString()}
                            {' / '}
                            ₦
                            {Number(
                              goal.targetAmount
                            ).toLocaleString()}
                          </small>

                          <small className="text-secondary">
                            {percentage.toFixed(0)}%
                          </small>

                        </div>

                        {!isCompleted && (
                          <small className="text-secondary">
                            ₦
                            {Number(
                              goal.remaining
                            ).toLocaleString()}
                            {' '}
                            remaining
                          </small>
                        )}

                      </div>
                    )
                  })
              )}

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </div>
  )
}

export default Dashboard