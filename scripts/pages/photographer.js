//va chercher l'ID dans l'url
function getPhotographerId() {
  return new URL(location.href).searchParams.get('id');
}
const photographerId = getPhotographerId();

async function initProfile() {
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias();

  console.log();

  displayProfile(photographers);
  displayMedias(medias);
}

async function displayProfile(photographers) {
  // const photographerMain = document.getElementById('main_photographer');
  // const photographerMain = document.querySelector('.photograph-header');
  photographers.forEach((photographer) => {
    if (photographer.id == photographerId) {
      const photographersData = photographerFactory(photographer);
      const userProfileDOM = photographersData.getProfileDOM();
      // photographerMain.appendChild(userProfileDOM);
      // console.log(photographerMain);
    }
  });
}
async function displayMedias(medias) {
  const photographerGallery = document.getElementById('photographer_gallery');
  let mediaArray = [];
  medias.forEach((media) => {
    console.log(media);
    if (photographerId == media.photographerId) {
      mediaArray.push(media);
      console.log('€€€€€€€€€€€€€€€€€€e');
      console.log(mediaArray);

      console.log('€€€€€€€€€€€€€€€€€€€€€');
      console.log(mediaArray.indexOf(mediaArray));

      // TODO reprendre ici demain !!!
      // mediaArray va me servir pour les sort by
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
