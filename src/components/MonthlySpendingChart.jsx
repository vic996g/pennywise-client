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

function MonthlySpendingChart({
  transactions = [],
}) {
  const monthlySpending = {}

  transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .forEach((transaction) => {
      const date =
        new Date(transaction.date)

      const month =
        date.toLocaleString('en-US', {
          month: 'short',
        })

      const year =
        date.getFullYear()

      const key = `${month} ${year}`

      if (monthlySpending[key]) {
        monthlySpending[key] +=
          Number(transaction.amount)
      } else {
        monthlySpending[key] =
          Number(transaction.amount)
      }
    })

  const labels =
    Object.keys(monthlySpending)

  const amounts =
    Object.values(monthlySpending)

  const data = {
    labels,

    datasets: [
      {
        label: 'Monthly Spending',
        data: amounts,
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.8,
      },
    ],
  }

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
      {labels.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center h-100">
          <p className="text-secondary mb-0">
            No spending data available yet.
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

export default MonthlySpendingChart