
const todos = [
   // {
   //    id: 0,
   //    text: 'todo1',
   //    isCompleted: false
   // },
   // {
   //    id: 1,
   //    text: "todo2",
   //    isCompleted: true
   // }
]

const addItemBtn = document.querySelector('.add-item');
const newItemInp = document.querySelector('.new-item');
const list = document.querySelector('.list');

const generateId = ()=> Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

function addTodo(e) {
   e.preventDefault();
   const id = generateId();
   const text = newItemInp.value;
   const newTodo = {
      id,
      text,
      isCompleted: false
   }
   todos.push(newTodo);

}

function addToList(){
let listItem = document.createElement("LI");
   listItem.textContent = newItem;
   list.appendChild(listItem)
}


addItemBtn.addEventListener("click", addTodo);