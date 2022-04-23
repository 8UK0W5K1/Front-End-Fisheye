async function getPhotographers() {
  await fetch('./data/photographers.json')
    // .then((res) => console.log(res))
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.photographers);
      photographers = res.photographers;
    })
    .catch((error) => console.log(error.message));
  return {
    photographers: [...photographers],
  };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
