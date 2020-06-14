const todoInput = document.querySelector(".todo_greeting_input");
const todoGreetingText = document.querySelector(".todo_greeting_hello");

function getLocalStorage(){
   const savedUserName = localStorage.getItem("userName");
   if(savedUserName){
    todoInput.classList.add("display_none");
    todoGreetingText.innerHTML = `Hello! ${savedUserName}`
   }

}

function setLocalStorage(name){
    localStorage.setItem("userName", name);
}

function paintGreeting(name){
    todoGreetingText.innerHTML = `Hello, ${name}`
    setLocalStorage(name);
}

function handleSubmit(e){
    const userName = e.target.value
    paintGreeting(userName);
    todoInput.classList.add("display_none");
}
function init(){
    getLocalStorage();
    todoInput.addEventListener("change", handleSubmit)
}

init();