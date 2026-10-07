
import Spinner from 'react-bootstrap/Spinner'

function Loading({ message = 'Loading...' }) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <Spinner
        animation="border"
        variant="success"
        role="status"
        className="mb-3"
      >
        <span className="visually-hidden">
          Loading...
        </span>
      </Spinner>

      <p className="text-secondary mb-0">
        {message}
      </p>
    </div>
  )
}

export default Loading