// JavaScript code for adding and displaying supersets and exercises
import { postData } from "./modules/getData.js";
import { getCookie } from "./modules/tools.js";

const username = getCookie("username");
const password = getCookie("password");

const scheduleContainer = document.getElementById('schedule-container');
const days = document.querySelectorAll(".day-button")
const supersetList = document.getElementById('superset-list');
const [addSupersetE, addExerciseE, toggleScheduleE, up, down, builder, manage] = ["addSuperset", "addExercise", "toggleSchedule", "up", "down", "builder", "manage"].map(e => document.getElementById(e))
const scheduleSubmitButton = document.querySelector("#submit");
const exerciseNameBox = document.getElementById("exercise-name");
const exerciseSetBox = document.getElementById("sets");
const exerciseRepBox = document.getElementById("reps");
const privacySelector = document.getElementById("privacy");
const workoutNameBox = document.getElementById("name");

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

down.onclick = () => {
    builder.style.display = "flex";
    console.log("its clicking")
}
up.onclick = () => {
    builder.style.display = "none";
    console.log("its clicking")
}

let selectedDay = null;
let selectedSupersetIndex = null;
const scheduleData = [[], [], [], [], [], [], []]; // Store schedule data for different day-superset combinations

function selectDay(day) {

    days.forEach(day => day.style.background = "none");

    document.getElementById(day).style.background = "#ccc"
    selectedDay = Days.findIndex(e => e == day);

    selectedSupersetIndex = null;
    updateTable();
    updateSupersetList();
}

days.forEach(day => {
    day.onclick = function () {
        selectDay(day.id)
    }
})

function addSuperset() {
    if (selectedDay === null) {
        alert('Please select a day first.');
        return;
    };

    const newSuperset = {
        day: selectedDay,
        exercises: [],
    };


    scheduleData[selectedDay].push(newSuperset);

    selectedSupersetIndex = scheduleData[selectedDay].length - 1;
    updateTable();
    updateSupersetList();
}

function addExercise() {
    if (selectedSupersetIndex === null || selectedDay === null) {
        alert('Please select a day and add a superset first.');
        return;
    }

    const exerciseName = exerciseNameBox.value;
    const sets = parseInt(document.getElementById('sets').value);
    const reps = parseInt(document.getElementById('reps').value);

    if (!exerciseName || isNaN(sets) || isNaN(reps) || sets < 0 || reps < 0) {
        alert('Please fill in all fields with valid data.');
        return;
    }

    const exercise = {
        exerciseName,
        sets,
        reps,
    };

    scheduleData[selectedDay][selectedSupersetIndex].exercises.push(exercise);
    updateTable();

    // Clear input fields
    document.getElementById('exercise-name').value = '';
    document.getElementById('sets').value = '';
    document.getElementById('reps').value = '';
}

addSupersetE.onclick = addSuperset;
addExerciseE.onclick = addExercise;

function updateTable() {
    scheduleContainer.innerHTML = '';

    if (selectedDay !== null && selectedSupersetIndex !== null) {
        const daySuperset = scheduleData[selectedDay][selectedSupersetIndex];

        const table = document.createElement('table');
        table.innerHTML = `
                 <thead>
                     <tr>
                         <th>Day of the Week</th>
                         <th>Exercise</th>
                         <th>Sets</th>
                         <th>Reps</th>
                     </tr>
                 </thead>
                 <tbody>
                     ${daySuperset.exercises.map((exercise, index) => `
                         <tr>
                             ${index === 0 ? `<td rowspan="${daySuperset.exercises.length}">${Days[selectedDay]}</td>` : ''}
                             <td>${exercise.exerciseName}</td>
                             <td>${exercise.sets}</td>
                             <td>${exercise.reps}</td>
                         </tr>
                     `).join('')}
                 </tbody>
             `;
        scheduleContainer.appendChild(table);

        // Show the schedule container
        // scheduleContainer.style.display = 'block';
    } else {
        // Hide the schedule container
        // scheduleContainer.style.display = 'none';
    }
}

function updateSupersetList() {
    // Clear the existing superset list
    supersetList.innerHTML = '';

    // Display the list of supersets with buttons
    if (scheduleData[selectedDay]) {
        const supersetsForDay = scheduleData[selectedDay];
        for (let i = 0; i < supersetsForDay.length; i++) {
            const superset = supersetsForDay[i];
            const button = document.createElement('button');
            button.textContent = `Superset ${i + 1}`;
            button.className = 'superset-button';
            button.onclick = () => {
                selectedSupersetIndex = i;
                updateTable();
            };
            supersetList.appendChild(button);
        }
    }
}


scheduleSubmitButton.addEventListener("click", () => {
    console.log("workout submitted");
    if (username != "") {
        postData("/postSchedule", {
            "username": username,
            "password": password,
            "privacy": privacySelector.value,
            "workout": scheduleData,
            "name": workoutNameBox.value
        });
    }
    else{
        confirm("Please sign in to save workouts");
    }
})

