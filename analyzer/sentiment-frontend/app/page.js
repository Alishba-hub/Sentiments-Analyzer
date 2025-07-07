'use client'
import { useState } from 'react'
import axios from 'axios'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function Home() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://127.0.0.1:8000/scrape')
      setReviews(res.data.data)
    } catch (error) {
      alert('Failed to fetch reviews.')
    }
    setLoading(false)
  }

  const countSentiments = {
    Positive: reviews.filter(r => r.sentiment === 'Positive').length,
    Negative: reviews.filter(r => r.sentiment === 'Negative').length,
    Neutral: reviews.filter(r => r.sentiment === 'Neutral').length,
  }

  const pieData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        data: [
          countSentiments.Positive,
          countSentiments.Negative,
          countSentiments.Neutral,
        ],
        backgroundColor: ['#4ade80', '#f87171', '#facc15'],
        borderWidth: 1,
      },
    ],
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 p-6 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1484/1484849.png"
            alt="Sentiment Icon"
            className="w-20 h-20 mb-4 drop-shadow-md"
          />
          <h1 className="text-5xl font-bold text-blue-800">Sentiment Review Dashboard</h1>
          <p className="text-gray-600 mt-3 text-lg max-w-xl">
            Scrape customer reviews, analyze their sentiment, and visualize results beautifully.
          </p>
        </div>

        {/* Button */}
        <div className="text-center">
          <button
            onClick={fetchReviews}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-2 px-6 rounded-full shadow-lg transition"
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Reviews'}
          </button>
        </div>

        {/* Chart */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Pie Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Sentiment Breakdown</h2>
              <Pie data={pieData} />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow p-6 overflow-auto">
              <h2 className="text-xl font-semibold mb-4 text-blue-700">Scraped Reviews</h2>
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-sm text-gray-600">Review</th>
                    <th className="text-left p-3 text-sm text-gray-600">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((r, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="p-3 text-gray-700">{r.review}</td>
                      <td className={`p-3 font-semibold ${
                        r.sentiment === 'Positive' ? 'text-green-600' :
                        r.sentiment === 'Negative' ? 'text-red-500' :
                        'text-yellow-600'
                      }`}>
                        {r.sentiment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-12">
          Built with 💙 FastAPI + PostgreSQL + Next.js
        </footer>
      </div>
    </main>
  )
}
