import os
import openai
openai.organization = "org-ZL0y2e5YqgjV3IQfNjcfMCud"
openai.api_key = "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"
openai.Model.list()

{
    "id": "chatcmpl-abc123",
    "object": "chat.completion",
    "created": 1677858242,
    "model": "gpt-3.5-turbo-0613",
    "usage": {
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20
    },
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "\n\nThis is a test!"
            },
            "finish_reason": "stop",
            "index": 0
        }
    ]
}