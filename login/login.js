const loginButton = document.getElementById('loginButton');

const test = () => {
    const loginButton = document.getElementById('loginButton');
    loginButton.click();
};

test();

const loginButton2 = document.getElementById('log-in-button');
window.addEventListener("keypress", function (e) {
     if (13 === e.key) { 
        loginButton2.click();
    } 
});