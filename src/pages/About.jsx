import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function About() {
  return (
    <main>

      {/* Hero Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center py-4">

            <Col lg={7}>
              <span className="text-success fw-semibold">
                ABOUT PENNYWISE
              </span>

              <h1 className="display-5 fw-bold mt-2">
                Take control of your money with confidence.
              </h1>

              <p className="lead text-secondary mt-4">
                PENNYWISE is a personal finance platform designed to
                make money management simpler, clearer, and easier to
                understand.
              </p>

              <p className="text-secondary">
                From tracking everyday transactions to creating
                budgets, monitoring savings goals, and understanding
                spending patterns, PENNYWISE brings your financial
                information together in one place.
              </p>

            </Col>

            <Col lg={5} className="mt-5 mt-lg-0">
              <div className="bg-white rounded-4 shadow-sm p-4">

                <div className="mb-4">
                  <small className="text-secondary">
                    Your financial overview
                  </small>

                  <h3 className="fw-bold mt-1">
                    Everything in one place
                  </h3>
                </div>

                <div className="d-flex justify-content-between border-bottom py-3">
                  <span className="text-secondary">
                    Income
                  </span>

                  <span className="text-success fw-bold">
                    Track
                  </span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-3">
                  <span className="text-secondary">
                    Expenses
                  </span>

                  <span className="text-success fw-bold">
                    Monitor
                  </span>
                </div>

                <div className="d-flex justify-content-between border-bottom py-3">
                  <span className="text-secondary">
                    Budgets
                  </span>

                  <span className="text-success fw-bold">
                    Plan
                  </span>
                </div>

                <div className="d-flex justify-content-between py-3">
                  <span className="text-secondary">
                    Savings
                  </span>

                  <span className="text-success fw-bold">
                    Grow
                  </span>
                </div>

              </div>
            </Col>

          </Row>
        </Container>
      </section>


      {/* Mission Section */}
      <section className="py-5">
        <Container>

          <Row className="justify-content-center">
            <Col lg={8} className="text-center">

              <span className="text-success fw-semibold">
                OUR MISSION
              </span>

              <h2 className="fw-bold mt-2">
                Make personal finance easier to understand.
              </h2>

              <p className="text-secondary mt-4">
                Managing money can become complicated when income,
                expenses, budgets, and savings are spread across
                different places. PENNYWISE brings these pieces
                together so users can have a clearer picture of
                their finances.
              </p>

            </Col>
          </Row>

        </Container>
      </section>


      {/* What We Offer */}
      <section className="py-5 bg-light">
        <Container>

          <div className="text-center mb-5">
            <span className="text-success fw-semibold">
              WHAT PENNYWISE OFFERS
            </span>

            <h2 className="fw-bold mt-2">
              Simple tools for everyday money management
            </h2>

            <p className="text-secondary">
              Everything you need to organize and understand your
              personal finances.
            </p>
          </div>


          <Row className="g-4">

            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">

                  <div className="fs-1 mb-3">
                    💳
                  </div>

                  <h5 className="fw-bold">
                    Transactions
                  </h5>

                  <p className="text-secondary">
                    Record income and expenses so you always know
                    where your money is going.
                  </p>

                </Card.Body>
              </Card>
            </Col>


            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">

                  <div className="fs-1 mb-3">
                    📅
                  </div>

                  <h5 className="fw-bold">
                    Budgets
                  </h5>

                  <p className="text-secondary">
                    Set spending limits and monitor your progress
                    throughout the month.
                  </p>

                </Card.Body>
              </Card>
            </Col>


            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">

                  <div className="fs-1 mb-3">
                    🎯
                  </div>

                  <h5 className="fw-bold">
                    Savings Goals
                  </h5>

                  <p className="text-secondary">
                    Set financial targets and track your progress
                    toward reaching them.
                  </p>

                </Card.Body>
              </Card>
            </Col>


            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm rounded-4">
                <Card.Body className="p-4">

                  <div className="fs-1 mb-3">
                    📊
                  </div>

                  <h5 className="fw-bold">
                    Analytics
                  </h5>

                  <p className="text-secondary">
                    Turn your financial activity into useful visual
                    insights.
                  </p>

                </Card.Body>
              </Card>
            </Col>

          </Row>

        </Container>
      </section>


      {/* How It Works */}
      <section className="py-5">
        <Container>

          <div className="text-center mb-5">
            <span className="text-success fw-semibold">
              HOW IT WORKS
            </span>

            <h2 className="fw-bold mt-2">
              Your money. Your information. Your decisions.
            </h2>
          </div>


          <Row className="g-4">

            <Col md={4}>
              <div className="text-center p-4">

                <div className="display-6 fw-bold text-success">
                  01
                </div>

                <h5 className="fw-bold mt-3">
                  Record
                </h5>

                <p className="text-secondary">
                  Add your income and expenses as they happen.
                </p>

              </div>
            </Col>


            <Col md={4}>
              <div className="text-center p-4">

                <div className="display-6 fw-bold text-success">
                  02
                </div>

                <h5 className="fw-bold mt-3">
                  Understand
                </h5>

                <p className="text-secondary">
                  Review your balance, spending patterns, and
                  financial activity.
                </p>

              </div>
            </Col>


            <Col md={4}>
              <div className="text-center p-4">

                <div className="display-6 fw-bold text-success">
                  03
                </div>

                <h5 className="fw-bold mt-3">
                  Plan
                </h5>

                <p className="text-secondary">
                  Use budgets and savings goals to organize your
                  financial plans.
                </p>

              </div>
            </Col>

          </Row>

        </Container>
      </section>


      {/* CTA */}
      <section className="py-5">
        <Container>

          <div className="bg-success text-white rounded-4 p-5 text-center">

            <h2 className="fw-bold">
              Ready to get started?
            </h2>

            <p className="lead mt-3 mb-4">
              Create your PENNYWISE account and start organizing
              your finances.
            </p>

            <Button
              variant="light"
              size="lg"
              href="/register"
              className="px-4"
            >
              Create Account
            </Button>

          </div>

        </Container>
      </section>

    </main>
  )
}

export default About