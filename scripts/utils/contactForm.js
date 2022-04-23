const modal = document.getElementById('contact_modal');

function displayModal() {
  if (modal.style.display === 'none') {
    modal.style.display = 'block';
  } else {
    modal.style.display = 'none';
  }
}

modal.addEventListener('click', displayModal);
