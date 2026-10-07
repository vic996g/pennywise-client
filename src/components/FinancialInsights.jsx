import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function FinancialInsights({
  transactions = [],
}) {
  // =========================
  // TOTAL INCOME
  // =========================

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

  // =========================
  // TOTAL EXPENSES
  // =========================

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

  // =========================
  // SAVINGS RATE
  // =========================

  const savingsRate =
    totalIncome > 0
      ? (
          ((totalIncome -
            totalExpenses) /
            totalIncome) *
          100
        )
      : 0

  // =========================
  // TRANSACTION COUNT
  // =========================

  const transactionCount =
    transactions.length

  // =========================
  // SPENDING BY CATEGORY
  // =========================

  const spendingByCategory = {}

  transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .forEach((transaction) => {
      const category =
        transaction.category

      const amount =
        Number(transaction.amount)

      if (
        spendingByCategory[category]
      ) {
        spendingByCategory[category] +=
          amount
      } else {
        spendingByCategory[category] =
          amount
      }
    })

  // =========================
  // HIGHEST SPENDING CATEGORY
  // =========================

  let highestSpendingCategory =
    'No spending yet'

  let highestSpendingAmount = 0

  Object.entries(
    spendingByCategory
  ).forEach(
    ([category, amount]) => {
      if (
        amount >
        highestSpendingAmount
      ) {
        highestSpendingAmount = amount

        highestSpendingCategory =
          category
      }
    }
  )

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">

        <h5 className="fw-bold mb-1">
          Financial Insights
        </h5>

        <p className="text-secondary mb-4">
          A quick overview of your
          financial activity.
        </p>

        <Row className="g-4">

          {/* Highest Spending */}

          <Col md={6} lg={3}>

            <div>
              <p className="text-secondary mb-1">
                Highest Spending
              </p>

              <h5 className="fw-bold mb-1">
                {highestSpendingCategory}
              </h5>

              <span className="text-danger">
                ₦
                {highestSpendingAmount.toLocaleString()}
              </span>
            </div>

          </Col>


          {/* Savings Rate */}

          <Col md={6} lg={3}>

            <div>
              <p className="text-secondary mb-1">
                Savings Rate
              </p>

              <h5 className="fw-bold mb-1">
                {savingsRate.toFixed(1)}%
              </h5>

              <span className="text-secondary">
                of income retained
              </span>
            </div>

          </Col>


          {/* Total Transactions */}

          <Col md={6} lg={3}>

            <div>
              <p className="text-secondary mb-1">
                Transactions
              </p>

              <h5 className="fw-bold mb-1">
                {transactionCount}
              </h5>

              <span className="text-secondary">
                recorded
              </span>
            </div>

          </Col>


          {/* Total Spending */}

          <Col md={6} lg={3}>

            <div>
              <p className="text-secondary mb-1">
                Total Spending
              </p>

              <h5 className="fw-bold mb-1">
                ₦
                {totalExpenses.toLocaleString()}
              </h5>

              <span className="text-secondary">
                in selected period
              </span>
            </div>

          </Col>

        </Row>

      </Card.Body>
    </Card>
  )
}

export default FinancialInsights