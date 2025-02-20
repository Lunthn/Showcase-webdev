// make copyright label always show current year
const copyrightYearLabel = document.getElementById('copyright-year');

document.addEventListener('DOMContentLoaded', () => {
    copyrightYearLabel.innerText = new Date().getFullYear();
});

// make animation work for every browser
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
        else {
            entry.target.classList.remove('show');
        }
    })
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(element => observer.observe(element));
