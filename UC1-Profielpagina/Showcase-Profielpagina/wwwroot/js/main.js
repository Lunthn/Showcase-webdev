// make copyright label always show current year
const copyrightYearLabel = document.getElementById('copyright-year');

document.addEventListener('DOMContentLoaded', () => {
    copyrightYearLabel.innerText = new Date().getFullYear();
});