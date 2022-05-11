//va chercher l'ID dans l'url
function getPhotographerId() {
  return new URL(location.href).searchParams.get('id');
}
const photographerId = getPhotographerId();

async function initProfile() {
  const { photographers } = await getPhotographers();
  console.log(photographers);

  displayProfile(photographers);
  const { medias } = await getMedias();
  displayMedias(medias);
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

  const choice = window.prompt('Quelle est la réponse ?', '2');

  switch (choice) {
    case '1':
      mediaArray.sort((a, b) => {
        return b.likes - a.likes;
      });

      break;

    case '2':
      mediaArray.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      break;

    case '3':
      mediaArray.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      });

      break;
  }

  mediaArray.forEach((media) => {
    // console.log(media);
    if (photographerId == media.photographerId) {
      // mediaArray.push(media);

      // mediaArray va me servir pour les sort by
      media = media;
      console.log(media);

      console.log(media);
      console.log(mediaArray);
      // console.log(media.length);
      const mediasData = mediasFactory(media);

      const userGallery = mediasData.getMediasDOM();

      photographerGallery.appendChild(userGallery);
    }
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
