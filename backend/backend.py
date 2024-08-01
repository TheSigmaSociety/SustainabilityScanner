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


@app.route("/upload", methods=["POST"])
def getImage():  # {image:<actualImage>}
    base64_string = request.get_json()["image"]
    output = json.loads(utils.openaiRequest(base64_string, os.getenv("PROMPT")))
    value = list(output.values())
    value[-1] = " ".join(value[-1])
    utils.sqlInsert("products", list(output.keys()), value)
    utils.storeImage(output["name"])
    return jsonify(output), 200


if __name__ == "__main__":
    utils.sqlInit()
    app.run("127.0.0.1", 5000)
