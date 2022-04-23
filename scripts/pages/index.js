async function getPhotographers() {
  let dataPath = './data/photographers.json';
  await fetch(dataPath)
    // .then((res) => console.log(res))
    .then((res) => res.json())
    .then((res) => {
      console.log(res.photographers);
      photographers = res.photographers;
    })
    .catch((error) => console.log(error.message));
  return {
    photographers: [...photographers],
  };
}

// getPhotographers();

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
