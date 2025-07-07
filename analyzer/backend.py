from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from bs4 import BeautifulSoup
import psycopg2

app = FastAPI()

# Allow frontend to access backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# PostgreSQL connection settings
conn = psycopg2.connect(
    dbname="testdb",
    user="postgres",
    password="",  # Leave blank if not set, or add your password
    host="localhost",
    port="5432"
)
cursor = conn.cursor()

# Create table if not exists
cursor.execute("""
    CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        review TEXT,
        sentiment TEXT
)
""")
conn.commit()

# Simple sentiment check
positive_words = {"good", "great", "excellent", "happy", "love", "awesome", "best", "amazing"}
negative_words = {"bad", "terrible", "hate", "poor", "sad", "worst", "awful", "disappointed"}

def simple_sentiment(text: str) -> str:
    text = text.lower()
    pos = sum(word in text for word in positive_words)
    neg = sum(word in text for word in negative_words)
    return "Positive" if pos > neg else "Negative" if neg > pos else "Neutral"

@app.get("/scrape")
def scrape():
    url = "https://quotes.toscrape.com/"
    soup = BeautifulSoup(requests.get(url).text, "html.parser")
    results = []

    for q in soup.select(".quote"):
        text_tag = q.find("span", class_="text")
        if text_tag:
            text = text_tag.text.strip()
            sentiment = simple_sentiment(text)
            results.append({"review": text, "sentiment": sentiment})
            
            # Insert into PostgreSQL
            cursor.execute(
                "INSERT INTO reviews (review, sentiment) VALUES (%s, %s)",
                (text, sentiment)
            )

    conn.commit()
    return {"data": results}
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
