import $ from "../../lib/$";
import { checkIfUserInstanceExists } from "../../lib/utils";
import "../../styles/auth.scss";
import "../../styles/main.scss";
const baseUrl = "http://localhost:3030";
const createAccountButton = $.fromDOM("#create-an-account-button");
const loginInsteadButton = $.fromDOM("#login-instead-button");
const loginButton = $.fromDOM("#login-button");
const signupButton = $.fromDOM("#signup-button");

const loginEmailInput = $.fromDOM("#login-box-email");
const loginPasswordInput = $.fromDOM("#login-box-password");
const signupEmailInput = $.fromDOM("#signup-box-email");
const signupNameInput = $.fromDOM("#signup-box-name");
const signupPasswordInput = $.fromDOM("#signup-box-password");

const loginBox = $.fromDOM("#login-box");
const signupBox = $.fromDOM("#signup-box");

const userExists = checkIfUserInstanceExists();
if(userExists){
    window.location.href = "/";
}

async function sendLoginRequest(){
    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: loginEmailInput.value,
                password: loginPasswordInput.value
            })
        })
        const data = await response.json();
        if(data.message === "Login Successful"){
            localStorage.setItem("uid", data.uid);
            window.location.href = "/";
        }
        console.log(data)
    } catch(err){
        console.log(err)
    }
}
async function sendSignupRequest(){
    try {
        const response = await fetch(`${baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: signupEmailInput.value,
                name: signupNameInput.value,
                password: signupPasswordInput.value
            })
        })
        const data = await response.json();
        console.log(data)
    } catch(err){
        console.log(err)
    }
}

createAccountButton.addEvent("click", ()=>{
    loginBox.addClass("display-off");
    signupBox.removeClass("display-off");
})

loginInsteadButton.addEvent("click", ()=>{
    loginBox.removeClass("display-off");
    signupBox.addClass("display-off");
})

loginButton.addEvent("click", ()=>{
    console.log("login: ", loginEmailInput.value, loginPasswordInput.value)
    sendLoginRequest();
    loginEmailInput.value = "";
    loginPasswordInput.value = "";
})

signupButton.addEvent("click", ()=>{
    console.log("signup: ", signupEmailInput.value, signupNameInput.value, signupPasswordInput.value)
    sendSignupRequest();
    signupEmailInput.value = "";
    signupNameInput.value = "";
    signupPasswordInput.value = "";
})