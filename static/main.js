import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";
import { makeSpan, selector, colors, getCookie } from "./modules/tools.js";

import User from "./modules/user.js"
import Display from "./modules/display.js"

let username = "";
let password = "";

if(getCookie("username") != ""){
    username = getCookie("username");
    password = getCookie("password");
}

if(username != ""){
    document.querySelector("#signinlink").innerHTML=username
}

window.onload = async function(){

    if(!localStorage.getItem("username")){
        console.log(localStorage.getItem("username"))
        window.location.href = "signin"
    }

    const [askAI, textBox, chatinput, canvas, buffer] = selector("form", "#chatoutput", "#chatinput", "#canvas", "#buffer");

    let display, user;
    await postData("/updateUser", {id: "myUser", password: "123Hello"}).then(async (data) => {
    
        //use colors to make muscle group object with informations on it
        user = new User("1", data, colors);

        const visual = new Image();
        visual.src  = "/static/assets/visual.png";

        const presentable = new Image();
        presentable.src  = "/static/assets/presentable.png";

        display = new Display(canvas, buffer, colors, visual, presentable);

    });
    
    let selectedMuscle = ""
    window.addEventListener("mousedown", (e) => {
        selectedMuscle = display.getPixel(e)
        console.log(colors.front[selectedMuscle] || colors.back[selectedMuscle])
    })

    let aiBusy = false;

    function pushPrompt(e){
        aiBusy = true;
        e.preventDefault()
        
        
        textBox.appendChild(makeSpan(chatinput.value, "rightAlign"));
        chatinput.value = "";

        postData("/askAI", {prompt: chatinput.value})
        .then(response => response.json())
        .then(r => {
            
            textBox.appendChild(makeSpan(r.msg, "leftAlign")); // put the reply in the text box
            aiBusy = false; //can make another request 
        });

        chatoutput.scrollTop = chatoutput.scrollHeight; //automatically scroll down 
        return false
    
    }

    askAI.onsubmit = function(e){
        if(!aiBusy){ //only one request at a time
            pushPrompt(e)
        }
    }

    
    
}

function mainTable() {
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