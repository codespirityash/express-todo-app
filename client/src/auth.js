const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const toggleButton = document.getElementById("toggle-button");
const heading = document.getElementById("form-heading");

toggleButton.addEventListener("click", () => {
  if (signupForm.classList.contains("display-off")) {
    signupForm.classList.remove("display-off");
    loginForm.classList.add("display-off");
    heading.textContent = "Signup";
    toggleButton.textContent = "Login Instead";
  } else {
    signupForm.classList.add("display-off");
    loginForm.classList.remove("display-off");
    heading.textContent = "Login";
    toggleButton.textContent = "Signup Instead";
  }
});

function sendAuthRequest(url, data) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to authenticate");
      }
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Authentication successful!");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Authentication failed. Please try again.");
    });
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  sendAuthRequest("/api/login", { username, password });
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  sendAuthRequest("/api/signup", { username, password });
});
