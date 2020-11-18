let todos = [
  {
    id: 5,
    text: "todo1",
    isCompleted: false,
  },
  {
    id: 1,
    text: "todo2",
    isCompleted: true,
  },
];

const addItemBtn = document.querySelector(".add-item");
const newItemInp = document.querySelector(".new-item");
const uncompletedList = document.querySelector(".uncompleted");
const completedList = document.querySelector(".completed");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const editInp = document.querySelector(".edit-inp");
const editBtn = document.querySelector(".btn-edit");
let listItemId;

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

function addToList(id, text, iscompleted) {
  console.log("xx");
  const listItem = document.createElement("LI");
  const content = document.createElement("p");

  const btnGroup = document.createElement("div");
  const editBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const editIcon = document.createElement("i");
  const removeIcon = document.createElement("i");

  editBtn.setAttribute("class", "btn btn-icon btn-edit ");
  removeBtn.setAttribute("class", "btn btn-icon btn-remove ");
  editIcon.setAttribute("class", "far fa-edit");
  removeIcon.setAttribute("class", "far fa-trash-alt");
  btnGroup.setAttribute("class", "btn-group");
  content.setAttribute("id", `ti${id}`);
  listItem.setAttribute("draggable", "true");
  // listItem.addEventListener("dragstart", dragTodo);
  removeBtn.addEventListener("click", onRemoveItem);
  editBtn.addEventListener("click", () => {
    openModal(text, id);
  });

  content.textContent = text;
  removeBtn.appendChild(removeIcon);
  editBtn.appendChild(editIcon);
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(removeBtn);
  listItem.appendChild(content);
  listItem.appendChild(btnGroup);

  iscompleted
    ? completedList.appendChild(listItem)
    : uncompletedList.appendChild(listItem);
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

  addToList(id, newItemInp.value, false);

  addTodo(id);
  //   showList();
  newItemInp.value = "";
  console.log(todos);
}

function removeTodo(id) {
  console.log(id);
  todos = todos.filter((todo, index) => todo.id != id);
}

function removeFromList(item) {
  console.log(item);
  item.remove();
}

function onRemoveItem(e) {
  const id = e.target.parentNode.parentNode.parentNode.id;
  console.log(e.target.parentNode.parentNode.parentNode.parentNode);
  removeTodo(id);
  removeFromList(e.target.parentNode.parentNode.parentNode);
}

const openModal = (text, id) => {
  modal.className = "modal active";
  //  editBtn.setAttribute("id", `${id}`);
  listItemId = id;
  editInp.focus();
  editInp.value = text;
};

const closeModal = () => (modal.className = "modal");

addItemBtn.addEventListener("click", onSubmitForm);
modalBg.addEventListener("click", closeModal);

editBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const updatedListItem = document.querySelector(`#ti${listItemId}`);
  console.log(updatedListItem);
  updatedListItem.textContent = editInp.value;
  closeModal();
});

todos.forEach((todo) => {
  addToList(`${todo.id}`, todo.text, todo.isCompleted);
});
