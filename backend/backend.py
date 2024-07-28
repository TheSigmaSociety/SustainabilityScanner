from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import json
import requests


app = Flask(__name__)
CORS(app)
load_dotenv()
openai_key = os.getenv('KEY')
url = "localhost:5000"
userDataPath = 'userData.json'

def openAiRequest(prompt, input):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": prompt},
                {
                "type": "image_url",
                "image_url": {
                    "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                },
                },
            ],
            }
        ],
        max_tokens=300,
    )
    return response.choices[0]
































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