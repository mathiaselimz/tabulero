const auth = firebase.auth();

const errorMessages = {
  "auth/invalid-email": "That email looks a little off. Try again.",
  "auth/user-not-found": "We couldn't find that user. Want to sign up?",
  "auth/wrong-password": "Incorrect password. Try again.",
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/missing-password": "Please enter your password.",
  "auth/missing-email": "Please enter your email address.",
};

function showError(message) {
  const errorBox = document.getElementById("error-box");
  errorBox.innerText = message;
  errorBox.style.display = "block";
}

function showErrorByCode(error) {
  const msg = errorMessages[error.code] || "Something went wrong. Try again.";
  showError(msg);
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      showErrorByCode(error);
    });
}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      showErrorByCode(error);
    });
}

window.login = login;
window.signup = signup;

