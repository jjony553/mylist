const clockContainer = document.querySelector(".js-clock"),
      clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}`:hours}:${minutes < 10 ? `0${minutes}`:minutes}:${seconds <10 ? `0${seconds}` : seconds}`;
    //미니 if, hours가 10보다 작으면 hours 앞에 0을 붙이고 아니면 그냥 hours
}


function init(){
    getTime();
    setInterval(getTime, 1000); //1000 = 1초
}

init();