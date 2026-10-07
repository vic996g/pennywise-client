import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

function SpendingChart({ transactions = [] }) {

  // Get only expense transactions
  const expenses = transactions.filter(
    (transaction) =>
      transaction.type === 'expense'
  )

  // Store spending by category
  const spendingByCategory = {}

  expenses.forEach((transaction) => {

    const category = transaction.category
    const amount = Number(transaction.amount)

    if (spendingByCategory[category]) {
      spendingByCategory[category] += amount
    } else {
      spendingByCategory[category] = amount
    }

  })

  // Get category names
  const categories = Object.keys(
    spendingByCategory
  )

  // Get spending amounts
  const amounts = Object.values(
    spendingByCategory
  )

  // Chart data
  const data = {
    labels: categories,

    datasets: [
      {
        label: 'Spending',
        data: amounts,
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  }

  // Chart settings
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `₦${Number(
              context.raw
            ).toLocaleString()}`
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          callback: function (value) {
            return `₦${Number(
              value
            ).toLocaleString()}`
          },
        },
      },
    },
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '350px',
        width: '100%',
      }}
    >
      {categories.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-secondary mb-0">
            No expense data available yet.
          </p>
        </div>
      ) : (
        <Bar
          data={data}
          options={options}
        />
      )}
    </div>
  )
}

export default SpendingChart