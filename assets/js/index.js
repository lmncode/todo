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
const unCompletedList = document.querySelector(".uncompleted");
const completedList = document.querySelector(".completed");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal-bg");
const editInp = document.querySelector(".edit-inp");
const editBtn = document.querySelector(".btn-edit");
const count = document.querySelector(".count");
let listItemId;
let draggetItemIndex;
let droppedItemIndex;

const generateId = () =>
  Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

//add todo
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
  content.setAttribute("id", `t${id}`);
  listItem.setAttribute("id", `i${id}`);
  listItem.setAttribute("draggable", "true");

  listItem.addEventListener("dragstart", (e) =>
    e.dataTransfer.setData("item", e.target.id)
  );
  listItem.addEventListener("dragover", (e) => e.preventDefault());
  listItem.addEventListener("drop", onSortTodo);
  removeBtn.addEventListener("click", onRemoveItem);
  editBtn.addEventListener("click", () => openModal(text, id));

  content.textContent = text;
  removeBtn.appendChild(removeIcon);
  editBtn.appendChild(editIcon);
  btnGroup.appendChild(editBtn);
  btnGroup.appendChild(removeBtn);
  listItem.appendChild(content);
  listItem.appendChild(btnGroup);

  iscompleted
    ? completedList.appendChild(listItem)
    : unCompletedList.appendChild(listItem);
}

function onAddTodo(e) {
  e.preventDefault();
  if (!newItemInp.value) return;
  const id = generateId();
  addTodo(id);
  showTodoList(id, newItemInp.value, false);
  newItemInp.value = "";
}

//remove todo
const removeTodo = (id) =>
  (todos = todos.filter((todo) => todo.id != parseInt(id)));

function onRemoveItem(e) {
  e.preventDefault();
  const id = e.target.parentNode.parentNode.parentNode.childNodes[0].id.slice(
    1
  );
  removeTodo(id);
  showTodoList();
}
//edit todo
const editTodo = (id, updatedText) =>
  todos.forEach((todo) =>
    todo.id === parseInt(id) ? (todo.text = updatedText) : null
  );

function onEditTodo(e) {
  e.preventDefault();
  editTodo(listItemId, editInp.value);
  showTodoList();
  closeModal();
}

//complete todo
function onSortTodo(e) {
  const draggetItemId = parseInt(e.dataTransfer.getData("item").slice(1));
  const droppedItemId = parseInt(e.target.id.slice(1));
  todos.forEach((todo, index) => {
    if (todo.id === draggetItemId) draggetItemIndex = index;
    if (todo.id === droppedItemId) droppedItemIndex = index;
  });
  let copy = todos[draggetItemIndex];
  todos[draggetItemIndex] = todos[droppedItemIndex];
  todos[droppedItemIndex] = copy;
  showTodoList();
}

//show list
function showTodoList() {
  completedList.textContent = "";
  unCompletedList.textContent = "";
  todos.forEach((todo) => {
    addToList(`${todo.id}`, todo.text, todo.isCompleted);
  });
  calcCount();
}
showTodoList();

//calculate completed todos count
function calcCount() {
  const completedTodosCount = todos.filter((todo) => todo.isCompleted).length;
  const unCompletedTodosCount = todos.filter((todo) => !todo.isCompleted)
    .length;
  count.textContent = `Completed todo ${completedTodosCount}/${todos.length}`;

  const smileIcon = document.createElement("i");
  smileIcon.setAttribute("class", "fas fa-grin-hearts emoji");

  const sadIcon = document.createElement("i");
  sadIcon.setAttribute("class", "fas fa-frown emoji");

  if (!completedTodosCount && unCompletedTodosCount)
    completedList.appendChild(sadIcon);
  if (!unCompletedTodosCount && completedTodosCount)
    unCompletedList.appendChild(smileIcon);
}

// open/close modal
const openModal = (text, id) => {
  modal.className = "modal active";
  listItemId = id;
  editInp.focus();
  editInp.value = text;
};
const closeModal = () => (modal.className = "modal");

//events
addItemBtn.addEventListener("click", onAddTodo);
modalBg.addEventListener("click", closeModal);
editBtn.addEventListener("click", onEditTodo);
completedList.addEventListener("dragover", (e) => e.preventDefault());
unCompletedList.addEventListener("dragover", (e) => e.preventDefault());

//drag to right side
completedList.addEventListener("drop", (e) => {
  const id = e.dataTransfer.getData("item");
  completedList.appendChild(document.querySelector(`#${id}`));
  console.log(id.slice(1));
  todos.forEach((todo) =>
    todo.id === parseInt(id.slice(1)) ? (todo.isCompleted = true) : null
  );
  showTodoList();
});

//drag to left side
unCompletedList.addEventListener("drop", (e) => {
  const id = e.dataTransfer.getData("item");
  unCompletedList.appendChild(document.querySelector(`#${id}`));
  console.log(id.slice(1));
  todos.forEach((todo) =>
    todo.id === parseInt(id.slice(1)) ? (todo.isCompleted = false) : null
  );
  showTodoList();
});
