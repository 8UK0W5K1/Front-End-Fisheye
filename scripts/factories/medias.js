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

    const likesCount = document.createElement('span');
    likesCount.classList.add('media_likes');
    likesCount.textContent = likes;
    figcaption.appendChild(likesCount);

    const likesIcon = document.createElement('i');
    likesIcon.classList.add(
      'far',
      'fa-regular',
      'fa-heart',
      'media_likes_icon'
    );
    figcaption.appendChild(likesIcon);

    return figure;
  }

  function getMediasLinks() {
    // const links = Array.from(document.querySelectorAll('.media'));
    const links = [...document.querySelectorAll('[data-url]')];
    // console.log(links);

    // console.log(links.length);
    for (let i = 0; i < links.length; i++) {
      // console.log(links);
      links[i].onclick = () => {
        let clickedMediaIndex = links.indexOf(links[i]);
        // console.log(clickedMediaIndex);
        displayLightbox(((myId = links), (currentID = clickedMediaIndex)));
      };
    }

    function displayLightbox() {
      const dataLink = document.querySelectorAll('[data-url]');
      // console.log(dataLink);
      // console.log(dataLink.length);
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

      // console.log(links[`${currentID}`]);

      const currentMedia = links[`${currentID}`].src;

      if (currentMedia.endsWith('.jpg')) {
        lightbox.appendChild(galleryMedia);
        // console.log(links[`${currentID}`].src);
        galleryMedia.setAttribute('src', `${myId[`${currentID}`].src}`);
      } else {
        lightbox.appendChild(galleryVideo);
        galleryVideo.setAttribute('src', `${myId[`${currentID}`].src}`);
        galleryVideo.setAttribute('alt', 'shiiiiiit');
        galleryVideo.setAttribute('type', 'video/mp4');
        galleryVideo.setAttribute('autoplay', 'autoplay');
        // galleryVideo.setAttribute('loop', true);
      }

      const nextButton = document.createElement('button');
      const nextButtonText = document.createTextNode('>');
      nextButton.classList.add('next');
      nextButton.appendChild(nextButtonText);

      lightbox.appendChild(nextButton);

      const previousButton = document.createElement('button');
      const previousButtonText = document.createTextNode('<');
      previousButton.classList.add('previous');
      previousButton.appendChild(previousButtonText);

      lightbox.appendChild(previousButton);

      const nextMedia = document.querySelector('.next');
      nextMedia.addEventListener('click', () => {
        // console.log(galleryMedia);
        // console.log(galleryMedia.src.endsWith('.jpg'));
        dynamicID = currentID;
        dynamicID = currentID += 1;
        // console.log(galleryMedia.src);
        if (galleryMedia.src.endsWith('.jpg')) {
          // lightbox.appendChild(gallerymedia);
          galleryMedia.setAttribute('src', `${myId[dynamicID].src}`);
        } else {
          lightbox.append(galleryVideo);
          galleryVideo.setAttribute('src', `${myId[dynamicID].src}`);
          lightbox.removeChild(galleryMedia);
        }
      });

      const previousMedia = document.querySelector('.previous');
      previousMedia.addEventListener('click', () => {
        dynamicID = currentID;
        dynamicID = currentID -= 1;
        if (galleryMedia.src.endsWith('.jpg')) {
          galleryMedia.setAttribute('src', `${myId[dynamicID].src}`);
        } else {
          lightbox.removeChild(galleryMedia);
          lightbox.appendChild(galleryVideo);
          galleryVideo.setAttribute('src', `${myId[dynamicID].src}`);
        }
      });

      galleryMedia.setAttribute('alt', title);
      // console.log('clicked on one media');

      lightbox.style.display = 'block';
      lightbox.appendChild(closeImg);

      closeImg.addEventListener('click', closeLightbox);
    }

    function closeLightbox() {
      const gallery = document.querySelector('#photographer_gallery');
      const lightboxClose = document.querySelectorAll('.lightbox');
      // gallery.removeChild(lightbox);
      lightboxClose.forEach(function (lightbox) {
        // lightbox.style.display = 'none';
        gallery.removeChild(lightbox);
      });
    }
  }

  getMediasLinks();

  let likesCounter = document.querySelectorAll('.media_likes');
  let likesTotal = document.querySelector('.likes_total');

  let arrayLikes = [];
  let totalLikes = [];
  const getLikesNumber = (totalLikes) => {
    likesCounter.forEach((num) => {
      let number = 0;
      number = num.textContent;
      // console.log(typeof number);
      number = parseInt(number);
      // console.log(typeof number);
      arrayLikes.push(number);
      console.log(arrayLikes);
      totalLikes = arrayLikes.reduce((a, b) => a + b);
      likesTotal.innerHTML = `${totalLikes} <span class="heart">&hearts;</span>`;
      console.log(likesTotal.textContent);
    });
  };

  getLikesNumber();

  const likesIcons = document.querySelectorAll('.media_likes_icon');

  let sum = 0;
  for (let i = 0; i < likesIcons.length; i++) {
    // likesCount[i].textContent;
    likesIcons[i].addEventListener('click', () => {
      const target = +likesCounter[i].textContent;
      sum += +likesCounter[i].textContent;
      likesCounter[i].innerHTML = likesCounter[i].textContent;
      let clicked = false;

      function evtLike() {
        if (!clicked) {
          clicked = true;
          likesIcons[
            i
          ].innerHTML = `<i class="fas fa-solid fa-heart media_likes_icon"></i>`;

          //total de likes sous chaque photo actualisé à chaque clic
          likesCounter[i].innerText = target + 1;
          parseInt(likesTotal);
          console.log(parseInt(likesTotal));

          //   likesTotal.innerHTML =
          //     1 + sum++ + `<i class="fas fa-solid fa-heart "></i>`;
          // } else {
          //   //DISLIKE
          //   clicked = false;
          //   likesIcons[i].innerHTML =
          //     +1 + sum-- + 1`<i class="far fa-regular fa-heart"></i>`;

          //   //total de likes sous chaque photo actualisé à chaque dislike
          //   likesCounter[i].innerText = 1 + target - 1;
          //   //total de likes général actualisé sur la page
          //   likesTotal.innerHTML =
          //     -1 + sum-- + `<i class="fas fa-solid fa-heart"></i>`;
        }
      }

      //EVENEMENT AU CLIC SUR LE BOUTON LIKE
      likesIcons[i].addEventListener('click', () => {
        evtLike();
        arrayLikes.length = 0;
        getLikesNumber();
      });
    });
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
