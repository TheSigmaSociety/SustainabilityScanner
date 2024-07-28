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

print('_________________________________________________________________________________________________________________________')
print(utils.openaiRequest(r"backend\OIP.png", "using the given ingredients from this ingredient label, identify which of the ingredients could have a negative environmental impact during its production or consumption - based off of this, give the ingredient list a sustainability score from 1-10 with 1 being the least sustainable and 10 being the most sustainable. make your response concise with only the top 3 most least sustainable ingredients. if the item is sustainable to an extent, give it a good score. if an ingredient has 0 grams of value, exempt it from the scoring calculations as it is not present. the response MUST be in plain text, no formatting such as * or #"))