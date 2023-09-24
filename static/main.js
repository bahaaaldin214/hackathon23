import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";

import User from "./modules/user.js"
import Display from "./modules/display.js"


function randomID(){
    return Math.ceil(Math.random()*1000000) // get a random number betweeen 1 and 1 million
}
let id = randomID();

function selector(...args){
    const r = []
    args.forEach(i => {r.push(document.querySelector(i))})
    return r
}

window.onload = function(){

    const [askAI, textBox, chatinput, canvas, buffer] = selector("form", "#chatoutput", "#chatinput", "#canvas", "#buffer"),
    colors = {
        front: {
            "0,255,85": "Fore Arm ",
            "255,0,29": "Shoulder",
            "42,0,55": "Chest",
            "0,255,255": "Biceps",
            "255,255,0": "Abs",
            "255,0,170": "Quads"
        },
        back: {
            "255,0,16": "Triceps",
            "170,255,0": "Lats",
            "186,0,255": "Glutes",
            "255,0,216": "Calvas"
        }
    } ;

    postData("/updateUser", {id: "myUser", password: "123Hello"}).then((data) => {
    
        //use colors to make muscle group object with informations on it
        const user = new User(id, data, colors),
        display = new Display(canvas, buffer, colors);

        

    });
    
    
    askAI.onsubmit = function(e){
        e.preventDefault()
        const span = document.createElement("p"),
        value = chatinput.value;

        span.textContent =  `${chatinput.value}`; //can customize furthor

        span.id = "rightAlign";

        textBox.appendChild(span);
        chatinput.value = "";

        postData("/askAI", value).then(r => {

        });

        chatoutput.scrollTop = chatoutput.scrollHeight;
        return false
    }

    // askAI.addEventListener("submit", function(e){
    //     console.log(textBox)

    // })
    
    
}

