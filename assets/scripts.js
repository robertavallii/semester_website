document.addEventListener('DOMContentLoaded', () => {
  // var animazione immagini
  let currentImageIndex = 0;
  const imagePaths = [];
  const totalImages = 23; // Numero totale di immagini
  const imageFolder = './assets/immagini/animazione_jpg/';

  // Carica i percorsi delle immagini
  for (let i = 1; i <= totalImages; i++) {
      imagePaths.push(`${imageFolder}image${i}.jpg`);
  }

  // crea immagini
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
          if (index === 0) img.classList.add('active'); //per mostrare prima immagine
          container.appendChild(img);
      });

      // altezza image-cont e animazione uguale
      const animazione = document.getElementById('animazione');
      if (animazione) {
          container.style.height = `${animazione.offsetHeight}px`;
      } else {
          console.warn('#animazione non trovato. Assicurati che esista.');
      }
  }

  // ccarosello
  function changeImage() {
      const images = document.querySelectorAll('.image-slide');
      if (images.length === 0) return; 
      images[currentImageIndex].classList.remove('active'); 
      currentImageIndex = (currentImageIndex + 1) % images.length; 
      images[currentImageIndex].classList.add('active');
  }

  // imm e animazione
  createImages();
  setInterval(changeImage, 1000); // Cambia immagine ogni 2 secondi

  // menu mobile
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
                    if (menuIconImg) {
                        menuIconImg.src = mobileNav?.classList.contains('active') ? closeIcon : hamburgerIcon;
                    }
                });
            }
        
            // Chiudi il menu cliccando sull'overlay
            if (menuOverlay) {
                menuOverlay.addEventListener('click', () => {
                    mobileNav?.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    if (menuIconImg) {
                        menuIconImg.src = hamburgerIcon;
                    }
                });
            }
        
            // Chiudi il menu cliccando su un link
            if (mobileNav) {
                mobileNav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        mobileNav.classList.remove('active');
                        menuOverlay?.classList.remove('active');
                        if (menuIconImg) {
                            menuIconImg.src = hamburgerIcon;
                        }
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


// mouseover project
            document.addEventListener('DOMContentLoaded', () => {
                const projectNames = document.querySelectorAll('.project-name');
                const imagePreview = document.createElement('div');
                imagePreview.id = 'image-preview';
                document.body.appendChild(imagePreview);
            
                projectNames.forEach((project) => {
                    project.addEventListener('mouseover', () => {
                        const imageUrl = project.getAttribute('data-image');
                        if (imageUrl) {
                            imagePreview.style.backgroundImage = `url(${imageUrl})`;
                            imagePreview.style.display = 'block';
                        }
                    });
                
                    project.addEventListener('mousemove', (e) => {
                        const imageWidth = 760;; 
                        const imageHeight = 530; 
                    
                        imagePreview.style.left = `${e.pageX - imageWidth / 2}px`; 
                        imagePreview.style.top = `${e.pageY - imageHeight / 2}px`; 
                    });
                    project.addEventListener('mouseout', () => {
                        imagePreview.style.display = 'none';
                    });
                });
            });



            