import dataHandler

dataHandler.deleteUser("testuser")
dataHandler.createUser("testuser", "testpassword")

dataHandler.publishPublicWorkout(
    "funtimes", 
    [{
    "superset1":{
    "name":"bench", 
    "sets":7,
    "reps":8
    },
    "superset2":{
    "name":"squat", 
    "sets":1,
    "reps":1
    }
    },
    {
    "superset1":{
    "name":"bench", 
    "sets":7,
    "reps":8
    },
    "superset2":{
    "name":"squat", 
    "sets":1,
    "reps":1
    }
    }])