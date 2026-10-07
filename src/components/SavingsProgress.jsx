import Card from 'react-bootstrap/Card'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function SavingsProgress({
  savingsGoals = [],
}) {
  if (savingsGoals.length === 0) {
    return (
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">

          <h5 className="fw-bold mb-1">
            Savings Progress
          </h5>

          <p className="text-secondary mb-0">
            You have not created any savings
            goals yet.
          </p>

        </Card.Body>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">

        <h5 className="fw-bold mb-1">
          Savings Progress
        </h5>

        <p className="text-secondary mb-4">
          Track your progress toward your
          savings goals.
        </p>

        {savingsGoals.map((goal) => {
          const percentage = Math.min(
            Number(goal.percentage) || 0,
            100
          )

          const currentAmount =
            Number(goal.currentAmount) || 0

          const targetAmount =
            Number(goal.targetAmount) || 0

          const remaining = Math.max(
            targetAmount - currentAmount,
            0
          )

          return (
            <div
              key={goal._id}
              className="mb-4"
            >

              <div className="d-flex justify-content-between align-items-center mb-2">

                <h6 className="fw-bold mb-0">
                  {goal.name}
                </h6>

                <span className="fw-semibold">
                  {percentage.toFixed(0)}%
                </span>

              </div>

              <ProgressBar
                now={percentage}
                label={`${percentage.toFixed(0)}%`}
                className="mb-3"
                style={{
                  height: '10px',
                }}
              />

              <Row className="g-3">

                <Col xs={4}>
                  <small className="text-secondary d-block">
                    Saved
                  </small>

                  <span className="fw-semibold">
                    ₦
                    {currentAmount.toLocaleString()}
                  </span>
                </Col>

                <Col xs={4}>
                  <small className="text-secondary d-block">
                    Target
                  </small>

                  <span className="fw-semibold">
                    ₦
                    {targetAmount.toLocaleString()}
                  </span>
                </Col>

                <Col xs={4}>
                  <small className="text-secondary d-block">
                    Remaining
                  </small>

                  <span className="fw-semibold">
                    ₦
                    {remaining.toLocaleString()}
                  </span>
                </Col>

              </Row>

            </div>
          )
        })}

      </Card.Body>
    </Card>
  )
}

export default SavingsProgress