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

    const [askAI, textBox, chatinput, canvas, buffer, today] = selector("form", "#chatoutput", "#chatinput", "#canvas", "#buffer", "#today");

    let display, user;
    await postData("/updateUser", {id: "myUser", password: "123Hello"}).then(async (data) => {
    
        //use colors to make muscle group object with informations on it
        user = new User("1", data, colors);

        const visual = new Image();
        visual.src  = "/static/assets/visual.png";

        const presentable = new Image();
        presentable.src  = "/static/assets/presentable.png";

        display = new Display(canvas, buffer, colors, visual, presentable);
        mainTable(today)
    });
    
    let selectedMuscle = ""
    window.addEventListener("mousedown", (e) => {
        selectedMuscle = display.getPixel(e)
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

function mainTable(container) {
  
        const data = [[], [], [], [{"day": 3, "exercises": [{"exerciseName": "23", "sets": 2, "reps": 1}]}, {"day": 3, "exercises": [{"exerciseName": "ads ", "sets": 23, "reps": 1}, {"exerciseName": "ads ", "sets": 2, "reps": 2}]}], [], [], []]
        const table = document.createElement('table');
        const day = data[3]
        console.log(data[day])
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
                   
                 ${day[0].exercises.map((exercise, index) => `
                 <tr>
                     ${index === 0 ? `<td rowspan="${day[0].exercises.length}">${"Sunday"}</td>` : ''}
                     <td>${exercise.exerciseName}</td>
                     <td>${exercise.sets}</td>
                     <td>${exercise.reps}</td>
                 </tr>
             `).join('')}
                     
                 </tbody>
             `;
             container.appendChild(table);
  }