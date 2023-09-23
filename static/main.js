import {getJson, setHomeURL, postData, getData, getServerJson} from "./modules/getData.js";

import User from "./modules/user.js"
function randomID(){
    return Math.ceil(Math.random()*1000000) // get a random number betweeen 1 and 1 million
}
let id = randomID();

window.onload = function(){
    getData("/user", {id: "myUser"}).then(({streak, level}) => {
        let user = new User(id, streak, level)
    })
    
}

