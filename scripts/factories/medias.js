function mediasFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  const srcImage = `./assets/images/photographers/${photographerId}/`;

  function getMediasDOM() {
    const section = document.createElement('section');
    document.body.appendChild(section);

    const img = document.createElement('img');
    img.setAttribute('src', image);
    img.setAttribute('alt', title);

    section.appendChild(img);

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
