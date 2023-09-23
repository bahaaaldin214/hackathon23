from flask import Flask,render_template, request
import json
# import api

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/recieveWorkout/<data>')
def recieveWorkout(data):
    data.id

    #json file
    #check if it already exists
    #save new workout to json file

    return "Saved"


@app.route('/updateUser', methods=["POST"])
def updateUser():
    user = request.get_json()
 
    id = user["id"]
    password = user["password"]
    # data = json.read("people.json")
    # if(password == data[id].password)
    #json file
    #FIND IND in people.json

    #check if it already exists
    #save new workout to json file

    return {
        "streak": 1,
        "level": 1,
        "lastDay": "2020-1-34",
        "other": {},
    }

@app.route('/askAI', methods=["POST"])
def askAI():
    prompt = request.get_json()["prompt"]

    # return api.userMessage(prompt)

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1')