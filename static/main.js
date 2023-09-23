import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";

import User from "./modules/user.js"
console.log("js loaded")
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
    postData("/updateUser", {id: "myUser", password: "123Hello"}).then((data) => {
        let user = new User(id, data)
    });

    const [askAI, textBox, chatinput] = selector("form", "#chatoutputarea", "#chatinput");
    
    askAI.onsubmit = function(e){
        e.preventDefault()
        span = document.createTextNode()
        span.innerText = "\n" + chatinput.value;
        textBox.appendChild(span)

        return false
    }

    // askAI.addEventListener("submit", function(e){
    //     console.log(textBox)

    // })
    
    
}

