import mediasFactory from './medias.js';

export default class lightboxFactory {
  static init() {
    const links = Array.from(document.querySelectorAll('.media'));
    console.log(links);
    const body = document.querySelector('body');
    for (let i = 0; i < links.length; i++) {
      let newIndex = i;
      links[i].onclick = () => {
        displayLightbox();
        console.log('whyyyyy');
      };
    }
  }

  constructor(displayed, arrayMedias, mediaId) {
    console.log('new instance of lightboxFactory created');
    this.displayed = displayed;
    this.arrayMedias = arrayMedias;
    this.mediaId = mediaId;
  }

  get message() {
    return 'okok';
  }

  displayLightbox() {
    let newLightbox = new lightboxFactory();
    newLightbox.displayLightbox();

    this.displayed = true;
    const gallery = document.querySelector('#photographer_gallery');
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    gallery.appendChild(lightbox);
    //va chercher l'ID dans l'url
    function getPhotographerId() {
      return new URL(location.href).searchParams.get('id');
    }

    const galleryMedia = document.createElement('img');
    const galleryVideo = document.createElement('video');

    const nextButton = document.createElement('button');
    const nextButtonText = document.createTextNode('>');
    nextButton.classList.add('next');
    nextButton.appendChild(nextButtonText);

    lightbox.appendChild(nextButton);

    const previousButton = document.createElement('button');
    const previousButtonText = document.createTextNode('<');
    previousButton.classList.add('previous');
    previousButton.appendChild(previousButtonText);

    lightbox.appendChild(previousButton);

    // galleryMedia.setAttribute('alt', title);
    // console.log('clicked on one media');

    lightbox.style.display = 'block';
  }

  closeLightbox() {
    this.displayed = false;
    const gallery = document.querySelector('#photographer_gallery');
    const lightboxDiv = document.querySelector('.lightbox');
    // gallery.removeChild(lightboxDiv);

    const closeImg = document.createElement('img');
    closeImg.setAttribute('src', 'assets/icons/close.svg');
    closeImg.setAttribute('alt', 'close gallery');
    closeImg.setAttribute('aria-label', 'Close gallery');
    closeImg.classList.add('close_gallery');
    lightboxDiv.appendChild(closeImg);

    closeImg.addEventListener('click', closeLightbox);
    function closeLightbox() {
      const gallery = document.querySelector('#photographer_gallery');
      const lightboxClose = document.querySelectorAll('.lightbox');
      // gallery.removeChild(lightbox);
      lightboxClose.forEach(function (lightbox) {
        // lightbox.style.display = 'none';
        gallery.removeChild(lightbox);
      });
    }
  }

  setCurrentMedia() {}

  setUrlList() {}

  incrementCurrentMediaId() {
    this.mediaId++;
  }
  decrementCurrentMediaId() {
    this.mediaId--;
  }

  static emptyLightbox() {
    return 'empty lightbox init';
  } // méthode executable sans instancier un objet de classe
}

lightboxFactory.init();

// let lightbox = new lightboxFactory(true, [], 4);
// lightbox.displayLightbox();

// lightbox.message;
// console.log(lightbox.message);

// console.log(lightbox);

// lightbox.closeLightbox();
// console.log(lightbox);

// console.log(lightboxFactory.emptyLightbox());

// console.log(lightbox instanceof lightboxFactory);
