import dataHandler

dataHandler.deleteUser("testuser")
dataHandler.createUser("testuser", "testpassword")
print(dataHandler.retrievePublicWorkoutNames())
for item in dataHandler.retrievePublicWorkoutNames() :
    print(dataHandler.retrievePublicWorkout(str(item)))