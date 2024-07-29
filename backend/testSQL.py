import mysql.connector
from dotenv import load_dotenv
import os
import utils

load_dotenv()

utils.sqlInit()

# utils.sqlInsert("users", ["username", "score"], ["Freddy fazbear", 69])
# utils.sqlInsert("products", ["name", "score", "description"], ["freddy's signature cheese pizza", 69, "ishan sHARma"])

utils.downloadImage("BLOX FRUITS LEOPARD FRUIT M1", limit=1, filename="test.png")

