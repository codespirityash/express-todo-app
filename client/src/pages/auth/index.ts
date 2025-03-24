import $ from "../../lib/$";
import "../../styles/auth.scss";
import "../../styles/main.scss";

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

async function sendLoginRequest(){}
async function sendSignupRequest(){}

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