# TODO decide on syntax for workout objects and develop their handling
# TODO test all functions and ensure proper functioning
# TODO function for changing user personal values
# TODO function for retrieving all names of different workouts
# TODO use new useJSON method isntead of writing out the whole thing iun every function 

# example 1: publishing a workout object to public workout directory if it doesnt already exist
# dataHandler.publishPublicWorkout("name", "workout object")

# example 2: retrieving an object representing a user with all of its data
# dataHandler.retrieveUserPersonal("username", "password")

# example 3: retrieve all private workouts a user has saved
# dataHandler.retrieveAllPrivateWorkouts("username")

# example 4: retrieve public workout by its name
# dataHandler.retrievePublicWorkout("name")

# self explanatory:
# dataHandler.createUser(username, password)   -- generates default user with default values
# dataHandler.deleteUser(username)

# example 5: add a private workout under a users name
# dataHandler.writePrivateWorkout(username, password, workout)

import json
import os
from datetime import date

# local intended function for getting relative path of user directory
def getUserDir(username):
    return 'data/people/' +username

# local intended function for getting relative path of workout directory
def getWorkoutPath(name):
    return "data/public/workouts/"+name+".json"

# file names
personal = "/personal.json"
workouts = "/workouts.json"


def useJson(src):
    with open(src) as json_file:
        data = json.load(json_file)
        return data

# returns JSON object of user
def retrieveUserPersonal(username, password):
    
    data = useJson(getUserDir(username)+personal)

    if password == data["password"]:
        return data
    
# validate user
def validate(username, password):
    data = useJson(getUserDir(username)+personal)
    if password == data["password"]:
        return True
    else: 
        return False

# returns JSON object of user's workouts
def retrieveUserWorkouts(username, password): 
    if(validate(username, password)):
        data = useJson(getUserDir(username)+workouts)
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

# update a single user field
def updateUserValue(username, password, field, data):
    user = retrieveUserPersonal(username, password)
    if user[field] != None and data != None:
        user[field] = data
        with open(getUserDir(username)+personal, "w") as write_file:
                json.dump(data, write_file)

# save user's workout
def writePrivateWorkout(username, password, name, workout):
    if(validate(username, password)):
        data = useJson(getUserDir(username)+workouts)
        if data != None:
            data.add({name:workout})
            with open(getUserDir(username)+workouts, "w") as write_file:
                json.dump(data, write_file)
            return name
        else:
            data = {str(name):workout}
            with open(getUserDir(username)+workouts, "w") as write_file:
                json.dump(data, write_file)
            return name
    return None

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
            json.dump(generateNewUser(username, password),writefile)
        with open(getUserDir(username)+workouts, "x") as writefile:
            json.dump({},writefile)

# geneate new user personal JSON
def generateNewUser(username, password):
    user = {
        "username": username,
        "streak": "1",
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
    return name