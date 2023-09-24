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

function makeSpan(text, className){
    const span = document.createElement("p");

    span.textContent =  `${text}`; //can customize furthor

    span.classList.add(className);
    console.log(span.class)
    return span;
}

window.onload = function(){

    const [askAI, textBox, chatinput, canvas, buffer] = selector("form", "#chatoutput", "#chatinput", "#canvas", "#buffer"),
    colors = {
        front: {
            "0,255,85": "forearms",
            "255,0,29": "shoulders",
            "42,0,255": "chest",
            "0,255,255": "biceps",
            "255,255,0": "abs",
            "255,0,170": "quads"
        },
        back: {
            "255,0,16": "triceps",
            "170,255,0": "lats",
            "186,0,255": "glutes",
            "255,0,216": "calves"
        }
    };

    postData("/updateUser", {id: "myUser", password: "123Hello"}).then(async (data) => {
    
        //use colors to make muscle group object with informations on it
        const user = new User(id, data, colors);
        

        // fetch("/static/assets/visual.png")
        // .then(src => {
        //     const image = new Image();
        //     // image.src = src;
        // })
        // .catch(error => {
        //     // Handle any errors that occurred during the fetch
        //     console.error("Fetch error:", error);
        // });
        // const presentable = fetch("/static/assets/presentable.png")
        // .catch(error => {
        //     // Handle any errors that occurred during the fetch
        //     console.error("Fetch error:", error);
        // });

        const visual = new Image();
        visual.src  = "/static/assets/visual.png";

        const presentable = new Image();
        presentable.src  = "/static/assets/presentable.png";

        const display = new Display(canvas, buffer, colors, visual, presentable);
        
        window.addEventListener("mousemove", (e) => display.getPixel(e))

    });
    
    let aiBusy = false;


    function pushPrompt(e){
        aiBusy = true;
        e.preventDefault()
        
        
        textBox.appendChild(makeSpan(chatinput.value, "rightAlign"));
        chatinput.value = "";

        postData("/askAI", {prompt: chatinput.value})
        .then(response => response.json())
        .then(r => {
            
            textBox.appendChild(makeSpan(r.msg, "leftAlign"));
            aiBusy = false;
        });

        chatoutput.scrollTop = chatoutput.scrollHeight;
        return false
    
    }

    askAI.onsubmit = function(e){
        if(!aiBusy){
            pushPrompt(e)
        }
    }

    // askAI.addEventListener("submit", function(e){
    //     console.log(textBox)

    // })
    
    
}

