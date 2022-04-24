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

    const link = document.createElement('a');
    figure.appendChild(link);

    if (image) {
      const media = document.createElement('img');
      media.classList.add('media');
      media.setAttribute('src', srcMedia);
      media.setAttribute('data-mediaid', id);
      media.setAttribute('alt', title + ', closeup view');
      media.setAttribute('role', 'link');
      // media.setAttribute('href', `${media.src}`);
      console.log(media.src);
      media.setAttribute('tabindex', 0);

      link.appendChild(media);
      link.setAttribute('href', `${media.src}`);
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

      link.appendChild(video);
      link.setAttribute('href', `${video.src}`);
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
  }

  getMediasLinks();

  //ceci pourrait m'aider | THX stackoverflow
  // var abc = 'somelink';
  // document.getElementById('test').innerHTML = '<a href="' + abc + '">Link</a>';

  //OR
  // <a href="./posts/<%= post.title %>">Read More</a>

  // A CE MOMENT, JE PENSE QUE JE PEUX GARDER CE QUE J'AI, IL SUFFIRAIT DE RECUPERER ENSUITE DANS L'URL LE TITRE DE L'IMAGE
  // UN PEU COMME ON L'A FAIT POUR AVOIR L'ID DU PHOTOGRAPHE, ET RESTITUER LA BONNE IMAGE DANS LA LIGHTBOX.... A SUIVRE

  const lighbox = document.createElement('div');
  lighbox.classList.add('lightbox');

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
