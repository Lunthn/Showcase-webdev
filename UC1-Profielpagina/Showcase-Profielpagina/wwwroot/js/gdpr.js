const gdprContainer = document.querySelector(".gdpr");
const gdprButtons = document.querySelectorAll(".gdpr-button");

document.addEventListener("DOMContentLoaded", () => {
    //don't show gdpr if user has already accepted
    if (document.cookie.includes("accepted")) return;
    gdprContainer.classList.add("show");

    gdprButtons.forEach(button => {
        button.addEventListener("click", () => {
            gdprContainer.classList.remove("show");
            if (button.id === "gdpr-accept") {
                // set cookie for 30 days
                document.cookie = "gdpr=accepted; max-age=" + 60 * 60 * 24 * 30;
            }
        });
    });
});
