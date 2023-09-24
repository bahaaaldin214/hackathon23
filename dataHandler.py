# TODO decide on syntax for workout objects and develop their handling
# TODO test all functions and ensure proper functioning
# TODO 

import json
import os
from datetime import date

# local intended function for getting relative path of user directory
def getUserDir(username):
    return "data\\people\\"+username

# local intended function for getting relative path of workout directory
def getWorkoutPath(name):
    return "data\\public\\workouts\\"+name+".json"

# file names
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

# exercise generater
# takes as input array
def generateExercise(name, sets, reps):
    data = {
        "name":name,
        "sets":sets,
        "reps":reps
    }
    return data

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

# retrieve public workout object from name
def retrievePublicWorkout(name):
    if os.path.exists(getWorkoutPath(name)):
        with open(getWorkoutPath(name), "r") as read_file:
            data = json.load(read_file)
            return data

# retrieve private workout from name
def retrievePrivateWorkout(username, name):
    return retrieveAllPrivateWorkouts(username)[name]

# retrieve all private workouts from name
def retrieveAllPrivateWorkouts(username):
    if os.path.exists(getUserDir(username)+workouts):
        with open(getUserDir(username)+workouts, "r") as read_file:
            data = json.load(read_file)
            return data


# publish a workout if it doesn't already exist to public server, attributed to author
def publishPublicWorkout(name, workout):
    if not os.path.exists(getWorkoutPath(name)):
        f = open(getWorkoutPath(name), "x")
        f.close
    with open(getWorkoutPath(name), "w") as write_file:
        json.dump(workout, write_file)