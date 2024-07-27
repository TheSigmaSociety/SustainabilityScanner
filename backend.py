from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json

app = Flask(__name__)
CORS(app)
load_dotenv()
url = "localhost:5000"

userDataPath = 'userData.json'

def get_user_data():
    with open(userDataPath, 'r') as f:
        return json.load(f)
    
@app.route('/login', methods=['POST'])
def login():
    data=request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'uname and password are req'}), 400
    
    userData = get_user_data()

    if username in userData and userData[username]['password'] == password:
        return jsonify({"message": "Logged in"}), 200
    else:
        return jsonify({"error": "wrong username or password"}), 401


if __name__ == '__main__':
    app.run()