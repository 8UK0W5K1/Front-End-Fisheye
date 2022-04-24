//va chercher l'ID dans l'url
function getPhotographerId() {
  return new URL(location.href).searchParams.get('id');
}
const photographerId = getPhotographerId();

async function initProfile() {
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias();

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
  medias.forEach((media) => {
    if (photographerId == media.photographerId) {
      const mediasData = mediasFactory(media);
      const userGallery = mediasData.getMediasDOM();
      photographerGallery.appendChild(userGallery);
    } else {
      photographerGallery.innerText = 'ça marche pas mon truc';
      console.log(media.image);
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
