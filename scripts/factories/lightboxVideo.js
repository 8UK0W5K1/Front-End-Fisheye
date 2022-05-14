export class Lightboxvideo {
  constructor(url, title, titlePos) {
    this.title = title;
    this.url = url;
  }

  buildDom() {
    const lightboxContainer = document.querySelector('.lightbox_container');
    console.log(lightboxContainer);
    lightboxContainer.innerHTML = '';
    lightboxContainer.innerHTML = `
      <div>
        <video src="${this.url}" alt="${this.title}" tabindex="0" class="modalLightbox" controls></video>
        <p tabindex="0" class="modalLightbox">${this.title} </p>
      </div>
      `;
  }
}
