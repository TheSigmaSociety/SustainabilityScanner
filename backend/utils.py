import base64
import requests
import os
from dotenv import load_dotenv
import mysql.connector
from icrawler.builtin import GoogleImageCrawler


def encodeImage(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def openaiRequest(image, prompt):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('KEY')}",
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{image}"},
                    },
                ],
            }
        ],
        "max_tokens": 200,
    }
    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )
    return response.json()["choices"][0]["message"]["content"]


def sqlInit():
    db = mysql.connector.connect(
        host=os.getenv("IP"),
        user=os.getenv("DB_USER"),
        passwd=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )
    mycursor = db.cursor()
    mycursor.execute("CREATE DATABASE IF NOT EXISTS SustainabilityScanner")
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), score INT)"
    )
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS products (name VARCHAR(255), score INT, description TEXT)"
    )
    mycursor.close()
    db.close()


def sqlInsert(table, columns, values):
    db = mysql.connector.connect(
        host="localhost",
        user=os.getenv("DB_USER"),
        passwd=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )
    mycursor = db.cursor()
    mycursor.execute(
        f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({', '.join(['%s' for _ in values])})",
        values,
    )

    db.commit()
    mycursor.close()
    db.close()

def downloadImage(keyword, limit=1, filename="default.jpg"):
    crawler = GoogleImageCrawler(storage={"root_dir": r"backend/images"})
    crawler.crawl(keyword=keyword, max_num=limit)
    downloadedFiles = os.listdir(r"backend/images")
    if downloadedFiles:
        downloadedFilePath = os.path.join(r"backend/images", downloadedFiles[0])
        newFilePath = os.path.join(r"backend/images", filename)

        os.rename(downloadedFilePath, newFilePath)
        return newFilePath
    else:
        return None
