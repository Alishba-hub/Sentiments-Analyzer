# 💬 Sentiment Analyzer Dashboard

A full-stack sentiment analysis dashboard that scrapes live quotes from the web, analyzes their sentiments using a rule-based model, and visualizes results beautifully using interactive charts and tables.

---

## 🔗 Live Demo

👉 **Try it here**: [Sentiment Analyzer on Vercel](https://sentiments-analyzer-5isi.vercel.app/)

---

## 🌐 Overview

This application:
- Scrapes reviews/quotes from the internet
- Detects their sentiment using a simple rule-based analyzer
- Displays interactive **Pie Charts** and a **Data Table**
- Saves all records in a **PostgreSQL** database
- Built with: **FastAPI (backend)** + **Next.js + Chart.js (frontend)**

---

## 🔧 Tech Stack

### 🖥️ Frontend
- [Next.js]
- React Hooks
- Tailwind CSS
- Chart.js (Pie chart)
- Axios

### 🚀 Backend
- [FastAPI]
- BeautifulSoup (for scraping)
- PostgreSQL
- psycopg2
- CORS enabled for frontend-backend communication

---

## ⚙️ How to Run Locally

### ▶️ Backend (FastAPI + PostgreSQL)

#### Prerequisites:
- Python 3.7+
- Pgadmin
- PostgreSQL running locally with a `testdb` database


