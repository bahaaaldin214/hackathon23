import json
import os
from datetime import date

def getUserDir(username):
    return "data\people\\"+username

def getWorkoutDir(name):
    return "data\workouts\\"+name

personal = "\\personal.json"
workouts = "\\workouts.json"

# returns JSON object of user
def retrieveUserPersonal(username, password):
    data = json.read(getUserDir(username)+personal)
    if password == data[password]:
        return data
    
# validate user
def validate(username, password):
    data = json.read(getUserDir(username)+personal)
    if password == data[password]:
        return True
    else: 
        return False

# returns JSON object of user's workouts
def retrieveUserWorkouts(username, password): 
    if(validate(username, password)):
        data = json.read(getUserDir(username)+workouts)
        return data
    return None

# workout generater

# save user's workout
def writePrivateWorkout(username, password, workout):
    if(validate(username, password)):
        data = None
        with open(getUserDir(username)+workouts, "r") as read_file:
            data = json.load(read_file)
        if data != None:
            data.update(workout)
            with open(getUserDir(username)+workouts, "w") as write_file:
                json.dump(data, write_file)

# delete user
def deleteUser(username):
    if os.path.exists(getUserDir(username)):
        if os.path.exists(getUserDir(username)+personal): 
            os.remove(getUserDir(username)+personal)
        if os.path.exists(getUserDir(username)+workouts): 
            os.remove(getUserDir(username)+workouts)
        os.rmdir(getUserDir(username))

# generate new user
def createUser(username, password):
    if not os.path.exists(getUserDir(username)):
        os.mkdir(getUserDir(username))
        with open(getUserDir(username)+personal, "x") as writefile:
            json.dump(generateNewUser(password),writefile)
        with open(getUserDir(username)+workouts, "x") as writefile:
            pass

# geneate new user personal JSON
def generateNewUser(password):
    user = {"streak": "1",
        "level": "1",
        "lastDay": today(),
        "password": password,
        "public": ["exampleWorkout"],
        "private": []
    }
    return user

# get today's date
def today():
    return date.today().strftime("%d/%m/%Y")

# retrieve public workout from id
def retrievePublicWorkout(name):
    if os.path.exists(getWorkoutDir(name)):
        with open(getWorkoutDir(name), "r") as read_file:
            data = json.load(read_file)
            return data

# retrieve private workout from name
def retrievePrivateWorkout(name):
    pass

def publishPublicWorkout(name):
    pass