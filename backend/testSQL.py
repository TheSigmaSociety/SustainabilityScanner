import mysql.connector
from dotenv import load_dotenv
import os
import utils

load_dotenv()

db = mysql.connector.connect(
    host="localhost",
    user=os.getenv("DB_USER"),
    passwd = os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

mycursor = db.cursor()

mycursor.execute("CREATE DATABASE IF NOT EXISTS summerhack")
mycursor.execute("CREATE TABLE IF NOT EXISTS users (username VARCHAR(255), score INT)")
mycursor.execute("CREATE TABLE IF NOT EXISTS products (name VARCHAR(255), score INT, description TEXT)")

sql = "INSERT INTO customers (name, address) VALUES (%s, %s)"
value = ("John", "Highway 21")

utils.sqlInsert(db, "users", ["username", "score"], ["Freddy fazbear", 69])
utils.sqlInsert(db, "products", ["name", "score", "description"], ["freddy's signature cheese pizza", 69, "ishan sHARma"])


