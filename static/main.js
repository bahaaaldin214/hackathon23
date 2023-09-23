import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";

import User from "./modules/user.js"
function randomID(){
    return Math.ceil(Math.random()*1000000) // get a random number betweeen 1 and 1 million
}
let id = randomID();

window.onload = function(){
    postData("/updateUser", {id: "myUser", password: "123Hello"}).then(({streak, level}) => {
        let user = new User(id, streak, level)
    })
    
}

