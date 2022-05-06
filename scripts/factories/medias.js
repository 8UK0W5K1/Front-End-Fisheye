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
    console.log(links);
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const head = document.querySelector('link');

    // ouvrir une lightbox avec toutes les images (array), propriété display, index de l'image ou ID

    console.log(links.length);
    for (let i = 0; i < links.length; i++) {
      console.log(links);
      let newIndex = i;
      links[i].onclick = () => {
        let clickedMediaIndex = links.indexOf(links[i]);
        console.log(clickedMediaIndex);
        const mediaIndex = links[i].src;
        displayLightbox(((myId = links), (currentID = clickedMediaIndex)));
      };
    }

    function displayLightbox() {
      const dataLink = document.querySelectorAll('[data-url]');
      console.log(dataLink);
      console.log(dataLink.length);
      for (var i = 0; i <= dataLink.length; i++) {
        const item = dataLink[i];
        // console.log(item.src);
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
      const galleryVideo = document.createElement('video');

      console.log(links[`${currentID}`]);

      const currentMedia = links[`${currentID}`].src;

      if (currentMedia.endsWith('.jpg')) {
        console.log(currentMedia.endsWith('.jpg'));
        galleryMedia.setAttribute('src', `${myId[`${currentID}`].src}`);
      } else {
        console.log(currentMedia.endsWith('.jpg'));
        console.log(galleryVideo);
        galleryVideo.setAttribute('src', `${myId[`${currentID}`].src}`);
        galleryVideo.setAttribute('alt', 'shiiiiiit');
        galleryVideo.setAttribute('type', 'video/mp4');
        galleryVideo.setAttribute('autoplay', 'autoplay');
        // galleryVideo.setAttribute('loop', true);
      }

      const nextButton = document.createElement('button');
      nextButton.classList.add('next');
      const nextIcon = document.createElement('div');
      nextIcon.innerHTML = `<i
                      class='fas fa-solid fa-angle-right'
                      aria-hidden='true'
                    ></i>`;

      lightbox.appendChild(nextButton);
      nextButton.appendChild(nextIcon);

      const previousButton = document.createElement('button');
      previousButton.classList.add('previous');
      const previousIcon = document.createElement('div');
      previousIcon.innerHTML = `<i
                      class='fas fa-solid fa-angle-right'
                      aria-hidden='true'
                    ></i>`;

      lightbox.appendChild(previousButton);
      nextButton.appendChild(previousIcon);

      const nextMedia = document.querySelector('.next');
      nextMedia.addEventListener('click', () => {
        dynamicID = currentID;
        if (dynamicID <= links.length) {
          dynamicID = currentID += 1;
          galleryMedia.setAttribute('src', `${myId[dynamicID].src}`);
          console.log('clikkkkk');
          console.log(dynamicID);
          console.log(links.length);
        }
      });

      const previousMedia = document.querySelector('.previous');
      previousMedia.addEventListener('click', () => {
        dynamicID = currentID;
        if (dynamicID >= 0) {
          dynamicID = currentID -= 1;
          galleryMedia.setAttribute('src', `${myId[dynamicID].src}`);
          console.log('clikkkkk');
        }
      });

      galleryMedia.setAttribute('alt', title);
      console.log('clicked on one media');

      lightbox.style.display = 'block';
      lightbox.appendChild(closeImg);
      lightbox.appendChild(galleryMedia);
      lightbox.appendChild(galleryVideo);

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

  // liste d'url, index ou current url, filter? incrémenter index, boolean display   => propriétés de ma lightbox
  // création de modifications de boolean => display
  // incrémenter ou décrémenter l'index donc l'url de l'image

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
