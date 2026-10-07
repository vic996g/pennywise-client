import Card from 'react-bootstrap/Card'

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="h-100 border-0 shadow-sm text-center p-4">
      <Card.Body>
        <div className="fs-1 mb-3">
          {icon}
        </div>

        <Card.Title className="fw-bold">
          {title}
        </Card.Title>

        <Card.Text className="text-secondary">
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default FeatureCard