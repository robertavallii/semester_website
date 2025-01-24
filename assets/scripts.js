document.addEventListener('DOMContentLoaded', () => {
    // Variabili per l'animazione delle immagini
    let currentImageIndex = 0;
    const imagePaths = [];
    const totalImages = 23; // Numero totale di immagini
    const imageFolder = './assets/immagini/animazione_jpg/';

    // Carica i percorsi delle immagini
    for (let i = 1; i <= totalImages; i++) {
        imagePaths.push(`${imageFolder}image${i}.jpg`);
    }

    // Crea le immagini nel contenitore
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
            if (index === 0) img.classList.add('active'); // Mostra la prima immagine
            container.appendChild(img);
        });

        // Adatta altezza container all'elemento animazione
        const animazione = document.getElementById('animazione');
        if (animazione) {
            container.style.height = `${animazione.offsetHeight}px`;
        } else {
            console.warn('#animazione non trovato. Assicurati che esista.');
        }
    }

    // Funzione per cambiare l'immagine del carosello
    function changeImage() {
        const images = document.querySelectorAll('.image-slide');
        if (images.length === 0) return;
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    // Avvio dell'animazione
    createImages();
    setInterval(changeImage, 2000); // Cambia immagine ogni 2 secondi

    // Gestione del menu mobile
    const menuIcon = document.getElementById('menu-icon');
    const menuIconImg = menuIcon?.querySelector('img');
    const mobileNav = document.getElementById('mobile-nav');
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerIcon = './assets/icon/menu_icon.svg';
    const closeIcon = './assets/icon/close_icon.svg';

    // Apertura e chiusura del menu mobile
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            mobileNav?.classList.toggle('active');
            menuOverlay?.classList.toggle('active');
            menuIconImg.src = mobileNav?.classList.contains('active') ? closeIcon : hamburgerIcon;
        });
    }

    // Chiudi il menu cliccando sull'overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            mobileNav?.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuIconImg.src = hamburgerIcon;
        });
    }

    // Chiudi il menu cliccando su un link
    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                menuOverlay?.classList.remove('active');
                menuIconImg.src = hamburgerIcon;
            });
        });
    }

    // Scorrimento fluido per i link
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


 // Funzionalità anteprima progetto (STATIC POSITION)
 const projectNames = document.querySelectorAll('.project-name');
 const imagePreview = document.createElement('div');
 imagePreview.id = 'image-preview-project';

 const previewButton = document.createElement('button');
 previewButton.id = 'preview-button';
 previewButton.textContent = 'View Project';
 imagePreview.appendChild(previewButton);
 document.body.appendChild(imagePreview);

 // Stile statico dell'anteprima
 imagePreview.style.position = 'fixed';
 imagePreview.style.top = '50%';
 imagePreview.style.left = '50%';
 imagePreview.style.transform = 'translate(-50%, -50%)';
 imagePreview.style.width = '760px';
 imagePreview.style.height = '530px';
 imagePreview.style.backgroundSize = 'cover';
 imagePreview.style.backgroundPosition = 'center';
 imagePreview.style.display = 'none';
 imagePreview.style.zIndex = '1000';
 imagePreview.style.border = '3px solid #FFF200';
 imagePreview.style.borderRadius = '10px';
 imagePreview.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
 imagePreview.style.pointerEvents = 'none';

 previewButton.style.position = 'absolute';
 previewButton.style.bottom = '20px';
 previewButton.style.left = '50%';
 previewButton.style.transform = 'translateX(-50%)';
 previewButton.style.backgroundColor = '#FFF200';
 previewButton.style.color = '#000';
 previewButton.style.fontSize = '20px';
 previewButton.style.fontWeight = '700';
 previewButton.style.padding = '10px 20px';
 previewButton.style.border = 'none';
 previewButton.style.borderRadius = '5px';
 previewButton.style.cursor = 'pointer';
 previewButton.style.pointerEvents = 'auto';

 previewButton.addEventListener('mouseover', () => {
     previewButton.style.backgroundColor = '#000';
     previewButton.style.color = '#FFF200';
 });

 previewButton.addEventListener('mouseout', () => {
     previewButton.style.backgroundColor = '#FFF200';
     previewButton.style.color = '#000';
 });

 projectNames.forEach(project => {
     project.addEventListener('mouseover', () => {
         const imagePath = project.getAttribute('data-image');
         imagePreview.style.backgroundImage = `url(${imagePath})`;
         imagePreview.style.display = 'block';

         // Imposta il nome del progetto nel pulsante
         const projectName = project.textContent;
         previewButton.textContent = `View ${projectName}`;

         // Imposta l'azione del bottone (modificabile per aprire link)
         previewButton.onclick = () => {
             alert(`You clicked on ${projectName}`);
         };
     });

     project.addEventListener('mouseout', () => {
         imagePreview.style.display = 'none';
     });
 });


