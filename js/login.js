//import { userData } from "../data/userData.js";
//
//const onLogin = () => {
//    const usernameElm = document.querySelector('#username').value
//    const passwordElm = document.querySelector('#password').value
//    
//    const users = userData.find(user => user.username == usernameElm && user.password == passwordElm )
//
//    if (users) {
//        localStorage.setItem('user', JSON.stringify(users))
//        window.location.href = "home.html"
//    } else {
//        alert('username atau password tidak sesuai')
//    }
//}
//
//const formElm = document.getElementById('loginForm')
//
//formElm.addEventListener('submit', function(event){
//    event.preventDefault()
//    onLogin()
//})

import { userData } from "../data/dataUser.js";

const onLogin = () => {
    const usernameElm = document.querySelector('#username').value
    console.log(usernameElm)
    const passwordElm = document.querySelector('#password').value
    console.log(passwordElm)
    const users = userData.find(user => user.username == usernameElm && user.password == passwordElm);

    if (users) {
        localStorage.setItem('user', JSON.stringify(users))
        window.location.href = "home.html"
    } else {
        alert('username atau password tidak sesuai')
    }
}

const formElm = document.getElementById('loginForm')

formElm.addEventListener('submit', function(event){
    event.preventDefault()
    onLogin()
})