import { Lightboximage } from './lightboxImage.js';
import { Lightboxvideo } from './lightboxVideo.js';

export default class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll('.media'));
    console.log(links);
    const tabLinks = links.map((media) => media.getAttribute('src'));
    const titles = Array.from(document.querySelectorAll('.media_title'));
    console.log(titles);
    const title = titles.map((elt) => elt.innerText);
    console.log(title);

    console.log(links);
    for (let i = 0; i < links.length; i++) {
      const link = links[i]; //this.link
      console.log(link);
      let titlePos = links[i].getAttribute('alt').split(',')[0];
      console.log(titlePos); //this.titlePos
      const linkUrl = link.getAttribute('src'); //this.linkUrl
      console.log(linkUrl);
      const currentMediaPosition = tabLinks.findIndex(
        //this.currentPosition
        (link) => link == linkUrl
      );
      const currentMediaTitle = title.findIndex(
        //this.currentMediaTitle
        (link) => link == titlePos
      );

      link.onclick = (e) => {
        const light = new Lightbox(
          linkUrl,
          tabLinks,
          link,
          title,
          titlePos,
          currentMediaPosition,
          currentMediaTitle
        );
        light.preview();
        const next = document.querySelector('.next');
        next.focus();
      };
    }
  }

  //AFFICHAGE DE LA LIGHTBOX AVEC IMAGES ET/OU VIDEO
  preview() {
    if (this.links[this.currentMediaPosition].nodeName === 'IMG') {
      // console.log(this.link.nodeName);
      const lightboxImage = new Lightboximage(this.linkUrl, this.titlePos);
      lightboxImage.buildDom();
    } else {
      const lightboxVideo = new Lightboxvideo(this.linkUrl, this.titlePos);

      lightboxVideo.buildDom();
    }
  }

  focusInModal(e) {
    e.preventDefault();
    const wrapper = document.querySelector('.wrapper');
    const focusablesLightbox = Array.from(
      document.querySelectorAll('.modalLightbox')
    );
    console.log(focusablesLightbox);
    let index = focusablesLightbox.findIndex(
      (elt) => elt === wrapper.querySelector(':focus')
    );
    console.log(index);

    if (e.shiftKey === true) {
      index--;
    } else {
      index++;
    }

    if (index >= focusablesLightbox.length) {
      index = 0;
    }
    if (index < 0) {
      index = focusablesLightbox.length - 1;
    }

    focusablesLightbox[index].focus();
  }

  clicEvent() {
    this.closeIcon.addEventListener('click', (e) => {
      e.preventDefault();
      this.close();
    });
    this.rightArrow.addEventListener('click', (e) => {
      e.preventDefault();
      this.next();
    });
    this.leftArrow.addEventListener('click', (e) => {
      e.preventDefault();
      this.previous();
    });
  }

  close() {
    setTimeout(() => {
      this.body.firstChild.remove();
    }, 200);
    this.links[this.currentMediaPosition].focus();
  }

  next() {
    this.lightBoxRemove;

    if (this.currentMediaPosition < this.links.length - 1) {
      this.currentMediaPosition++;
      this.currentMediaTitle++;
      console.log(this.currentMediaTitle);
      this.linkUrl = this.tabLinks[this.currentMediaPosition];
      this.titlePos = this.title[this.currentMediaTitle];

      this.preview();
    } else {
      this.currentMediaPosition = 0;
      this.currentMediaTitle = 0;
      this.linkUrl = this.tabLinks[this.currentMediaPosition];
      this.titlePos = this.title[this.currentMediaTitle];

      this.preview();
    }
  }

  previous() {
    this.lightBoxRemove;

    if (this.currentMediaPosition > 0) {
      this.currentMediaPosition--;
      this.currentMediaTitle--;
      this.linkUrl = this.tabLinks[this.currentMediaPosition];
      this.titlePos = this.title[this.currentMediaTitle];
      this.preview();
    } else {
      this.currentMediaPosition = this.links.length - 1;
      this.currentMediaTitle = this.title.length - 1;
      this.linkUrl = this.tabLinks[this.currentMediaPosition];
      this.titlePos = this.title[this.currentMediaTitle];
      this.preview();
    }
  }

  keyboardEvent() {
    this.element.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.element !== null) {
        this.close();
      } else if (e.key === 'ArrowLeft') {
        this.previous();
        this.leftArrow.focus();
      } else if (e.key === 'ArrowRight' && this.element !== null) {
        this.next();
        this.rightArrow.focus();
      } else if (e.key === 'Tab' && this.element !== null) {
        e.preventDefault();
        this.focusInModal(e);
      }
    });
  }

  constructor(
    linkUrl,
    tabLinks,
    link,
    title,
    titlePos,
    currentMediaPosition,
    currentMediaTitle
  ) {
    this.linkUrl = linkUrl;
    this.tabLinks = tabLinks;
    this.link = link;
    this.title = title;
    this.titlePos = titlePos;
    this.links = Array.from(document.querySelectorAll('.media'));
    this.currentMediaPosition = currentMediaPosition;
    this.currentMediaTitle = currentMediaTitle;

    this.element = this.buildDom();
    this.body = document.querySelector('body');
    this.body.prepend(this.element);
    this.lightboxContainer = document.querySelector('.lightbox_container');
    this.lightBoxRemove = this.lightboxContainer.firstChild.remove();

    this.closeIcon = document.querySelector('.close-lightbox');
    this.rightArrow = document.querySelector('.next');
    this.leftArrow = document.querySelector('.previous');
    this.clicEvent();
    this.keyboardEvent();
  }

  buildDom() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    wrapper.innerHTML = `
                <div class="wrapper-content">
                <div class="bground"></div>
                <div class="wrapper-left">
                  <button aria-label="bouton recule" class="previous modalLightbox" tabindex="0">
                    <i class="fas fa-solid fa-angle-left"></i>
                  </button>
                </div>
                <div class="lightbox_container">
                  
                </div>
                <div class="wrapper-right">
                  <button aria-label="avance" class="next modalLightbox" tabindex="0">
                    <i class="fas fa-solid fa-angle-right"></i>
                  </button>
                  <button aria-label="fermeture de la lightbox" class="close-lightbox modalLightbox" tabindex="0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>
                  </button>
                </div>
                </div>
                
            `;

    return wrapper;
  }
}
