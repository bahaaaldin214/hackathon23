import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";
import { makeSpan, selector } from "./modules/tools.js";




window.onload = function(){
    const [signin, username, password] = selector("form", "#username", "#password");

    signin.onsubmit = function(e){
        e.preventDefault()

        postData("/trySignIn", {username: username.value, password: password.value})
        .then(response => response.json())
        .then(r => {
            localStorage.setItem("username", username.value)
            localStorage.setItem("password", password.value)

            window.location.href = ""
            
        })
        .catch(e => {
            console.log(e)
        })

        return false;
    }
}