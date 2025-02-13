
const form = document.getElementById("contact-form");
const formName = document.getElementById("name");
const formEmail = document.getElementById("email");
const formMessage = document.getElementById("textarea-message");
const formSubject = document.getElementById("subject");
const formStatus = document.getElementById("form-status");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.remove("success");
    inputControl.classList.add("error");
};

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.remove("error");
    inputControl.classList.add("success");
};

const validateInputs = () => {
    let allValid = true;
    const nameValue = formName.value.trim();
    const emailValue = formEmail.value.trim();
    const messageValue = formMessage.value.trim();
    const subjectValue = formSubject.value.trim();

    if (nameValue === "") {
        setError(formName, "Naam mag niet leeg zijn");
        allValid = false;
    }
    else if (nameValue.length > 60) {
        setError(formName, "Naam mag niet langer zijn dan 60 karakters");
        allValid = false;
    }

    else {
        setSuccess(formName);
    }
    if (emailValue === "") {
        setError(formEmail, "Email mag niet leeg zijn");
        allValid = false;
    } else if (!validateEmail(emailValue)) {
        setError(formEmail, "Email is niet geldig");
        allValid = false;
    } else {
        setSuccess(formEmail);
    }
    if (subjectValue === "") {
        setError(formSubject, "Onderwerp mag niet leeg zijn");
        allValid = false;
    }

    else if (subjectValue.length > 200) {
        setError(formSubject, "Onderwerp mag niet langer zijn dan 200 karakters");
        allValid = false;
    }

    else {
        setSuccess(formSubject);
    }
    if (messageValue === "") {
        setError(formMessage, "Bericht mag niet leeg zijn");
        allValid = false;
    }

    else if (messageValue.length > 600) {
        setError(formMessage, "Bericht mag niet langer zijn dan 600 karakters");
        allValid = false;
    }

    else {
        setSuccess(formMessage);
    }

    if (allValid) {
        formStatus.innerText = "Aan het verzenden...";

        fetch("/api/Mail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Name: nameValue,
                Email: emailValue,
                Subject: subjectValue,
                Message: messageValue,
            }),
        })
            .then((response) => response.text().then((data) => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                formStatus.innerHTML = "";
                if (ok) {
                    formStatus.innerText = "Email is verstuurd!";
                    form.reset();
                } else {
                    formStatus.innerText = "Email niet verstuurd: " + data;
                }
            })
            .catch((error) => {
                formStatus.innerHTML = "";
                formStatus.innerText = "Error: " + error.message;
            });
    }
};
