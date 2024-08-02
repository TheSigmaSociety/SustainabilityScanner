import base64
from PIL import Image
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
import utils

app = Flask(__name__)
CORS(app)
load_dotenv()

url = "localhost:5000"


@app.route("/login", methods=["POST"])
def login(): #{username:<>,password:<>}
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "uname and password are req"}), 400

    # userData = get_user_data()

    # if username in userData and userData[username]['password'] == password:
    #     return jsonify({"message": "Logged in"}), 200
    # else:
    #     return jsonify({"error": "wrong username or password"}), 401

#cap HAR HAR HAR HAR HAR HAR AHR HAR HAR HAR HAR HAR
@app.route("/upload", methods=["POST"])
def getImage():  # {image:<actualImage>}
    base64_string = request.get_json()["image"]
    output = json.loads(utils.openaiRequest(base64_string, os.getenv("PROMPT")))
    value = list(output.values())
    value[-1] = " ".join(value[-1])
    utils.sqlInsert("products", list(output.keys()), value)
    #print(output)
    if(output['name'] != "Unkown Product"):
        utils.storeImage(output["name"])
    return jsonify(output), 200

@app.route("/getItem/<place>",methods=['GET'])
#place - the first item
#place = 0 -> 0th to 10th item
#place = 1 -> 11th item to 20th item
#place = 2 -> 21st to 30th item etc...
def getItem(place):
    #do sql majik to get top things
    return jsonify({"1":{"name":"freddy fazbear","score":69,"description":["har","har","har"]}})

@app.route("/getImage/<name>",methods=['GET'])
def getImage(name):
    name += ".txt"
    files = os.listdir(r"backend")
    for f in files:
        if(name == f):
            with open(os.path.join(r"images",name),"r") as file:
                return jsonify({"image":file.read()}), 200
    return 400
if __name__ == "__main__":
    utils.sqlInit()
    app.run("127.0.0.1", 5001)

