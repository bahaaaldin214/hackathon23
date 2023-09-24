// JavaScript code for adding and displaying supersets and exercises
import { postData } from "./modules/getData.js";

const scheduleContainer = document.getElementById('schedule-container');
const days = document.querySelectorAll(".day-button")
const supersetList = document.getElementById('superset-list');
const [addSupersetE, addExerciseE] = ["addSuperset", "addExercise"].map(e => document.getElementById(e))

const Days = ["Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let selectedDay = null;
let selectedSupersetIndex = null;
const scheduleData = [[],[],[],[],[],[],[]]; // Store schedule data for different day-superset combinations

function selectDay(day) {

    days.forEach(day => day.style.background = "none");

    document.getElementById(day).style.background = "#ccc"
    selectedDay = Days.findIndex(e => e == day);

    selectedSupersetIndex = null;
    updateTable();
    updateSupersetList();
}

days.forEach(day => {
    day.onclick = function(){
        selectDay(day.id)
    }
})

function addSuperset() {
    if (selectedDay === null) {
        alert('Please select a day first.');
        return;
    }

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

    const exerciseName = document.getElementById('exercise-name').value;
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
                             ${index === 0 ? `<td rowspan="${daySuperset.exercises.length}">${selectedDay}</td>` : ''}
                             <td>${exercise.exerciseName}</td>
                             <td>${exercise.sets}</td>
                             <td>${exercise.reps}</td>
                         </tr>
                     `).join('')}
                 </tbody>
             `;
        scheduleContainer.appendChild(table);
    }
}

function updateSupersetList() {
    // Clear the existing superset list
    supersetList.innerHTML = '';

    // Display the list of supersets with buttons
    if ( scheduleData[selectedDay]) {
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

