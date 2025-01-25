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

// Crea l'elemento overlay per lo sfondo scuro trasparente
const overlay = document.createElement('div');
overlay.id = 'image-overlay';
document.body.appendChild(overlay);

// Stili per l'overlay (sfondo nero trasparente)
Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Livello nero trasparente al 50%
    display: 'none',
    zIndex: '999',  // Dietro l'anteprima dell'immagine
    pointerEvents: 'none',  // Evita che l'overlay blocchi altri elementi
});

// Crea l'elemento di anteprima dell'immagine
const imagePreview = document.createElement('div');
imagePreview.id = 'image-preview-project';
document.body.appendChild(imagePreview);

// Crea il pulsante di anteprima
const previewButton = document.createElement('button');
previewButton.id = 'preview-button';
previewButton.textContent = 'View Project';
imagePreview.appendChild(previewButton);

// Stili per l'anteprima dell'immagine
Object.assign(imagePreview.style, {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '1000px',
    maxHeight: '1000px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    display: 'none',
    zIndex: '1001',  // Sopra l'overlay
    border: '0px solid #FFF200',
    borderRadius: '0px',
    pointerEvents: 'auto',
    boxShadow: 'none',
});

// Stili per il pulsante di anteprima aggiornati
Object.assign(previewButton.style, {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',  // Sfondo nero con trasparenza aggiungere 0.7 dopo ultimo zero
    color: '#FFF200',  // Testo giallo
    fontSize: '15px',
    fontWeight: '500',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'default',  // Nessun effetto di hover
    pointerEvents: 'auto',
    width: '154px',
    height: '34px',
});

// Rimuoviamo l'evento di hover per evitare cambi di stile
previewButton.addEventListener('mouseover', (e) => {
    e.stopPropagation(); // Impedisce modifiche indesiderate
});

// Gestione dell'evento mouseover sugli elementi project-name
projectNames.forEach(project => {
    project.addEventListener('mouseover', () => {
        const imagePath = project.getAttribute('data-image');
        if (imagePath) {
            const img = new Image();
            img.src = imagePath;
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                // Determina se l'immagine è in orizzontale o verticale
                if (width > height) {
                    // Immagine orizzontale, limitata a 800px di larghezza
                    if (width > 1000) {
                        const aspectRatio = height / width;
                        width = 1000;
                        height = width * aspectRatio;
                    }
                } else {
                    // Immagine verticale, limitata a 800px di altezza
                    if (height > 800) {
                        const aspectRatio = width / height;
                        height = 800;
                        width = height * aspectRatio;
                    }
                }

                imagePreview.style.width = `${width}px`;
                imagePreview.style.height = `${height}px`;
                imagePreview.style.backgroundImage = `url(${imagePath})`;

                // Mostra l'overlay e l'anteprima solo quando il mouse entra
                overlay.style.display = 'block';
                imagePreview.style.display = 'block';
            };
        }
        previewButton.textContent = `View project`;
        previewButton.onclick = () => {
            alert(`You clicked on ${project.textContent}`);
        };
    });
});

// Nasconde l'anteprima e l'overlay quando il mouse esce dall'immagine
imagePreview.addEventListener('mouseout', () => {
    imagePreview.style.display = 'none';
    overlay.style.display = 'none';
});

// Mantiene visibile l'anteprima finché il mouse è sopra di essa
imagePreview.addEventListener('mouseover', () => {
    imagePreview.style.display = 'block';
    overlay.style.display = 'block';
});