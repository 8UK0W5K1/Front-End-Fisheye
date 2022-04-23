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
      console.log('ou est lerreur bordel !!!');
    }
  });
}

initProfile();
