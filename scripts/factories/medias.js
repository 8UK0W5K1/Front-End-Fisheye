function mediasFactory(data) {
  const { id, photographerId, title, image, likes, date, price } = data;

  let srcMedia = `assets/images/photographers/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    // srcMedia += video;
  }

  function getMediasDOM() {
    const figure = document.createElement('figure');
    figure.setAttribute('aria-label', 'carte du média ' + title);

    const figcaption = document.createElement('figcaption');

    const mediaTitle = document.createElement('span');
    mediaTitle.classList.add('media_title');
    mediaTitle.textContent = title;

    /** MEDIAS => vidéo ou image */
    const media = document.createElement('img');
    media.classList.add('media');
    media.setAttribute('src', srcMedia);
    media.setAttribute('data-mediaid', id);
    media.setAttribute('alt', title + ', closeup view');
    media.setAttribute('role', 'link');
    media.setAttribute('tabindex', 0);
    figure.appendChild(media);

    figure.appendChild(figcaption);
    figcaption.appendChild(mediaTitle);
    return figure;
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
