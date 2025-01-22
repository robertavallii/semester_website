// Seleziona gli elementi
const menuIcon = document.getElementById('menu-icon'); // Seleziona il div contenitore
const menuIconImg = menuIcon.querySelector('img'); // Seleziona l'immagine all'interno del div
const mobileNav = document.getElementById('mobile-nav');

// Percorsi delle immagini
const hamburgerIcon = './assets/icon/menu_icon.svg';
const closeIcon = './assets/icon/close_icon.svg';

// Aggiungi l'evento click all'icona hamburger
menuIcon.addEventListener('click', () => {
    // Alterna la visibilità del menu mobile
    mobileNav.classList.toggle('active');

    // Cambia l'icona tra hamburger e "X"
    if (mobileNav.classList.contains('active')) {
        menuIconImg.src = closeIcon; // Mostra l'icona "X"
    } else {
        menuIconImg.src = hamburgerIcon; // Mostra l'icona hamburger
    }
});
