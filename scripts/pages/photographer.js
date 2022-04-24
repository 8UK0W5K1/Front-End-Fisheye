//va chercher l'ID dans l'url
function getPhotographerId() {
  return new URL(location.href).searchParams.get('id');
}
const photographerId = getPhotographerId();

async function initProfile() {
  const { photographers } = await getPhotographers();
  // const { medias } = await getMedias();

  // displayMedia(medias);
  displayProfile(photographers);
}

async function displayProfile(photographers) {
  const photographerMain = document.getElementById('main_photographer');
  photographers.forEach((photographer) => {
    if (photographer.id == photographerId) {
      const photographersData = photographerFactory(photographer);
      const userProfileDOM = photographersData.getProfileDOM();
      photographerMain.appendChild(userProfileDOM);
    } else {
      console.log("l'id du photographe ne correspond pas à celle de l'url");
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

sendData();
