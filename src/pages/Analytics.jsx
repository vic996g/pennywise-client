import { useEffect, useState } from 'react'

import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

import api from '../services/api'

import SpendingChart from '../components/SpendingChart'
import MonthlySpendingChart from '../components/MonthlySpendingChart'
import SavingsProgress from '../components/SavingsProgress'
import IncomeExpenseChart from '../components/IncomeExpenseChart'
import FinancialInsights from '../components/FinancialInsights'
import Loading from '../components/Loading'


function Analytics() {
  const [transactions, setTransactions] =
    useState([])

  const [savingsGoals, setSavingsGoals] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const [selectedPeriod, setSelectedPeriod] =
    useState('all')


  // ==================================
  // FETCH ANALYTICS DATA
  // ==================================

  useEffect(() => {
    const fetchAnalyticsData = async () => {
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
          savingsResponse,
        ] = await Promise.all([
          api.get(
            '/transactions',
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

        setSavingsGoals(
          savingsResponse.data
            .savingsGoals || []
        )
      } catch (error) {
        console.error(
          'Analytics error:',
          error
        )

        setError(
          error.response?.data?.message ||
            'Unable to load analytics.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])


  // ==================================
  // FILTER TRANSACTIONS
  // ==================================

  const filteredTransactions =
    transactions.filter((transaction) => {
      if (selectedPeriod === 'all') {
        return true
      }

      const transactionDate =
        new Date(transaction.date)

      const now = new Date()


      // ==================================
      // THIS MONTH
      // ==================================

      if (
        selectedPeriod === 'month'
      ) {
        return (
          transactionDate.getMonth() ===
            now.getMonth() &&
          transactionDate.getFullYear() ===
            now.getFullYear()
        )
      }


      // ==================================
      // LAST 3 MONTHS
      // ==================================

      if (
        selectedPeriod === '3months'
      ) {
        const threeMonthsAgo =
          new Date()

        threeMonthsAgo.setMonth(
          now.getMonth() - 3
        )

        return (
          transactionDate >=
          threeMonthsAgo
        )
      }


      // ==================================
      // THIS YEAR
      // ==================================

      if (
        selectedPeriod === 'year'
      ) {
        return (
          transactionDate.getFullYear() ===
          now.getFullYear()
        )
      }

      return true
    })


  // ==================================
  // TOTAL INCOME
  // ==================================

  const totalIncome =
    filteredTransactions
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


  // ==================================
  // TOTAL EXPENSES
  // ==================================

  const totalExpenses =
    filteredTransactions
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


  // ==================================
  // BALANCE
  // ==================================

  const balance =
    totalIncome - totalExpenses


  // ==================================
  // LOADING STATE
  // ==================================

  if (loading) {
    return (
      <Loading
        message="Analyzing your finances..."
      />
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
          PAGE HEADER
      ================================== */}

      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Analytics
          </h2>

          <p className="text-secondary mb-0">
            Understand your income, expenses,
            spending habits and savings progress.
          </p>

        </div>


        {/* ==================================
            DATE FILTER
        ================================== */}

        <ButtonGroup>

          <Button
            variant={
              selectedPeriod === 'month'
                ? 'dark'
                : 'outline-dark'
            }
            onClick={() =>
              setSelectedPeriod('month')
            }
          >
            This Month
          </Button>

          <Button
            variant={
              selectedPeriod === '3months'
                ? 'dark'
                : 'outline-dark'
            }
            onClick={() =>
              setSelectedPeriod('3months')
            }
          >
            3 Months
          </Button>

          <Button
            variant={
              selectedPeriod === 'year'
                ? 'dark'
                : 'outline-dark'
            }
            onClick={() =>
              setSelectedPeriod('year')
            }
          >
            This Year
          </Button>

          <Button
            variant={
              selectedPeriod === 'all'
                ? 'dark'
                : 'outline-dark'
            }
            onClick={() =>
              setSelectedPeriod('all')
            }
          >
            All Time
          </Button>

        </ButtonGroup>

      </div>


      {/* ==================================
          NO TRANSACTIONS AT ALL
      ================================== */}

      {transactions.length === 0 ? (

        <Card className="border-0 shadow-sm mb-4">

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
                📊
              </span>

            </div>

            <h4 className="fw-bold mb-2">
              Your Financial Insights Will Appear Here
            </h4>

            <p
              className="text-secondary mx-auto mb-4"
              style={{
                maxWidth: '550px',
              }}
            >
              Start recording your income and
              expenses to see spending patterns,
              income trends, financial insights
              and savings progress.
            </p>

            <Button
              as={Link}
              to="/transactions"
              variant="success"
            >
              Add Your First Transaction
            </Button>

          </Card.Body>

        </Card>

      ) : filteredTransactions.length === 0 ? (

        /* ==================================
           NO DATA FOR SELECTED PERIOD
        ================================== */

        <Card className="border-0 shadow-sm mb-4">

          <Card.Body className="text-center py-5 px-4">

            <h5 className="fw-bold mb-2">
              No Transactions for This Period
            </h5>

            <p
              className="text-secondary mx-auto mb-4"
              style={{
                maxWidth: '500px',
              }}
            >
              You have transactions in PENNYWISE,
              but none match the selected date
              range. Try another period to see
              your financial data.
            </p>

            <Button
              variant="outline-dark"
              onClick={() =>
                setSelectedPeriod('all')
              }
            >
              View All Transactions
            </Button>

          </Card.Body>

        </Card>

      ) : (

        /* ==================================
           ANALYTICS DATA
        ================================== */

        <>

          {/* ==================================
              FINANCIAL SUMMARY
          ================================== */}

          <Row className="g-4 mb-4">

            {/* TOTAL INCOME */}

            <Col md={4}>

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

            <Col md={4}>

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


            {/* BALANCE */}

            <Col md={4}>

              <Card className="border-0 shadow-sm h-100">

                <Card.Body className="p-4">

                  <p className="text-secondary mb-2">
                    Balance
                  </p>

                  <h3 className="fw-bold mb-0">
                    ₦
                    {balance.toLocaleString()}
                  </h3>

                </Card.Body>

              </Card>

            </Col>

          </Row>


          {/* ==================================
              FINANCIAL INSIGHTS
          ================================== */}

          <Row className="g-4 mb-4">

            <Col xs={12}>

              <FinancialInsights
                transactions={
                  filteredTransactions
                }
              />

            </Col>

          </Row>


          {/* ==================================
              INCOME VS EXPENSES
          ================================== */}

          <Row className="g-4 mb-4">

            <Col lg={8}>

              <Card className="border-0 shadow-sm">

                <Card.Body className="p-4">

                  <h5 className="fw-bold mb-1">
                    Income vs Expenses
                  </h5>

                  <p className="text-secondary mb-4">
                    Compare your income with your
                    spending for the selected period.
                  </p>

                  <IncomeExpenseChart
                    transactions={
                      filteredTransactions
                    }
                  />

                </Card.Body>

              </Card>

            </Col>

          </Row>


          {/* ==================================
              SPENDING BY CATEGORY
          ================================== */}

          <Row className="g-4 mb-4">

            <Col lg={8}>

              <Card className="border-0 shadow-sm">

                <Card.Body className="p-4">

                  <h5 className="fw-bold mb-1">
                    Spending by Category
                  </h5>

                  <p className="text-secondary mb-4">
                    See where your money is going.
                  </p>

                  <SpendingChart
                    transactions={
                      filteredTransactions
                    }
                  />

                </Card.Body>

              </Card>

            </Col>

          </Row>


          {/* ==================================
              MONTHLY SPENDING
          ================================== */}

          <Row className="g-4 mb-4">

            <Col lg={8}>

              <Card className="border-0 shadow-sm">

                <Card.Body className="p-4">

                  <h5 className="fw-bold mb-1">
                    Monthly Spending
                  </h5>

                  <p className="text-secondary mb-4">
                    Track how your spending changes
                    over time.
                  </p>

                  <MonthlySpendingChart
                    transactions={
                      filteredTransactions
                    }
                  />

                </Card.Body>

              </Card>

            </Col>

          </Row>


          {/* ==================================
              SAVINGS PROGRESS
          ================================== */}

          <Row className="g-4 mb-4">

            <Col lg={8}>

              <SavingsProgress
                savingsGoals={savingsGoals}
              />

            </Col>

          </Row>

        </>

      )}

    </div>
  )
}

export default Analytics