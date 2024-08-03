import base64
import requests
import os
from dotenv import load_dotenv
import mysql.connector
from icrawler.builtin import GoogleImageCrawler
import json


def encodeImage(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")


def openaiRequest(imagePath, prompt):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('KEY')}",
    }
    payload = {
        "model": "gpt-4o-mini",
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": imagePath},
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
    print(f"Connected to {db.get_server_info()}")
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
        host=os.getenv("IP"),
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
    
def storeProduct(name):
    path = downloadImage(name,filename="test001.jpeg")
    encodeBase64(path)

#backend/images\Kellogg's Nutri Grain Apple Cinnamon Soft Baked Breakfast Bars.jpg

#alr since ur getting jumped
#im thinking
#we do
def storeImage(name):
    path = downloadImage(name,filename=name)
    print(path)
    encodeBase64(path,name)
    return "i am a sigma"

def encodeBase64(imagePath,name):
    with open(imagePath, "rb") as imageFile:
        b64 =  "data:image/jpeg;base64," + base64.b64encode(imageFile.read()).decode("utf-8")
    createTxt(r"backend/images/",name,b64)
    os.remove(imagePath)

def downloadImage(keyword, limit=1, filename="default.jpg"):
    filename += ".jpg"
    crawler = GoogleImageCrawler(storage={"root_dir": r"backend"})
    crawler.crawl(keyword=keyword, max_num=limit)
    downloadedFiles = os.listdir(r"backend")
    if downloadedFiles:
        downloadedFilePath = os.path.join(r"backend", downloadedFiles[0])
        newFilePath = os.path.join(r"backend", filename)

        os.rename(downloadedFilePath, newFilePath)
        return newFilePath
    else:
        return None
    
def createTxt(dir, name, content):
    name += ".txt"
    with open(dir+name, "w") as file:
        file.write(content)
    return os.path.join(dir, name)

def sqlSelectByPlace():
    db = mysql.connector.connect(
        host=os.getenv("IP"),   
        user=os.getenv("DB_USER"),
        passwd=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM products ORDER BY score DESC")
    result = mycursor.fetchall()
    mycursor.close()
    db.close()
    return result

def checkDuplicate(name):
    db = mysql.connector.connect(
        host=os.getenv("IP"),   
        user=os.getenv("DB_USER"),
        passwd=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME"),
    )
    mycursor = db.cursor()
    mycursor.execute("SELECT * FROM products")
    result = mycursor.fetchall()
    listOfNames = []
    for i in result:
        listOfNames.append(i[0])
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('KEY')}",
    }
    payload = {
        "model": "gpt-4o-mini",
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "you will be given a product name. Your task is to check whether this product name already exists in a database of recorded products, and return a JSON of the following format: {\"exists\": true} or {\"exists\": false}. the current product might not have the exact same name as the product in the database, but they should be treated as a duplicate if they are similar enough. The product name is: " + name + ", and the list of recorded products is: " + str(listOfNames)},
                ],
            }
        ],
        "max_tokens": 200,
    }
    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )
    mycursor.close()
    db.close()
    return response.json()["choices"][0]["message"]["content"]
  
