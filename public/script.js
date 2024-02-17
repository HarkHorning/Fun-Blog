document.addEventListener('DOMContentLoaded', function() {

    const homeButton = document.getElementById('homeButton');
    const aboutButton = document.getElementById('aboutButton');
    const contactButton = document.getElementById('contactButton');
    const star = document.getElementById('star');
    const aboutSection = document.getElementById('aboutSection');
    const wizard = document.getElementById('wizImage');
    const backgroundStar = document.getElementById('backgroundStar');

    aboutButton.addEventListener('click', function() {
        aboutSection.style.display = 'contents';
        homeButton.className = 'button';
        aboutButton.className = 'button-selected';
    })

    contactButton.addEventListener('click', function() {
        let picker = Math.random();
        if (picker >= 0.35){
            star.classList.add('flip');
            const timer = setInterval(() => {
                star.classList.remove('flip');
                clearInterval(timer);
            }, 2500);
        } 
        if (picker >= 0.9) {
            wizard.classList.add('flip');
            const timer = setInterval(() => {
                wizard.classList.remove('flip');
                clearInterval(timer);
            }, 2500);
        }
        if (picker <= 0.35) {
            backgroundStar.classList.add('flip');
            const timer = setInterval(() => {
                backgroundStar.classList.remove('flip');
                clearInterval(timer);
            }, 2500);
        }
    })
})