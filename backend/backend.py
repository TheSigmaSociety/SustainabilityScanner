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

#cap HAR HAR HAR HAR HAR HAR AHR HAR HAR HAR HAR HAR
@app.route("/upload", methods=["POST"])
def putProductImage():  # {image:<actualImage>}
    print("upload event triggered")
    base64_string = request.get_json()["image"]
    output = json.loads(utils.openaiRequest(base64_string, os.getenv("PROMPT")))
    value = list(output.values())
    isDupe = json.loads(utils.checkDuplicate(value[0])).get("exists")
    if not isDupe:
        print(value[0].lower())
        if(value[0].lower().replace(" ", "") != "unknownproduct"):
            utils.sqlInsert("products", list(output.keys()), value)
            utils.storeImage(value[0])
            return jsonify(output), 200
        else:
            print("unknown product!")
            return jsonify({"error":"Unknown product"}), 200
    else:
        print("duplicate!")
        return jsonify({"error":"Duplicate item"}), 200

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
    output = {"products":[]}
    for k in har:
        output["products"].append({"name":k[0],"score":k[1],"description":k[2]})
    return jsonify(output), 200

@app.route("/getImage",methods=['GET'])
def getImage():
    name = request.args.get("name") + ".txt"
    files = os.listdir(r"images")
    for f in files:
        if(name == f):
            with open("images/"+name,"r") as file:
                return jsonify({"image":file.read()}), 200
    return jsonify({"image":"has"}), 200

if __name__ == "__main__":
    utils.sqlInit()
    app.run("127.0.0.1", 5001)

