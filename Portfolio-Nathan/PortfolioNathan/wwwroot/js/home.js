document.addEventListener("DOMContentLoaded", function () {
    const subheading = document.getElementById("dynamic-subheading");
    const subheadings = [
        "Web Developer",
        "UI-UX Designer",
        "Software Engineer"
    ];
    let index = 0;

    function changeSubheading() {
        subheading.classList.add("fade-out"); 
        setTimeout(() => {
            index = (index + 1) % subheadings.length;
            subheading.textContent = subheadings[index];
            subheading.classList.remove("fade-out"); 
        }, 800); 
    }

    setInterval(changeSubheading, 3000); 
});
