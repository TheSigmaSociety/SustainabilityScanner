import re
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

# def get_user_data():
#     with open(userDataPath, 'r') as f:
#         return json.load(f)


# @app.route('/login', methods=['POST'])
# def login():
#     data=request.get_json()
#     username = data.get('username')
#     password = data.get('password')

#     if not username or not password:
#         return jsonify({'error': 'uname and password are req'}), 400

#     userData = get_user_data()

#     if username in userData and userData[username]['password'] == password:
#         return jsonify({"message": "Logged in"}), 200
#     else:
#         return jsonify({"error": "wrong username or password"}), 401

# if __name__ == '__main__':
#     app.run()

PROMPT = "using the given ingredients/materials label, identify the possible ingredients and parts of the product which could have a SIGNIFICANT impact on sustainability. The product has a starting score of 10/10. For each ingredient/component with a SIGNIFICANTLY NEGATIVE IMPACT ON SUSTAINABILITY, deduct one point from the score. Give the user a list of the materials and a VERY CONCICE explanation of why the ingredient has a negative impact on the sustainability. The response MUST be in plain text, no formatting such as * or #. follow this template in your response: Intro, items, final score. put as many items as needed or is significant. if a product is sustainable to an extent, give it a high score (>7)"
import base64
from PIL import Image
from io import BytesIO


@app.route("/upload", methods=["POST"])
def getImage():  # {image:<actualImage>}
    base64_string = request.get_json()["image"]
    output = utils.openaiRequest(base64_string,PROMPT)
    return jsonify({"status": output}), 200
    # if data:
    #     output = utils.openaiRequest(data,PROMPT)
    #     print(output)
    #     return jsonify({"out":output}), 200
    # else:
    #     return jsonify({"error":"Invalid image"}), 401


if __name__ == "__main__":
    app.run("127.0.0.1", 5000)
