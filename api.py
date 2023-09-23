# import os
# import openai
# openai.organization = "org-ZL0y2e5YqgjV3IQfNjcfMCud"
# openai.api_key = "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"
# openai.Model.list()

import requests
api_key = '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'
api_url = 'https://api.openai.com/v1/chat/completions'



def userMessage(prompt):

    data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens" : 1000
    }

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json',
    }

    response = requests.post(api_url, headers=headers, json=data)

    # Handle the response
    if response.status_code == 200:
        result = response.json()
        generated_text = result['choices'][0]['message']['content']
        print(generated_text)
    else:
        print(f"Error: {response.status_code}\n{response.text}")
        

message = userMessage("Say hello")
# print(message)
