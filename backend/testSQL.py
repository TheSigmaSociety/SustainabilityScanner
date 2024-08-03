import mysql.connector
from dotenv import load_dotenv
import os
import utils

load_dotenv()

# utils.sqlInit()
# print(len(utils.encodeBase64(r"backend\images\carrot.png")))
# utils.sqlInsert("users", ["username", "score"], ["Freddy fazbear", 69])
# utils.sqlInsert("products", ["name", "score", "description"], ["freddy's signature cheese pizza", 69, "ishan sHARma"])
print(utils.checkDuplicate("freddy fazbear's har industries"))


