import dataHandler

from flask import Flask,render_template, request
import json
#import api

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/manageworkout/")
def manageworkout():
    return render_template("manageworkout.html")

@app.route("/signin/")
def signin():
    return render_template("signin.html")

@app.route("/about/")
def about():
 return render_template("about.html")

@app.route("/community/")
def community():
 return render_template("community.html")

@app.route('/recieveWorkout/<data>')
def recieveWorkout(data):
    data.id

    #json file
    #check if it already exists
    #save new workout to json file

    return "Saved"

@app.route('/createAccount', methods=["POST"])
def createAccount():
    data = request.get_json()
    user = data["username"]
    password = data["password"]
    return dataHandler.createUser(user, password), 200

@app.route('/updateUser', methods=["POST"])
def updateUser():
    user = request.get_json()
 
    id = user["id"]
    password = user["password"]
    #TODO
    
@app.route('/postSchedule', methods=["POST"])
def scheduleData():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    privacy = data["privacy"]
    workout = data["workout"]
    name = data["name"]

    if privacy == "private":
        return dataHandler.writePrivateWorkout(username, password, name, workout)
    else: 
        return dataHandler.publishPublicWorkout(name, workout), 200 #assumes success from handler
    


@app.route("/trySignIn", methods=["POST"])
def trySignIn():
    user = request.get_json()
 
    username = user["username"]
    password = user["password"]

    print(username, password)

    recieved = dataHandler.retrieveUserPersonal(username, password)

    return recieved

@app.route('/askAI', methods=["POST"])
def askAI():
    prompt = request.get_json()["prompt"]

    #return api.userMessage(prompt) 
    return {"msg": "Pong Baby"}, 200

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1')