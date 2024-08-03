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
def putProductImage():  # {image:<actualImage>}
    base64_string = request.get_json()["image"]
    output = json.loads(utils.openaiRequest(base64_string, os.getenv("PROMPT")))
    value = list(output.values())
    value[-1] = " ".join(value[-1])
    utils.sqlInsert("products", list(output.keys()), value)
    #print(output)
    if(output['name'] != "Unkown Product"):
        utils.storeImage(output["name"])
    return jsonify(output), 200

@app.route("/getItem",methods=['GET'])
#place - the first item
#place = 0 -> 0th to 9th item
#place = 1 -> 10th item to 19th item
#place = 2 -> 20th to 29th item etc...
# [(a, b, c), (a,b,c)]

def getItem():
    place = request.args.get("place")
    place = int(place)
    har = utils.sqlSelectByPlace() #gets correct hars
    if(place*10 >= len(har)):
        return jsonify({"status":"done"}), 200
    har = har[place*10:min(place*10+10,len(har))]
    #do sql majik to get top things
    output = {"products":[]}
    for k in har:
        output["products"].append({"name":k[0],"score":k[1],"description":k[2]})
    return jsonify(output), 200

@app.route("/getImage",methods=['GET'])
def getImage():
    name = request.args.get("name") + ".txt"
    files = os.listdir(r"backend")

    for f in files:
        if(name == f):
            with open(os.path.join(r"images",name),"r") as file:
                return jsonify({"image":file.read()}), 200
    return jsonify({"image":"has"}), 200

if __name__ == "__main__":
    utils.sqlInit()
    app.run("127.0.0.1", 5001)

