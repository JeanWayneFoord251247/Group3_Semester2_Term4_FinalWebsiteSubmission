
  const searchIcon = document.querySelector('.index-icons a:last-child');
  
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search...';
  input.classList.add('search-input');
  

  searchIcon.parentNode.insertBefore(input, searchIcon);
  
 
  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    input.classList.toggle('active');
    if(input.classList.contains('active')) {
      input.focus();
    } else {
      input.value = '';
    }
  });

  input.addEventListener('blur', () => {
    input.classList.remove('active');
  });




  
document.getElementById('togglePassword').addEventListener('click',()=>{
  const input=document.getElementById('passwordInput');
  const eye=document.getElementById('eyeIcon');
  input.type=input.type==="password"?"text":"password";
  eye.classList.toggle('fa-eye');
  eye.classList.toggle('fa-eye-slash');
});


document.addEventListener('DOMContentLoaded', () => {
  const removeButtons = document.querySelectorAll('.btn-remove');

  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.watch-card');
      card.remove();
    });
  });

  const playButtons = document.querySelectorAll('.btn-play');

  playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      alert('Play button clicked! Implement player here.');
    });
  });
});