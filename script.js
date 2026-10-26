
const form = document.getElementById("signupForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
  input.classList.toggle("valid", !message);
}

function validateName() {
  const name = nameInput.value.trim();

  if (name.length < 2) {
    showError(nameInput, nameError, "Enter at least 2 characters.");
    return false;
  }

  if (!/^[\p{L}\s'-]+$/u.test(name)) {
    showError(nameInput, nameError, "Use letters, spaces, apostrophes or hyphens.");
    return false;
  }

  showError(nameInput, nameError, "");
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!email) {
    showError(emailInput, emailError, "Email is required.");
    return false;
  }

  if (!emailPattern.test(email)) {
    showError(emailInput, emailError, "Enter a valid email address.");
    return false;
  }

  showError(emailInput, emailError, "");
  return true;
}

function checkPasswordStrength() {
  const password = passwordInput.value;
  let score = 0;

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = [
    "Not entered",
    "Weak",
    "Fair",
    "Good",
    "Strong"
  ];

  const widths = ["0%", "25%", "50%", "75%", "100%"];
  const strengthColors = [
    "#ccc",
    "#e63946",
    "#f4a261",
    "#e9c46a",
    "#2a9d5b"
  ];

  strengthBar.style.width = widths[score];
  strengthBar.style.backgroundColor = strengthColors[score];
  strengthText.textContent = "Password strength: " + labels[score];
}

function validatePassword() {
  const password = passwordInput.value;

  if (password.length < 8) {
    showError(
      passwordInput,
      passwordError,
      "Password must contain at least 8 characters."
    );
    return false;
  }

  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[^A-Za-z0-9]/.test(password)
  ) {
    showError(
      passwordInput,
      passwordError,
      "Include uppercase, lowercase, a number and a special character."
    );
    return false;
  }

  showError(passwordInput, passwordError, "");
  return true;
}

nameInput.addEventListener("input", () => {
  successMessage.textContent = "";
  validateName();
});

emailInput.addEventListener("input", () => {
  successMessage.textContent = "";
  validateEmail();
});

passwordInput.addEventListener("input", () => {
  successMessage.textContent = "";
  checkPasswordStrength();
  validatePassword();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValid = validateName();
  const emailValid = validateEmail();
  const passwordValid = validatePassword();

  if (nameValid && emailValid && passwordValid) {
    successMessage.textContent =
      "Account form submitted successfully! 🎉";

    // Demo only: no account is actually created or stored.
    form.reset();

    [nameInput, emailInput, passwordInput].forEach((input) => {
      input.classList.remove("valid", "invalid");
    });

    [nameError, emailError, passwordError].forEach((error) => {
      error.textContent = "";
    });

    strengthBar.style.width = "0";
    strengthText.textContent = "Password strength: Not entered";
  } else {
    successMessage.textContent = "";
  }
});
