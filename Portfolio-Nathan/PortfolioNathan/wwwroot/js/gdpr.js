const gdprContainer = document.querySelector(".gdpr");
const gdprButtons = document.querySelectorAll(".gdpr-button");

document.addEventListener("DOMContentLoaded", () => {
    if (document.cookie.includes("accepted")) return;
    setTimeout(() => {
        gdprContainer.classList.add("show");

        gdprButtons.forEach(button => {
            button.addEventListener("click", () => {
                gdprContainer.classList.remove("show");
                if (button.id === "gdpr-accept") {
                    document.cookie = "gdpr=accepted; max-age=" + 60 * 60 * 24 * 30;
                }
            });
        })
    }, 1000)        ;
});
