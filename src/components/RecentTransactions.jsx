import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

function RecentTransactions({ transactions }) {
  const recentTransactions = transactions.slice(0, 5)

  return (
    <Card className="border-0 shadow-sm mt-4">
      <Card.Body className="p-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0">
            Recent Transactions
          </h5>
        </div>

        {recentTransactions.length === 0 ? (
          <p className="text-secondary mb-0">
            No transactions yet.
          </p>
        ) : (
          <div className="table-responsive">
            <Table hover className="mb-0">

              <thead>
                <tr>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction._id}>

                    <td>
                      <span
                        className={
                          transaction.type === 'income'
                            ? 'text-success fw-semibold'
                            : 'text-danger fw-semibold'
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>

                    <td>
                      {transaction.category}
                    </td>

                    <td>
                      ₦
                      {Number(
                        transaction.amount
                      ).toLocaleString()}
                    </td>

                    <td>
                      {new Date(
                        transaction.date
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
  )
}

export default RecentTransactions