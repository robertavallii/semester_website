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


// Seleziona la sezione "project" e gli elementi con la classe 'project-name'
const projectSection = document.getElementById('project');
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'none',
    zIndex: '999',
    pointerEvents: 'none',
});

// Crea l'elemento di anteprima dell'immagine
const imagePreview = document.createElement('div');
imagePreview.id = 'image-preview-project';
document.body.appendChild(imagePreview);

// Crea il pulsante di anteprima
const previewButton = document.createElement('button');
previewButton.id = 'preview-button';
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
    zIndex: '1001',
    border: '0px solid #FFF200',
    borderRadius: '0px',
    pointerEvents: 'auto',
    boxShadow: 'none',
    outline: 'none',
    textShadow: 'none',
    appearance: 'none',
    filter: 'none',
    webkitAppearance: 'none',
    mozAppearance: 'none',
});

// Stili per il pulsante di anteprima aggiornati
Object.assign(previewButton.style, {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#FFF200',
    color: 'rgba(0, 0, 0)',
    fontSize: '14px',
    fontWeight: '700',
    padding: '14px 16px',
    border: 'none',
    borderRadius: '0px',
    cursor: 'pointer',
    pointerEvents: 'auto',
    width: 'auto',
    height: '34px',
    boxShadow: 'none',
    outline: 'none',
    textShadow: 'none',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
    display: 'flex',          // Permette il centramento
    alignItems: 'center',      // Allinea verticalmente il testo al centro
    justifyContent: 'center',  // Allinea orizzontalmente il testo al centro
    textAlign: 'center',       // Assicura che il testo sia centrato
    lineHeight: 'normal',       // Previene problemi di altezza
    textTransform: 'uppercase' // Trasforma il testo in maiuscolo

});

// Effetto hover sul bottone
previewButton.addEventListener('mouseenter', () => {
    previewButton.style.backgroundColor = 'rgba(0, 0, 0)';
    previewButton.style.color = '#FFF200';
});

previewButton.addEventListener('mouseleave', () => {
    previewButton.style.backgroundColor = '#FFF200';
    previewButton.style.color = 'rgba(0, 0, 0)';
});

// Precaricamento delle immagini per evitare ritardi
const preloadedImages = {};
projectNames.forEach(project => {
    const imagePath = project.getAttribute('data-image');
    if (imagePath) {
        const img = new Image();
        img.src = imagePath;
        preloadedImages[imagePath] = img;
    }
});

// Funzione per mostrare l'anteprima solo nella sezione project
function isCursorInProjectSection(event) {
    const rect = projectSection.getBoundingClientRect();
    return (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );
}

// Gestione dell'evento mouseover sugli elementi project-name
projectNames.forEach((project, index) => {
    project.addEventListener('mouseover', (event) => {
        if (isCursorInProjectSection(event)) {
            const imagePath = project.getAttribute('data-image');
            if (preloadedImages[imagePath]) {
                const img = preloadedImages[imagePath];

                let width = img.width;
                let height = img.height;

                // Adatta dimensioni immagine
                if (width > height) {
                    if (width > 1000) {
                        const aspectRatio = height / width;
                        width = 1000;
                        height = width * aspectRatio;
                    }
                } else {
                    if (height > 800) {
                        const aspectRatio = width / height;
                        height = 800;
                        width = height * aspectRatio;
                    }
                }

                imagePreview.style.width = `${width}px`;
                imagePreview.style.height = `${height}px`;
                imagePreview.style.backgroundImage = `url(${imagePath})`;

                // Mostra l'overlay e l'anteprima solo se siamo nella sezione project
                overlay.style.display = 'block';
                imagePreview.style.display = 'block';

                // Imposta il testo del pulsante con il nome del progetto
                const projectName = project.textContent.trim();
                previewButton.textContent = `View ${projectName} project`;
            }
        }
    });

    // Nasconde l'anteprima quando si esce dall'ultimo elemento
    if (index === projectNames.length - 1) {
        project.addEventListener('mouseleave', () => {
            imagePreview.style.display = 'none';
            overlay.style.display = 'none';
        });
    }
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

// Nasconde l'overlay se si clicca fuori dall'immagine
overlay.addEventListener('click', (e) => {
    if (!imagePreview.contains(e.target)) {
        imagePreview.style.display = 'none';
        overlay.style.display = 'none';
    }
});
