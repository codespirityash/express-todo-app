const formTitle = document.getElementById("form-title");
const authButton = document.getElementById("authButton");
const toggleText = document.getElementById("toggle-text");
const toggleLink = document.getElementById("toggle-link");
const authForm = document.getElementById("auth-form");

let isLogin = true;

toggleLink.addEventListener("click", (e) => {
  e.preventDefault();
  isLogin = !isLogin;

  if (isLogin) {
    formTitle.textContent = "Login";
    authButton.textContent = "Login";
    toggleText.innerHTML =
      'Don\'t have an account? <a href="#" id="toggle-link">Sign up</a>';
  } else {
    formTitle.textContent = "Signup";
    authButton.textContent = "Signup";
    toggleText.innerHTML =
      'Already have an account? <a href="#" id="toggle-link">Login</a>';
  }
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("authName").value;
  const password = document.getElementById("authPassword").value;

  let endpoint;
  if (isLogin) {
    endpoint = "/auth/login";
  } else {
    endpoint = "/auth/signup";
  }

  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(
        (isLogin ? "Login" : "Signup") + " Response: " + JSON.stringify(data)
      );
    })
    .catch((error) => console.error("Error:", error));
});
