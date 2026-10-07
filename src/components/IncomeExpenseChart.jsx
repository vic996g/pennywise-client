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

function IncomeExpenseChart({
  transactions = [],
}) {
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

  const data = {
    labels: [
      'Income',
      'Expenses',
    ],

    datasets: [
      {
        label: 'Amount',
        data: [
          totalIncome,
          totalExpenses,
        ],
        borderWidth: 1,
        barPercentage: 0.5,
        categoryPercentage: 0.6,
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
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default IncomeExpenseChart