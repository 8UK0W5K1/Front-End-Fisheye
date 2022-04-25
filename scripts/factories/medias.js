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

    const links = document.createElement('a');
    links.setAttribute('onclick', 'event.preventDefault()');
    figure.appendChild(links);

    if (image) {
      const media = document.createElement('img');
      media.classList.add('media');
      media.setAttribute('src', srcMedia);
      media.setAttribute('data-mediaid', id);
      media.setAttribute('alt', title + ', closeup view');
      media.setAttribute('role', 'link');
      // media.setAttribute('href', `${media.src}`);

      // console.log(media.src);
      media.setAttribute('tabindex', 0);

      links.appendChild(media);
      links.setAttribute('href', `${media.src}`);
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

      links.appendChild(video);
      links.setAttribute('href', `${video.src}`);
    }
    figure.appendChild(figcaption);
    figcaption.appendChild(mediaTitle);

    return figure;
  }

  function getMediasLinks() {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
    );
    console.log(links);

    function displayLightbox() {
      const gallery = document.querySelector('#photographer_gallery');
      const lightbox = document.createElement('div');
      lightbox.classList.add('lightbox');
      gallery.appendChild(lightbox);

      const closeImg = document.createElement('img');
      closeImg.setAttribute('src', 'assets/icons/close.svg');
      closeImg.setAttribute('aria-label', 'Close gallery');
      closeImg.setAttribute('alt', 'close gallery');
      closeImg.classList.add('close_gallery');

      lightbox.appendChild(closeImg);

      closeImg.addEventListener('click', closeLightbox);
      // const closeGallery = document.querySelector('#close_gallery');
      document.querySelector('.close_gallery').addEventListener('click', () => {
        document.querySelector('.lightbox').style.zIndex = '1';
      });
    }

    function closeLightbox() {
      const gallery = document.querySelector('#photographer_gallery');
      const lightbox = document.querySelector('.lightbox');
      console.log('ou ca bloque ???');
      gallery.removeChild(lightbox);
    }
    // const closeGallery = document.querySelector('.lightbox');
    // closeGallery.addEventListener('click', closeLightbox);

    // const closeGallery = document.querySelector('#close_gallery');
    // closeGallery.addEventListener('click', closeLightbox);

    links.forEach((link) => {
      console.log(link);
      link.addEventListener('click', displayLightbox);
    });
  }

  getMediasLinks();

  //ceci pourrait m'aider | THX stackoverflow
  // var abc = 'somelink';
  // document.getElementById('test').innerHTML = '<a href="' + abc + '">Link</a>';

  //OR
  // <a href="./posts/<%= post.title %>">Read More</a>

  // A CE MOMENT, JE PENSE QUE JE PEUX GARDER CE QUE J'AI, IL SUFFIRAIT DE RECUPERER ENSUITE DANS L'URL LE TITRE DE L'IMAGE
  // UN PEU COMME ON L'A FAIT POUR AVOIR L'ID DU PHOTOGRAPHE, ET RESTITUER LA BONNE IMAGE DANS LA LIGHTBOX.... A SUIVRE

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
