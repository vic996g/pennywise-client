import Card from 'react-bootstrap/Card'

function SummaryCard({ title, amount, textColor }) {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <p className="text-secondary mb-2">
          {title}
        </p>

        <h3 className={`fw-bold ${textColor}`}>
          ₦{amount.toLocaleString()}
        </h3>
      </Card.Body>
    </Card>
  )
}

export default SummaryCard