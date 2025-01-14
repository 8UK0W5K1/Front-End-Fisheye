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

async function getMedias() {
  await fetch('./data/photographers.json')
    // .then((res) => console.log(res))
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.media);
      medias = res.media;
    })
    .catch((error) => console.log(error.message));
  return {
    medias: [...medias],
  };
}
