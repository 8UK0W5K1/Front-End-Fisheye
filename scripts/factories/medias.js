function mediasFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  let srcMedia = `assets/images/photographers/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    // srcMedia += video;
  }

  function getMediasDOM() {
    const section = document.createElement('section');
    document.body.appendChild(section);

    if (image) {
      const imgGallery = document.createElement('img');
      imgGallery.setAttribute('src', srcMedia);
      imgGallery.setAttribute('alt', title);
      console.log(srcMedia);
      console.log(title);

      section.appendChild(imgGallery);
    }

    return section;
  }

  return {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    getMediasDOM,
  };
}
