import dataHandler

dataHandler.deleteUser("testuser")
dataHandler.createUser("testuser", "testpassword")

dataHandler.publishPublicWorkout(
    "funtimes", 
    [
  [],
  [],
  [],
  [
    {
      "day": 3,
      "exercises": [
        {
          "exerciseName": "23",
          "sets": 2,
          "reps": 1
        }
      ]
    },
    {
      "day": 3,
      "exercises": [
        {
          "exerciseName": "ads ",
          "sets": 23,
          "reps": 1
        },
        {
          "exerciseName": "ads ",
          "sets": 2,
          "reps": 2
        }
      ]
    }
  ],
  [],
  [],
  []
]
    )