function mediasFactory(data) {
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let srcMedia = `assets/images/photographers/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    srcMedia += video;
  }

  function getMediasDOM() {
    const figure = document.createElement('figure');
    figure.setAttribute('aria-label', 'carte du média ' + title);

    const figcaption = document.createElement('figcaption');

    const mediaTitle = document.createElement('span');
    mediaTitle.classList.add('media_title');
    mediaTitle.textContent = title;

    if (image) {
      const media = document.createElement('img');
      media.classList.add('media');
      media.setAttribute('src', srcMedia);
      media.setAttribute('data-mediaid', id);
      media.setAttribute('alt', title + ', closeup view');
      media.setAttribute('role', 'link');
      media.setAttribute('tabindex', 0);
      figure.appendChild(media);
    } else {
      const video = document.createElement('video');
      video.classList.add('media');
      video.setAttribute('type', 'video/mp4');
      video.setAttribute('src', srcMedia);
      video.setAttribute('data-mediaid', id);
      video.setAttribute('alt', title + ', closeup view');
      video.setAttribute('role', 'link');
      video.setAttribute('tabindex', 0);
      figure.appendChild(video);
    }
    figure.appendChild(figcaption);
    figcaption.appendChild(mediaTitle);

    return figure;
  }

  return {
    id,
    photographerId,
    title,
    image,
    video,
    likes,
    date,
    price,
    getMediasDOM,
  };
}
