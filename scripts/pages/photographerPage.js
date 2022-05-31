import Lightbox from '../factories/lightbox.js';
import likes from '../utils/likes.js';
import mediasFactory from './../factories/medias.js';

//va chercher l'ID dans l'url
function getPhotographerId() {
  return new URL(location.href).searchParams.get('id');
}
const photographerId = getPhotographerId();

async function initProfile() {
  const { photographers } = await getPhotographers();
  // console.log(photographers);

  displayProfile(photographers);
  const { medias } = await getMedias();
  displayMedias(medias);
  Lightbox.init();
  likes();
}

async function displayProfile(photographers) {
  photographers.forEach((photographer) => {
    if (photographer.id == photographerId) {
      const photographersData = photographerFactory(photographer);
      photographersData.getProfileDOM();
    }
  });
}
async function displayMedias(medias) {
  const photographerGallery = document.getElementById('photographer_gallery');

  let mediaArray = [...medias];

  const selected = document.querySelector('.selected');
  const selectBox = document.querySelector('.select-box');
  const optionsContainer = document.querySelector('.options-container');
  const optionsList = document.querySelectorAll('.option');

  selectBox.addEventListener('click', () => {
    optionsContainer.classList.toggle('active');
    if (optionsContainer.classList.contains('active')) {
      selectBox.setAttribute('aria-selected', true);
      selected.focus();
    } else {
      selectBox.setAttribute('aria-selected', false);
      selected.focus();
    }
  });

  selectBox.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      optionsContainer.classList.toggle('active');
      selectBox.setAttribute('aria-selected', true);
      optionsList.forEach((option) => (option.tabIndex = 0));

      selected.focus();
    } else if (e.keyCode == '39') {
      selectBox.setAttribute('aria-selected', true);
      optionsList.forEach((option) => {
        option.tabIndex = 0;
        option.focus();
      });
    }
  });

  mediaArray.forEach((media) => {
    // console.log(media);
    if (photographerId == media.photographerId) {
      const mediasData = mediasFactory(media);

      const userGallery = mediasData.setMediaDOM();

      photographerGallery.appendChild(userGallery);
    }
  });

  optionsList.forEach((elt) => {
    function selectOptionDisplay() {
      selected.innerHTML = elt.querySelector('label').innerHTML;
      photographerGallery.innerHTML = ''; //ON VIDE LA GALERIE
      optionsContainer.classList.remove('active');
      // TRI EN FONCTION DE L'ELEMENT CHOISI (Popularité, Date ou Titre)

      const sortChoice = selected.innerHTML;

      switch (sortChoice) {
        case 'Popularité':
          mediaArray.sort((a, b) => {
            return b.likes - a.likes;
          });

          break;

        case 'Date':
          mediaArray.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          });
          break;

        case 'Titre':
          mediaArray.sort((a, b) => {
            return a.title > b.title ? 1 : -1;
          });

          break;
      }

      mediaArray.forEach((media) => {
        // console.log(media);
        if (photographerId == media.photographerId) {
          // console.log(media.length);
          const mediasData = mediasFactory(media);
          const userGallery = mediasData.setMediaDOM();
          photographerGallery.appendChild(userGallery);
          Lightbox.init();
          likes();
        }
      });
    }

    elt.addEventListener('click', () => {
      selectOptionDisplay();
    });
    elt.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        selectOptionDisplay();
      }
    });
  });
}
initProfile();

async function sendData() {
  let contactForm = document.querySelector('#contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputFirstName = document.querySelector('#firstName').value;
    let inputLastName = document.querySelector('#lastName').value;
    let inputEmail = document.querySelector('#email').value;
    let inputMessage = document.querySelector('#textArea').value;
    console.log(
      'Prénom : ' + inputFirstName,
      ', Nom : ' + inputLastName,
      ', Email : ' + inputEmail,
      ', Votre message : ' + inputMessage
    );
    contactForm.reset();
    closeModal();
    history.back;
  });
}

document.getElementById('submitForm').addEventListener('click', sendData);
