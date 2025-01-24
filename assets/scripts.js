//animazione immagini
document.addEventListener('DOMContentLoaded', () => {
    let currentImageIndex = 0;
    const imagePaths = [];
    const totalImages = 23;
    const imageFolder = './assets/immagini/animazione_jpg/';

    for (let i = 1; i <= totalImages; i++) {
        imagePaths.push(`${imageFolder}image${i}.jpg`);
    }

    function createImages() {
        const container = document.getElementById('image-container');
        if (!container) {
            console.error('Contenitore #image-container non trovato.');
            return;
        }

        imagePaths.forEach((path, index) => {
            const img = document.createElement('img');
            img.src = path;
            img.classList.add('image-slide');
            if (index === 0) img.classList.add('active');
            container.appendChild(img);
        });

        const animazione = document.getElementById('animazione');
        if (animazione) {
            container.style.height = `${animazione.offsetHeight}px`;
        } else {
            console.warn('#animazione non trovato. Assicurati che esista.');
        }
    }

    function changeImage() {
        const images = document.querySelectorAll('.image-slide');
        if (images.length === 0) return;
        images.forEach(img => img.classList.remove('active'));
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    createImages();
    setInterval(changeImage, 2000);
//menu nav
    const menuIcon = document.getElementById('menu-icon');
    const menuIconImg = menuIcon?.querySelector('img');
    const mobileNav = document.getElementById('mobile-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerIcon = './assets/icon/menu_icon.svg';
    const closeIcon = './assets/icon/close_icon.svg';

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            mobileNav?.classList.toggle('active');
            menuOverlay?.classList.toggle('active');
            menuIconImg.src = mobileNav?.classList.contains('active') ? closeIcon : hamburgerIcon;
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            mobileNav?.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuIconImg.src = hamburgerIcon;
        });
    }

    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuOverlay?.classList.remove('active');
                menuIconImg.src = hamburgerIcon;
            });
        });
    }

    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);

            targetSection?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });
});




    // Seleziona tutti gli elementi con la classe 'project-name'
const projectNames = document.querySelectorAll('.project-name');

// Crea l'elemento di anteprima dell'immagine
const imagePreview = document.createElement('div');
imagePreview.id = 'image-preview-project';

// Crea il pulsante di anteprima
const previewButton = document.createElement('button');
previewButton.id = 'preview-button';
previewButton.textContent = 'View Project';
imagePreview.appendChild(previewButton);
document.body.appendChild(imagePreview);

// Stili per l'anteprima dell'immagine
Object.assign(imagePreview.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '760px',
    height: '530px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'none',
    zIndex: '1000',
    border: '0px solid #FFF200',
    borderRadius: '0px',
    pointerEvents: 'auto',  // Cambiato per permettere l'interazione con l'elemento
    boxShadow: 'none',
});

// Stili per il pulsante di anteprima
Object.assign(previewButton.style, {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    color: '#FFF200',
    fontSize: '15px',
    fontWeight: '500',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    pointerEvents: 'auto',
    width: '154px',
    height: '34px',
});

// Effetto hover sul pulsante
previewButton.addEventListener('mouseover', () => {
    previewButton.style.backgroundColor = '#000';
    previewButton.style.color = '#FFF200';
});

// Gestione dell'evento mouseover sugli elementi project-name
projectNames.forEach(project => {
    project.addEventListener('mouseover', () => {
        const imagePath = project.getAttribute('data-image');
        if (imagePath) {
            imagePreview.style.backgroundImage = `url(${imagePath})`;
            imagePreview.style.display = 'block';
        }
        previewButton.textContent = `View project`;
        previewButton.onclick = () => {
            alert(`You clicked on ${project.textContent}`);
        };
    });
});

// Mantiene visibile l'anteprima finché il mouse è sopra di essa
imagePreview.addEventListener('mouseover', () => {
    imagePreview.style.display = 'block';
});

// Nasconde l'anteprima solo quando il mouse esce dall'elemento immagine-preview
imagePreview.addEventListener('mouseout', () => {
    imagePreview.style.display = 'none';
});

