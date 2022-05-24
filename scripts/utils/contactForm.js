function displayModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'block';
}

document.getElementById('contact_me').addEventListener('click', displayModal);

function closeModal() {
  const modal = document.getElementById('contact_modal');
  modal.style.display = 'none';
}

document.getElementById('close_modal').focus();
document.getElementById('close_modal').addEventListener('click', closeModal);
document.getElementById('close_modal').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    closeModal();
  } else console.log('wrong key!');
});
