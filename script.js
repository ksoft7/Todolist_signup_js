"use strict";
console.log("HI");
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      checkData();
    });

  document
    .getElementById("signup-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      saveData();
    });
});

// signup form
// to save data
function saveData() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  console.log(name, email, password);

  // Retrieve users from local storage
  let user_records = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Check if the email already exists in the records
  if (user_records.some((user) => user.email === email)) {
    alert("User already exists");
    console.log("Error: User already exists");
  } else {
    user_records.push({ name, email, password });
    localStorage.setItem("userDetails", JSON.stringify(user_records));
    alert("Registration successful!");
  }
}

// login user
function checkData() {
  let email = document.querySelector(".emai").value;
  let password = document.querySelector(".passwor").value;

  // retrieve user_records
  let correct_record = JSON.parse(localStorage.getItem("userDetails")) || [];

  let valid_user = correct_record.find(
    (user) => user.email === email && user.password === password
  );

  if (valid_user) {
    alert("user matched");

    localStorage.setItem("name", valid_user.name);
    localStorage.setItem("emai", valid_user.email);

    console.log("name" + localStorage.getItem("name"));
    window.location.replace("index.html");
  } else {
    console.log("User not found");
    alert("Login Failed!");
  }
}
