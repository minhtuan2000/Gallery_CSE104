//Login and Signup
const loginElement = document.getElementById("login");
const signupElement = document.getElementById("signup");
const usernameText = document.getElementById("username-text");
const logoutElement = document.getElementById("logout");

const loginPage = document.getElementById("login-page");
const signupPage = document.getElementById("signup-page");

const cancelLogin = document.getElementById("cancel-login");
const cancelSignup = document.getElementById("cancel-signup");

const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");

loginElement.addEventListener("click", event => {
    loginPage.style.visibility = "visible";
});

signupElement.addEventListener("click", event => {
    signupPage.style.visibility = "visible";
});

logoutElement.addEventListener("click", event => {
    loginElement.style.visibility = "visible";
    signupElement.style.visibility = "visible";
    logoutElement.style.visibility = "hidden";
    usernameText.style.visibility = "hidden";
    usernameText.textContent = "";
    logout();
});

cancelLogin.addEventListener("click", event => {
    loginPage.style.visibility = "hidden";
});

cancelSignup.addEventListener("click", event => {
    signupPage.style.visibility = "hidden";
});

function addMessage(element, message){
    let newText = element.lastChild;
    //console.log(newText.nodeName);
    if (newText.nodeName.toString() != "P"){
        newText = document.createElement('p');
        newText.style.color = "red";
        newText.textContent = message;
        element.appendChild(newText);
    } else{
        newText.textContent = message;
    }
}

loginButton.addEventListener("click", event => {
    let username = document.getElementById("uname").value;
    let password = document.getElementById("psw").value;
    if (username == "" || password == ""){
        addMessage(loginPage, "Please fill in the form");
    } else {
        result = login(username, password);
        addMessage(loginPage, result);
    }
});

signupButton.addEventListener("click", event => {
    let username = document.getElementById("unames").value;
    let password = document.getElementById("psws").value;
    let password2 = document.getElementById("psw2s").value;
    if (username == "" || password == "" || password2 == ""){
        addMessage(signupPage, "Please fill in the form");
    } else 
    if (password != password2){
        addMessage(signupPage, "Re-entered password doesn't match");
    } else {
        result = signup(username, password);
        addMessage(signupPage, result);
    }
});