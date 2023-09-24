import { getJson, setHomeURL, postData, getServerJson } from "./modules/getData.js";
import { getCookie, makeSpan, selector } from "./modules/tools.js";

let signedin = false;

window.onload = function () {
    const [form, signin, signup, signout, username, password] = selector("form", "#signin", "#signup", "#signout", "#username", "#password");
    const [signupbutton, confirmpassword] = selector("#signupbutton", "#confirm")
    form.onsubmit = function (e) {
        e.preventDefault()

        postData("/trySignIn", { username: username.value, password: password.value })
            .then(response => response.json())
            .then(r => {
                document.cookie = "username=" + username.value + "; path=/;";
                document.cookie = "password=" + password.value + "; path=/;";
                document.location.href = '../';
            })
            .catch(e => {
                console.log(e)
            })

        return false;
    }

    if (getCookie("username") != "") {
        let user = getCookie("username");
        let pass = getCookie("password");
        password.value = pass;
        username.value = user;
        signedin = true;
    }

    signout.onclick = function (e) {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        signout.classList.toggle("hidden");
        signin.innerHTML = "Sign In";
    }

    if (signedin) {
        signout.classList.toggle("hidden");
        signin.innerHTML = "Return";
    }

    signup.addEventListener("click", () => {
        signup.classList.toggle("hidden");
        signin.classList.toggle("hidden");
        signupbutton.classList.toggle("hidden");
        confirmpassword.classList.toggle("hidden");
    })

    signupbutton.onclick = function (e) {
        if (confirm("Make new account with username " + username.value + "?")) {
            if (confirmpassword.value == password.value) {
                postData("/createAccount", { username: username.value, password: password.value })
                    .then(response => response.json())
                    .then(r => {
                        document.cookie = "username=" + username.value + "; path=/;";
                        document.cookie = "password=" + password.value + "; path=/;";
                        document.location.href = '../';
                    })
                    .catch(e => {
                        console.log(e);
                        confirm("Account username already exists");
                    })
            }
            else{
                confirm("Passwords do not match");
            }
        }
    }

}