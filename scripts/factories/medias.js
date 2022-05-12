import lightboxFactory from './lightbox.js';
lightboxFactory.init();

export default function mediasFactory(data) {
  // console.log(data);
  const { id, photographerId, title, image, video, likes, date, price } = data;

  let srcMedia = `assets/images/photographers/${photographerId}/`;
  if (image) {
    srcMedia += image;
  } else {
    srcMedia += video;
  }

  function setMediaDOM() {
    const figure = document.createElement('figure');
    figure.setAttribute('aria-label', 'carte du média ' + title);

    const figcaption = document.createElement('figcaption');

    const mediaTitle = document.createElement('span');
    mediaTitle.classList.add('media_title');
    mediaTitle.textContent = title;

    if (image) {
      const photo = document.createElement('img');
      photo.classList.add('media');
      photo.setAttribute('src', srcMedia);
      photo.setAttribute('data-mediaid', id);
      photo.setAttribute('alt', title + ', closeup view');
      photo.setAttribute('role', 'link');
      photo.setAttribute('data-url', `${photo.src}`);
      figure.appendChild(photo);
      // media.setAttribute('tabindex', 0);
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

  function likeFunction() {
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
        // console.log(arrayLikes);
        totalLikes = arrayLikes.reduce((a, b) => a + b);
        likesTotal.innerHTML = `${totalLikes} <span class="heart">&hearts;</span>`;
        // console.log(likesTotal.textContent);
      });
    };

    getLikesNumber();

    const likesIcons = document.querySelectorAll('.fa-regular');
    // const heartFilledIcons = document.querySelectorAll('.fa-solid');

    for (let i = 0; i < likesIcons.length; i++) {
      let sum = 0;
      let clicked = false;
      // likesCount[i].textContent;
      likesIcons[i].addEventListener('click', () => {
        const target = +likesCounter[i].textContent;
        sum += +likesCounter[i].textContent;
        likesCounter[i].innerHTML = likesCounter[i].textContent;

        function evtLike() {
          if (!likesIcons[i].classList.contains('fa-solid')) {
            likesIcons[i].classList.add('fas', 'fa-solid');

            //total de likes sous chaque photo actualisé à chaque clic
            likesCounter[i].innerText = target + 1;
            // parseInt(likesTotal);
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
  }
  likeFunction();

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
