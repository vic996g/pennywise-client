import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import SpendingChart from '../components/SpendingChart'
import FeatureCard from '../components/FeatureCard'

import { Link } from 'react-router-dom'

function Home() {

  // Sample transactions for the public Home page
  const sampleTransactions = [
    {
      _id: 'sample-1',
      type: 'expense',
      category: 'Food',
      amount: 45000,
    },

    {
      _id: 'sample-2',
      type: 'expense',
      category: 'Transport',
      amount: 25000,
    },

    {
      _id: 'sample-3',
      type: 'expense',
      category: 'Bills',
      amount: 60000,
    },

    {
      _id: 'sample-4',
      type: 'expense',
      category: 'Shopping',
      amount: 35000,
    },

    {
      _id: 'sample-5',
      type: 'expense',
      category: 'Entertainment',
      amount: 20000,
    },
  ]

  return (
    <main>

      {/* ================= HERO SECTION ================= */}

      <section className="py-5">

        <Container fluid className="px-4 px-lg-5">

          <Row className="align-items-center min-vh-75">

            {/* Hero Text */}

            <Col
              lg={6}
              className="text-center text-lg-start"
            >

              <h1 className="display-4 fw-bold">
                Take control of your money.
              </h1>

              <p className="lead text-secondary my-4">
                Track your income, manage expenses, build better
                budgets, and reach your savings goals with PENNYWISE.
              </p>

            </Col>


            {/* Hero Visual */}

            <Col
              lg={6}
              className="mt-5 mt-lg-0"
            >

              <div className="bg-light rounded-4 p-4 shadow-sm">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>

                    <small className="text-secondary">
                      Available Balance
                    </small>

                    <h3 className="fw-bold mb-0">
                      ₦245,000
                    </h3>

                  </div>

                  <span className="badge bg-success">
                    This Month
                  </span>

                </div>


                {/* Summary Cards */}

                <Row className="g-3">

                  <Col xs={6}>

                    <div className="bg-white rounded-3 p-3">

                      <small className="text-secondary">
                        Income
                      </small>

                      <h5 className="text-success fw-bold mb-0">
                        ₦450,000
                      </h5>

                    </div>

                  </Col>


                  <Col xs={6}>

                    <div className="bg-white rounded-3 p-3">

                      <small className="text-secondary">
                        Expenses
                      </small>

                      <h5 className="text-danger fw-bold mb-0">
                        ₦205,000
                      </h5>

                    </div>

                  </Col>

                </Row>


                {/* Spending Preview */}

                <div className="bg-white rounded-3 p-3 mt-3">

                  <div className="d-flex justify-content-between">

                    <small className="fw-bold">
                      Spending Overview
                    </small>

                    <small className="text-secondary">
                      September
                    </small>

                  </div>


                  <div
                    className="d-flex align-items-end gap-2 mt-4"
                    style={{ height: '100px' }}
                  >

                    <div
                      className="bg-success rounded-top"
                      style={{
                        width: '14%',
                        height: '40%',
                      }}
                    />

                    <div
                      className="bg-success rounded-top"
                      style={{
                        width: '14%',
                        height: '65%',
                      }}
                    />

                    <div
                      className="bg-success rounded-top"
                      style={{
                        width: '14%',
                        height: '50%',
                      }}
                    />

                    <div
                      className="bg-success rounded-top"
                      style={{
                        width: '14%',
                        height: '80%',
                      }}
                    />

                    <div
                      className="bg-success rounded-top"
                      style={{
                        width: '14%',
                        height: '55%',
                      }}
                    />

                    <div
                      className="bg-success rounded-top"
                      style={{
                        width: '14%',
                        height: '90%',
                      }}
                    />

                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= HOW IT WORKS ================= */}

      <section className="py-5 bg-light">

        <Container fluid className="px-4 px-lg-5">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              How PENNYWISE Works
            </h2>

            <p className="text-secondary">
              Simple tools to help you understand and manage your money.
            </p>

          </div>


          <Row className="g-4">

            <Col md={4}>

              <FeatureCard
                icon="💰"
                title="Log Your Money"
                description="Record your income and expenses whenever money comes in or goes out."
              />

            </Col>


            <Col md={4}>

              <FeatureCard
                icon="📊"
                title="See Your Balance"
                description="Instantly understand your income, expenses, balance, and safe-to-spend amount."
              />

            </Col>


            <Col md={4}>

              <FeatureCard
                icon="🎯"
                title="Grow Your Savings"
                description="Set savings goals and track your progress over time."
              />

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= FEATURES SECTION ================= */}

      <section className="py-5">

        <Container fluid className="px-4 px-lg-5">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Everything You Need to Manage Your Money
            </h2>

            <p className="text-secondary">
              PENNYWISE gives you simple tools to understand where your money
              goes and make better financial decisions.
            </p>

          </div>


          <Row className="g-4">

            <Col md={6} lg={3}>

              <FeatureCard
                icon="💳"
                title="Transactions"
                description="Record your income and expenses and keep track of every transaction."
              />

            </Col>


            <Col md={6} lg={3}>

              <FeatureCard
                icon="📅"
                title="Budgets"
                description="Create spending limits for different categories and monitor your progress."
              />

            </Col>


            <Col md={6} lg={3}>

              <FeatureCard
                icon="🎯"
                title="Savings Goals"
                description="Set financial targets and track how close you are to achieving them."
              />

            </Col>


            <Col md={6} lg={3}>

              <FeatureCard
                icon="📊"
                title="Analytics"
                description="Visualize your spending habits and understand your financial patterns."
              />

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= FINANCIAL CONTROL SECTION ================= */}

      <section className="py-5 bg-light">

        <Container fluid className="px-4 px-lg-5">

          <Row className="align-items-center">

            {/* Dashboard Preview */}

            <Col
              lg={6}
              className="mb-5 mb-lg-0"
            >

              <div className="bg-white rounded-4 shadow-sm p-4">

                <div className="mb-4">

                  <small className="text-secondary">
                    Available Balance
                  </small>

                  <h2 className="fw-bold mt-1">
                    ₦245,000
                  </h2>

                </div>


                <Row className="g-3">

                  <Col xs={6}>

                    <div className="bg-light rounded-3 p-3">

                      <small className="text-secondary">
                        Total Income
                      </small>

                      <h5 className="text-success fw-bold mt-2 mb-0">
                        ₦450,000
                      </h5>

                    </div>

                  </Col>


                  <Col xs={6}>

                    <div className="bg-light rounded-3 p-3">

                      <small className="text-secondary">
                        Total Expenses
                      </small>

                      <h5 className="text-danger fw-bold mt-2 mb-0">
                        ₦205,000
                      </h5>

                    </div>

                  </Col>

                </Row>


                <div className="mt-3 p-3 rounded-3 bg-success bg-opacity-10">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>

                      <small className="text-secondary">
                        Safe to Spend
                      </small>

                      <h5 className="fw-bold mb-0">
                        ₦120,000
                      </h5>

                    </div>

                    <span className="fs-3">
                      💰
                    </span>

                  </div>

                </div>

              </div>

            </Col>


            {/* Explanation */}

            <Col lg={6}>

              <div className="ps-lg-5">

                <span className="text-success fw-semibold">
                  FINANCIAL CONTROL
                </span>

                <h2 className="fw-bold mt-2">
                  Understand Your Money at a Glance
                </h2>

                <p className="text-secondary my-4">
                  PENNYWISE brings your income, expenses, balance, and
                  spending information together in one simple dashboard.
                </p>


                <div className="mb-3">

                  <h6 className="fw-bold">
                    ✓ Track your income
                  </h6>

                  <p className="text-secondary ms-4">
                    Know exactly how much money is coming in.
                  </p>

                </div>


                <div className="mb-3">

                  <h6 className="fw-bold">
                    ✓ Monitor your expenses
                  </h6>

                  <p className="text-secondary ms-4">
                    See where your money is going and identify spending patterns.
                  </p>

                </div>


                <div className="mb-3">

                  <h6 className="fw-bold">
                    ✓ Know your safe-to-spend amount
                  </h6>

                  <p className="text-secondary ms-4">
                    Understand what you can comfortably spend after
                    accounting for your financial plans.
                  </p>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= SAVINGS SECTION ================= */}

      <section className="py-5">

        <Container fluid className="px-4 px-lg-5">

          <Row className="align-items-center">

            {/* Explanation */}

            <Col
              lg={6}
              className="mb-5 mb-lg-0"
            >

              <span className="text-success fw-semibold">
                SAVINGS GOALS
              </span>

              <h2 className="fw-bold mt-2">
                Turn Your Financial Goals Into Progress
              </h2>

              <p className="text-secondary my-4">
                Whether you're saving for an emergency fund, a new laptop,
                a vacation, or something important to you, PENNYWISE helps
                you stay focused on your target.
              </p>


              <div className="mb-3">

                <h6 className="fw-bold">
                  ✓ Set a savings target
                </h6>

                <p className="text-secondary ms-4">
                  Choose how much you want to save and set a target date.
                </p>

              </div>


              <div className="mb-3">

                <h6 className="fw-bold">
                  ✓ Track your progress
                </h6>

                <p className="text-secondary ms-4">
                  See how much you've saved and how much remains.
                </p>

              </div>


              <div className="mb-3">

                <h6 className="fw-bold">
                  ✓ Stay motivated
                </h6>

                <p className="text-secondary ms-4">
                  Watch your progress grow as you get closer to your goal.
                </p>

              </div>

            </Col>


            {/* Savings Card */}

            <Col lg={6}>

              <div className="bg-light rounded-4 shadow-sm p-4">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <small className="text-secondary">
                      Savings Goal
                    </small>

                    <h4 className="fw-bold mt-1">
                      Emergency Fund
                    </h4>

                  </div>

                  <span className="fs-2">
                    🎯
                  </span>

                </div>


                <div className="mt-4">

                  <div className="d-flex justify-content-between">

                    <span className="text-secondary">
                      ₦180,000 saved
                    </span>

                    <span className="fw-bold">
                      60%
                    </span>

                  </div>


                  <div
                    className="progress mt-2"
                    style={{ height: '10px' }}
                  >

                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: '60%' }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />

                  </div>

                </div>


                <div className="d-flex justify-content-between mt-4">

                  <div>

                    <small className="text-secondary">
                      Current
                    </small>

                    <h6 className="fw-bold">
                      ₦180,000
                    </h6>

                  </div>


                  <div className="text-end">

                    <small className="text-secondary">
                      Target
                    </small>

                    <h6 className="fw-bold">
                      ₦300,000
                    </h6>

                  </div>

                </div>


                <div className="bg-white rounded-3 p-3 mt-3">

                  <div className="d-flex justify-content-between align-items-center">

                    <span className="text-secondary">
                      Remaining
                    </span>

                    <span className="fw-bold">
                      ₦120,000
                    </span>

                  </div>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= ANALYTICS SECTION ================= */}

      <section className="py-5 bg-light">

        <Container fluid className="px-4 px-lg-5">

          <div className="text-center mb-5">

            <span className="text-success fw-semibold">
              ANALYTICS
            </span>

            <h2 className="fw-bold mt-2">
              Understand Where Your Money Goes
            </h2>

            <p className="text-secondary">
              Visualize your spending habits and discover where your money
              is going each month.
            </p>

          </div>


          <Row className="align-items-center">

            {/* Chart */}

            <Col
              lg={7}
              className="mb-4 mb-lg-0"
            >

              <div className="bg-white rounded-4 shadow-sm p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>

                    <small className="text-secondary">
                      Monthly Spending
                    </small>

                    <h5 className="fw-bold mb-0">
                      September 2026
                    </h5>

                  </div>

                  <span className="badge bg-success">
                    Overview
                  </span>

                </div>


                {/* Sample transactions are used for the public Home page */}

                <SpendingChart
                  transactions={sampleTransactions}
                />

              </div>

            </Col>


            {/* Explanation */}

            <Col lg={5}>

              <div className="ps-lg-4">

                <h3 className="fw-bold">
                  Make Better Financial Decisions
                </h3>

                <p className="text-secondary my-4">
                  Numbers can be difficult to understand when they're
                  scattered across different places. PENNYWISE turns your
                  financial data into simple visual information.
                </p>


                <div className="mb-4">

                  <h6 className="fw-bold">
                    📊 See your spending patterns
                  </h6>

                  <p className="text-secondary ms-4">
                    Quickly identify the categories where you spend the most.
                  </p>

                </div>


                <div className="mb-4">

                  <h6 className="fw-bold">
                    💡 Identify opportunities
                  </h6>

                  <p className="text-secondary ms-4">
                    Use your spending information to understand where you
                    may be able to adjust your budget.
                  </p>

                </div>


                <div>

                  <h6 className="fw-bold">
                    🎯 Work toward your goals
                  </h6>

                  <p className="text-secondary ms-4">
                    Compare your spending and savings progress over time.
                  </p>

                </div>

              </div>

            </Col>

          </Row>

        </Container>

      </section>


      {/* ================= CTA SECTION ================= */}

      <section className="py-5">

        <Container fluid className="px-4 px-lg-5">

          <div className="bg-success text-white rounded-4 p-5 text-center">

            <h2 className="fw-bold">
              Ready to Take Control of Your Money?
            </h2>

            <p className="lead mt-3 mb-4">
              Start tracking your money, managing your budget,
              and working towards your financial goals with PENNYWISE.
            </p>


            <div className="d-flex justify-content-center gap-3 flex-wrap">

              <Button
                as={Link}
                to="/register"
                variant="light"
                size="lg"
                className="px-4"
              >
                Create Your Account
              </Button>

            </div>

          </div>

        </Container>

      </section>

    </main>
  )
}

export default Home