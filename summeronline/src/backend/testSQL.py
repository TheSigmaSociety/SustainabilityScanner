import mysql.connector
db = mysql.connector.connect(
    host="localhost",
    user="sharma",
    passwd = "Dhe3w0#@)(*#-",
    database="sql_workbench"
)
mycursor = db.cursor()

mycursor.execute("DESCRIBE person")
for x in mycursor:
    print(x)