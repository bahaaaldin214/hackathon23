import {getJson, setHomeURL, postData, getServerJson} from "./modules/getData.js";
import { getCookie, makeSpan, selector } from "./modules/tools.js";




window.onload = function(){
    const [signin, username, password] = selector("form", "#username", "#password");

    signin.onsubmit = function(e){
        e.preventDefault()

        postData("/trySignIn", {username: username.value, password: password.value})
        .then(response => response.json())
        .then(r => {
            localStorage.setItem("username", username.value);
            localStorage.setItem("password", password.value);
            document.cookie = "username="+username.value+"; path=/;";
            document.cookie = "password="+password.value+"; path=/;";
            window.location.href = "";
        })
        .catch(e => {
            console.log(e)
        })

        return false;
    }

    if(getCookie("username") != ""){
        let user = getCookie("username");
        let pass = getCookie("password");
        password.value = pass;
        username.value = user;
    }

    signout.onclick = function(e){
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}