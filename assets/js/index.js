let todos = [
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
];

const addItemBtn = document.querySelector(".add-item");
const newItemInp = document.querySelector(".new-item");
const list = document.querySelector(".list");

const generateId = () =>
  Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

function addTodo(id) {
  const text = newItemInp.value;
  const newTodo = {
    id,
    text,
    isCompleted: false,
  };
  todos.push(newTodo);
}

function addToList(id) {
  const listItem = document.createElement("LI");
  const removeBtn = document.createElement("button");

  listItem.textContent = newItemInp.value;
  listItem.setAttribute("id", `${id}`);
  removeBtn.textContent = "X";

  removeBtn.addEventListener("click", onRemoveItem);
  listItem.appendChild(removeBtn);
  list.appendChild(listItem);
}

// function showList() {
//   list.querySelectorAll("*").forEach((item) => item.remove());
//   todos.map((todo) => {
//     const listItem = document.createElement("LI");
//     const removeBtn = document.createElement("button");

//     listItem.textContent = newItemInp.value;
//     listItem.setAttribute("id", `${todo.id}`);
//     removeBtn.textContent = "X";

//     removeBtn.addEventListener("click", onRemoveItem);
//     listItem.appendChild(removeBtn);
//     list.appendChild(listItem);
//   });
// }

function onSubmitForm(e) {
  e.preventDefault();
  const id = generateId();
  if (!newItemInp.value) return;
  addTodo(id);
  addToList(id);
  //   showList();
  newItemInp.value = "";
  console.log(todos);
}

function removeTodo(id) {
  console.log(id);
  todos = todos.filter((todo, index) => todo.id != id);
  //console.log(updatedTodo);
}

function removeFromList(item) {
  console.log(item);
  item.remove();
}

function onRemoveItem(e) {
  const id = e.target.parentNode.id;
  removeTodo(id);
  removeFromList(e.target.parentNode);
}

addItemBtn.addEventListener("click", onSubmitForm);
