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



//3d
        document.addEventListener('DOMContentLoaded', () => {
          // Funzione per inizializzare il rendering 3D
          function init3D(containerId, objPath) {
            const container = document.getElementById(containerId);
            const width = container.offsetWidth;
            const height = container.offsetHeight;
        
            // Configura scena, camera e renderer
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            camera.position.z = 2;
        
            const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(width, height);
            renderer.setClearColor(0x000000, 0); // sfondo traspraente
            container.appendChild(renderer.domElement);
        
            // Aggiungi luci
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);
        
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);
        
            // Carica il modello .obj
            const loader = new THREE.OBJLoader();
            loader.load(
              objPath,
              (object) => {
                object.scale.set(1.5, 1.5, 1.5); // scala del modello
                object.position.set(0, 1, 0); // posizionamento del modello
                scene.add(object);
                animate(); // Avvia l'animazione
              },
              (xhr) => {
                console.log(`Caricamento: ${(xhr.loaded / xhr.total) * 100}%`);
              },
              (error) => {
                console.error('Errore durante il caricamento:', error);
              }
            );



    // Funzione di animazione
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
  }

  // Inizializza il rendering 3D nella card dello studente
  init3D('student-3d-model', './assets/ritratti_3d/edoardo.obj'); 
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
