function photographerFactory(data) {
  const { name, id, city, country, tagline, price, portrait } = data;

  //   const picture = `./assets/photographers/account.png`;
  const picture = `./assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    article.id = 'photographer-' + id;

    const photographerUrl = document.createElement('a');

    const img = document.createElement('img');
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    const photographerName = document.createElement('h2');
    const photographerLocalisation = document.createElement('p');
    const photographerTagline = document.createElement('p');
    const photographerPrice = document.createElement('p');
    photographerName.textContent = name;
    photographerLocalisation.textContent = city + ', ' + country;
    photographerLocalisation.id = 'localisation';
    photographerTagline.textContent = tagline;
    photographerTagline.id = 'tagline';
    photographerPrice.textContent = `${price}€/jour`;
    photographerPrice.id = 'price';
    photographerUrl.href = 'photographer.html?id=' + id;

    article.appendChild(img);
    article.appendChild(photographerName);

    article.appendChild(photographerUrl);
    photographerUrl.appendChild(img);
    photographerUrl.appendChild(photographerName);

    article.appendChild(photographerLocalisation);
    article.appendChild(photographerTagline);
    article.appendChild(photographerPrice);
    return article;
  }

  function getProfileDOM() {
    const header = document.querySelector('.photograph-header');
    const flexCol = document.createElement('div');
    flexCol.id = 'flexCol';
    header.prepend(flexCol);

    const photographer_name = document.createElement('h2');
    flexCol.appendChild(photographer_name);
    photographer_name.id = 'photographer_name';
    photographer_name.textContent = name;

    const photographer_location = document.createElement('p');
    photographer_location.id = 'photographer_location';
    photographer_location.textContent = city + ', ' + country;
    flexCol.appendChild(photographer_location);

    const photographer_tagline = document.createElement('p');
    photographer_tagline.id = 'photographer_tagline';
    photographer_tagline.textContent = tagline;
    flexCol.appendChild(photographer_tagline);

    const img = document.createElement('img');
    img.id = 'photographer_image';
    img.setAttribute('src', picture);
    img.setAttribute('alt', name);
    img.setAttribute('width', '150px');
    header.appendChild(img);
  }

  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    portrait,
    picture,
    getUserCardDOM,
    getProfileDOM,
  };
}
