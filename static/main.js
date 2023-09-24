import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";
import { makeSpan, selector, colors } from "./modules/tools.js";

import User from "./modules/user.js"
import Display from "./modules/display.js"



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

