function login() {
  let name = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;
  fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Login Response: " + JSON.stringify(data));
    })
    .catch((error) => console.log("Error:", error));
}

function signup() {
  let name = document.getElementById("signupName").value;
  let password = document.getElementById("signupPassword").value;
  fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Signup Response: " + JSON.stringify(data));
    })
    .catch((error) => console.log("Error:", error));
}
