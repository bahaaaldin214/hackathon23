from flask import Flask,render_template
import json

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


@app.route('/updateUser/<user>')
def updateUser(user):
    user.id

    #json file
    #FIND IND in people.json

    #check if it already exists
    #save new workout to json file

    return "Saved"

if __name__ == '__main__':
    app.run(debug=False, host='127.0.0.1')