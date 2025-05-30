const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const errorExpression = document.getElementById("error");

document.getElementById("confirm").addEventListener('click', function () {
    let errors = [];

    const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;

    if (!emailPattern.test(email.value)) {
        errors.push("Invalid email");
    }

    if (!/[A-Z]/.test(password.value)) {
        errors.push("Password must contain uppercase letter");
    }

    if (!/[a-z]/.test(password.value)) {
        errors.push("Password must contain lowercase letter");
    }

    if (!/[0-9]/.test(password.value)) {
        errors.push("Password must contain a number");
    }

    if (password.value.length < 6) {
        errors.push("Password must be at least 6 characters");
    }

    if (password.value !== confirmPassword.value) {
        errors.push("Passwords do not match");
    }

    if (errors.length > 0) {
        errorExpression.textContent = errors.join(", ");
    } else {
        // Успішний вхід
        errorExpression.textContent = "";
        location.replace("../../source/html/user-profile.html");
    }
});