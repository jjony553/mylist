const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){ //todo 지우기
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ //array의 모든 아이템을 통해 함수를 실행(forEach와 비슷) true인 아이템들만 가지고 새로운 array를 만듬
       return toDo.id != parseInt(li.id); 
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){ //todo저장
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));//JSON.stringify는 자바스ㅡ립트 object를 string으로 바꿔준다
}

function paintToDo(text){ //todo li추가
    const li= document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML="";
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", deleteToDo);
    if(text!=""){
        span.innerText = text;
        span.classList.add("toDoSpan");
        li.appendChild(delBtn);
        li.appendChild(span);
        li.id = newId;
        toDoList.appendChild(li);

        const toDoObj = {
            text : text,
            id : newId
        }
        toDos.push(toDoObj);
        saveToDos();
    }
}

function handleSubmit(e){
    e.preventDefault();
    try{
        if(JSON.parse(localStorage.getItem(TODOS_LS)).length > 4){
            alert("The todo-list cannot exceed 5 items");
            toDoInput.value = "";
            return;
        }
    }catch{
        
    }
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function something(toDo){
    paintToDo(toDo.text);
}      

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); //JSON의 string을 다시 object로
        parsedToDos.forEach(function(toDo){ //todo 내용 자동 저장
            paintToDo(toDo.text);
        });  
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();