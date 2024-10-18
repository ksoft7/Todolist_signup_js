"use strict";

var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleDateString();

//for username
document.getElementById("userName").innerHTML = localStorage.getItem("name");

//for adding task localstorage
const itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

console.log(itemsArray);

//creating a task
document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#inputbox");
  createItem(item);
  item.value = "";
});

function createItem(item) {
  const itemObject = {
    class: "item",
    text: item.value,
  };

  itemsArray.push(itemObject);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  displayItems();
}

//displaying it on screen

function displayItems() {
  let items = "";
  for (let i = 0; i < itemsArray.length; i++) {
    const classNames = itemsArray[i].class === "done" ? "done" : "item";

    items += `<div class="${classNames}">
<div class="input-controller">
<textarea disabled>${itemsArray[i].text}</textarea>
<div class="edit-controller">
<i class="fa-solid fa-check doneBtn"></i>
<i class="fa-solid fa-pen-to-square editBtn"></i>
<i class="fa-solid fa-circle-xmark deleteBtn"></i>
</div>
</div>
<div class="update-controller">
<button class="saveBtn">Save</button>
<button class="cancelBtn">Cancel</button>
</div>
</div>`;
  }
  document.querySelector(".task-lists").innerHTML = items;
  activateDoneListeners();
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

//delete button function
function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteItem(i);
    });
  });
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  // location.reload()
  displayItems();
}

//edit button function
function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editBtn.forEach((eB, i) => {
    eB.addEventListener("click", () => {
      updateController[i].style.display = "flex";
      inputs[i].disabled = false;
    });
  });
}

//save button for editing content
function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sB, i) => {
    sB.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    });
  });
}

function updateItem(text, i) {
  itemsArray[i].text = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

//cancel button for editing content
function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  cancelBtn.forEach((cB, i) => {
    cB.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      inputs[i].style.border = "none";
    });
  });
}

function activateDoneListeners() {
  const doneBtn = document.querySelectorAll(".doneBtn");
  doneBtn.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      markAsDone(i);
    });
  });
}

function markAsDone(index) {
  const item = document.querySelectorAll(".item")[index];
  item.classList.toggle("done"); // Toggle "done" class

  // Retrieve items from local storage
  let itemsArray = JSON.parse(localStorage.getItem("items")) || [];

  // Update the item's state in the array
  itemsArray[index].class = item.classList.contains("done") ? "done" : "item";

  // Store the updated array back in local storage
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

//logout button function
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("logout-button")
    .addEventListener("click", function () {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      window.location.replace("Todolist_signup.html");
    });
});

window.onload = function () {
  console.log(localStorage.getItem("name"));
  displayItems();
};
