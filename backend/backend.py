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

PROMPT = "Using the given food item/ingredients label, create a JSON formatted string with the following entries: ‘name’, which will contain the name of the product, ‘score’: which will contain a score out of 10 determined by the following: The product has a starting score of 10. For each ingredient/component in the product or its manufacturing process that could be considered to create a SIGNFICIANTLY NEGATIVE IMPACT ON SUSTAINABILITY, deduct one point from the starting score. However, if an ingredient/component can be deemed to be ESPECIALLY NEGATIVE TO SUSTAINABILITY, deduct 2 points from the original score. For the last pair, the key is ‘description’, and the value is determined identifying the TOP THREE MOSTLY NEGATIVE COMPONENTS/INGREDIENTS IN THE FOOD ITEM WHICH COULD IMPACT SUSTAINABILIY. Do not deviate from this format under any circumstances. Do not include any file formatting (such as newline, tab, etc.). Just provide a raw JSON string that can be converted into JSON."
import base64
from PIL import Image
from io import BytesIO


@app.route("/upload", methods=["POST"])
def getImage():  # {image:<actualImage>}
    base64_string = request.get_json()["image"]
    output = utils.openaiRequest(base64_string,PROMPT)
    x = (json.loads(output))
    utils.sqlInsert("products", list(x.keys()), list(x.values()))
    
    return jsonify(x), 200


if __name__ == "__main__":
    utils.sqlInit()
    app.run("127.0.0.1", 5000)
