// select elements
const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

// load saved tasks
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// save tasks
function saveTodos(){
localStorage.setItem("todos", JSON.stringify(todos));
}

// create task element
function createTask(todo, index){

const li = document.createElement("li");

// checkbox
const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.checked = todo.completed;

checkbox.addEventListener("change", ()=>{
todo.completed = checkbox.checked;
render();
saveTodos();
});

// task text
const text = document.createElement("span");
text.textContent = todo.text;
text.style.margin = "0 10px";

// edit task
text.addEventListener("dblclick", ()=>{
const newText = prompt("Edit task", todo.text);

if(newText !== null){
todo.text = newText.trim();
text.textContent = todo.text;
saveTodos();
}
});

// delete button
const delBtn = document.createElement("button");
delBtn.textContent = "Delete";

delBtn.addEventListener("click", ()=>{
todos.splice(index,1);
render();
saveTodos();
});

li.appendChild(checkbox);
li.appendChild(text);
li.appendChild(delBtn);

return li;
}

// render tasks
function render(){

pendingList.innerHTML = "";
completedList.innerHTML = "";

todos.forEach((todo,index)=>{

const taskNode = createTask(todo,index);

if(todo.completed){
completedList.appendChild(taskNode);
}else{
pendingList.appendChild(taskNode);
}

});

}

// add task
function addTask(){

const text = input.value.trim();

if(!text){
return;
}

todos.push({
text:text,
completed:false,
date:new Date().toLocaleString()
});

input.value="";

render();
saveTodos();
}

// button click
addBtn.addEventListener("click", addTask);

// enter key
input.addEventListener("keypress",(e)=>{
if(e.key==="Enter"){
addTask();
}
});

// initial render
render();
