export class Lightboximage {
  constructor(url, titlePos) {
    this.title = titlePos;
    this.url = url;
  }

  buildDom() {
    const lightboxContainer = document.querySelector('.lightbox_container');
    lightboxContainer.innerHTML = '';
    lightboxContainer.innerHTML = `
      <div>
        <img src="${this.url}" alt="${this.title}" tabindex="0" class="modalLightbox">
        <p tabindex="0" class="modalLightbox">${this.title}</p>
      </div>
      `;
  }
}
