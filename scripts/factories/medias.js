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
      const mediaGallery = document.createElement('img');
      mediaGallery.setAttribute('src', srcMedia);
      mediaGallery.setAttribute('alt', title);
      mediaGallery.classList.add('medias');
      console.log(srcMedia);
      console.log(title);

      section.appendChild(mediaGallery);
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
