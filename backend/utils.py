import base64
import requests
import os
from dotenv import load_dotenv

def encodeImage(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def openaiRequest(imagePath, prompt):
    base64Image = encodeImage(imagePath)
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.getenv('KEY')}",
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {
                        "type": "image_url",
                        "image_url": {"url": f"data:image/jpeg;base64,{base64Image}"},
                    },
                ],
            }
        ],
        "max_tokens": 100,
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    return response.json()



