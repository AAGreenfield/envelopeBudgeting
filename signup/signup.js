
const test = () => {
    const signup = document.getElementById('signupButton');
    signup.click();
};
test();

const signupButton = document.getElementById('sign-up-button');
window.addEventListener("keypress", function (e) {
     if (13 === e.key) { 
        signupButton.click();
    } 
});