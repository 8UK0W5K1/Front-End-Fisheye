import Lightbox from './lightbox.js';

export default function mediasFactory(data) {
  // console.log(data);
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let srcMedia = `assets/images/photographers/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else if (video) {
    srcMedia += video;
  } else {
    console.log('ay oun problema !!!');
  }

  function setMediaDOM() {
    const figure = document.createElement('figure');

    const figcaption = document.createElement('figcaption');

    const mediaTitle = document.createElement('span');
    mediaTitle.classList.add('media_title');
    mediaTitle.textContent = title;

    if (image) {
      const photo = document.createElement('img');
      photo.classList.add('media');
      photo.setAttribute('src', srcMedia);
      photo.setAttribute('data-mediaid', id);
      photo.setAttribute('aria-label', title);
      photo.setAttribute('alt', title + ', closeup view');
      photo.setAttribute('role', 'link');
      photo.setAttribute('tabIndex', 0);
      photo.setAttribute('data-url', `${photo.src}`);
      figure.appendChild(photo);
      // media.setAttribute('tabindex', 0);
    } else {
      const video = document.createElement('video');
      video.classList.add('media');
      video.setAttribute('type', 'video/mp4');
      video.setAttribute('src', srcMedia);
      video.setAttribute('data-mediaid', id);
      video.setAttribute('tabIndex', 0);
      video.setAttribute('alt', title + ', closeup view');
      video.setAttribute('role', 'link');
      video.setAttribute('data-url', `${video.src}`);
      figure.appendChild(video);
    }
    figure.appendChild(figcaption);
    figcaption.appendChild(mediaTitle);

    const likesCount = document.createElement('span');
    likesCount.classList.add('media_likes');
    likesCount.textContent = likes;
    figcaption.appendChild(likesCount);

    const likesIcon = document.createElement('i');
    likesIcon.innerHTML = `<i class="far fa-regular fa-heart media_likes_icon " aria-hidden="true"></i>`;

    figcaption.appendChild(likesIcon);

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
    setMediaDOM,
  };
}
