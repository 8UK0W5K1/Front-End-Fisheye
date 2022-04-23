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
    photographerUrl.href = './photographers/photographer' + id + '.html';

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
  };
}
