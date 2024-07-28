import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()

db = mysql.connector.connect(
    host="localhost",
    user=os.getenv("DB_USER"),
    passwd = os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

mycursor = db.cursor()

mycursor.execute("CREATE DATABASE ")

