from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json

app = Flask(__name__)
CORS(app)
load_dotenv()
url='localhost:5000'
dataPath = "logInData.json"

def login():
    data = request.get_json()
    with open(dataPath, 'r') as file:
        logInData = json.load(file)
    if data['username'] in logInData and data['password'] == logInData[data['username']]:
        return {"message": "success"}
    else:
        return {"message": "failure"}
