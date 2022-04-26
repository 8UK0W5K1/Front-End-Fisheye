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
      media.setAttribute('data-url', `${media.src}`);

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
      video.setAttribute('data-url', `${video.src}`);
      figure.appendChild(video);

      links.appendChild(video);
      links.setAttribute('href', `${video.src}`);
    }
    figure.appendChild(figcaption);
    figcaption.appendChild(mediaTitle);

    return figure;
  }

  function getMediasLinks() {
    const links = Array.from(document.querySelectorAll('.media'));
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const head = document.querySelector('link');

    console.log(links);
    // tableau.indexOf(e.target);*
    // A GARDER !! FIX MON PROBLEME DE CREATION DE N x media ARTICLES
    for (let i = 0; i < links.length; i++) {
      let newIndex = i;
      console.log(links[newIndex].src);
      console.log(links[newIndex].src.nextSibling);
      console.log('€€€€€€€€€€€€€€€€€€€€€');
      console.log(links.indexOf(links[i].target));

      links[i].onclick = () => {
        const mediaIndex = links[i].src;
        displayLightbox((myId = mediaIndex));
        console.log(links[i].src);
      };
    }

    function displayLightbox() {
      const dataLink = document.querySelectorAll('[data-url]');
      // console.log(dataLink);
      for (var i = 0; i < dataLink.length; i++) {
        const item = dataLink[i];
        console.log(item.src);
      }

      const gallery = document.querySelector('#photographer_gallery');
      const lightbox = document.createElement('div');
      lightbox.classList.add('lightbox');
      gallery.appendChild(lightbox);

      const closeImg = document.createElement('img');
      closeImg.setAttribute('src', 'assets/icons/close.svg');
      closeImg.setAttribute('alt', 'close gallery');
      closeImg.setAttribute('aria-label', 'Close gallery');
      closeImg.classList.add('close_gallery');

      //va chercher l'ID dans l'url
      function getPhotographerId() {
        return new URL(location.href).searchParams.get('id');
      }

      const galleryMedia = document.createElement('img');
      galleryMedia.setAttribute(
        'src',
        `${myId}`
        // `http://127.0.0.1:5500/Front-End-Fisheye/assets/images/photographers/925/Fashion_Wings.jpg`
      );
      galleryMedia.setAttribute('alt', title);
      console.log('clicked on one media');
      // console.log(media.src);

      lightbox.style.display = 'block';
      lightbox.appendChild(closeImg);
      lightbox.appendChild(galleryMedia);

      closeImg.addEventListener('click', closeLightbox);
    }

    function closeLightbox() {
      const gallery = document.querySelector('#photographer_gallery');
      const lightboxClose = document.querySelectorAll('.lightbox');
      // gallery.removeChild(lightbox);
      lightboxClose.forEach(function (lightbox) {
        lightbox.style.display = 'none';
      });
    }
  }

  getMediasLinks();

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
