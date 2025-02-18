const form = document.getElementById("contact-form"),
    formName = document.getElementById("name"),
    formEmail = document.getElementById("email"),
    formMessage = document.getElementById("textarea-message"),
    formSubject = document.getElementById("subject"),
    formStatus = document.getElementById("form-status"),
    formCaptcha = document.getElementById("captcha");

const getCookie = (name) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        const [cookieName, cookieValue] = cookies[i].split("=");
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return "";
};

const saveFormData = () => {
    if (getCookie("gdpr") === "accepted") {
        localStorage.setItem("form_name", formName.value);
        localStorage.setItem("form_email", formEmail.value);
        document.cookie = `form_subject=${encodeURIComponent(formSubject.value)}; path=/; max-age=86400`;
        document.cookie = `form_message=${encodeURIComponent(formMessage.value)}; path=/; max-age=86400`;
    }
};

const restoreFormData = () => {
    if (getCookie("gdpr") === "accepted") {
        formName.value = localStorage.getItem("form_name") || "";
        formEmail.value = localStorage.getItem("form_email") || "";
        formSubject.value = getCookie("form_subject") || "";
        formMessage.value = getCookie("form_message") || "";
    }
};

[formName, formEmail, formSubject, formMessage].forEach((input) => {
    input.addEventListener("keyup", saveFormData);
});

document.addEventListener("DOMContentLoaded", restoreFormData);

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.remove("success");
    inputControl.classList.add("error");
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
    } else if (nameValue.length > 60) {
        setError(formName, "Naam mag niet langer zijn dan 60 karakters");
        allValid = false;
    } else {
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
    } else if (subjectValue.length > 200) {
        setError(formSubject, "Onderwerp mag niet langer zijn dan 200 karakters");
        allValid = false;
    } else {
        setSuccess(formSubject);
    }

    if (messageValue === "") {
        setError(formMessage, "Bericht mag niet leeg zijn");
        allValid = false;
    } else if (messageValue.length > 600) {
        setError(formMessage, "Bericht mag niet langer zijn dan 600 karakters");
        allValid = false;
    } else {
        setSuccess(formMessage);
    }

    if (!grecaptcha.getResponse() > 0) {
        setError(formCaptcha, "Captcha is niet ingevuld");
        allValid = false;
    } else {
        setSuccess(formCaptcha);
    }

    return allValid;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validateInputs()) {
        formStatus.innerText = "Aan het verzenden...";

        fetch("https://localhost:7239/api/mail/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: formName.value,
                Email: formEmail.value,
                Subject: formSubject.value,
                Message: formMessage.value,
                CaptchaResponse: grecaptcha.getResponse(),
            }),
        })
            .then((response) => response.text().then((data) => ({ ok: response.ok, data })))
            .then(({ ok, data }) => {
                formStatus.innerText = ok ? "Email is verstuurd!" : "Email niet verstuurd: " + data.toLowerCase();
                if (ok) {
                    document.cookie = "form_subject=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "form_message=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    form.reset();
                    restoreFormData();
                }
            })
            .catch((error) => {
                formStatus.innerText = "Fout: " + error.message.toLowerCase();
            });
    }
});
