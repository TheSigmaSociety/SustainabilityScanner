import base64
import requests
import os
from dotenv import load_dotenv

def encodeImage(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def openaiRequest(image, prompt):
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
                        "image_url": {"url": f"data:image/jpeg;base64,{image}"},
                    },
                ],
            }
        ],
        "max_tokens": 200,
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    return response.json()['choices'][0]['message']['content']

def sqlInsert(db, table, columns, values):
    mycursor = db.cursor()
    mycursor.execute(f"INSERT INTO {table} ({', '.join(columns)}) VALUES ({', '.join(['%s' for _ in values])})", values)

    db.commit()
    mycursor.close()
    db.close()




