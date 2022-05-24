export default function likes() {
  let likesCounter = document.querySelectorAll('.media_likes');
  let likesTotal = document.querySelector('.likes_total');

  console.log(likesTotal.innerHTML);
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
      // console.log(likesTotal.textContent);
    });
  };

  getLikesNumber();
  const likesIcons = document.querySelectorAll('.fa-regular');
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

likes();
