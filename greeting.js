const form= document.querySelector(".js-form"),
    input=form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const logout = document.querySelector(".logoutBtn");
const toDoInputT= document.querySelector(".js-toDoInput");

const USER_LS="currentUser";
const SHOWING_CN="showing";
const SHOWING_BTN_CN="showingBtn";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function showingToDoAndLogout(){
    toDoInputT.classList.add(SHOWING_CN);
    logout.classList.add(SHOWING_BTN_CN);
}

function handleSubmit(event){
    event.preventDefault(); //화면에서 삭제 방지
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
    showingToDoAndLogout();
}

function handleLogout(){
    localStorage.removeItem(USER_LS);
    localStorage.removeItem('toDos');
    window.location.reload();
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    logout.addEventListener("click", handleLogout);
    if(currentUser === null){
        askForName();
    }else {
        paintGreeting(currentUser);
        showingToDoAndLogout();
    }
}
function init(){
    loadName();
    //이름 저장된 곳 -> Fn+12 -> application->localstorage-> currentUser value
}
init();
