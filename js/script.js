
  const searchIcon = document.querySelector('.index-icons a:last-child');
  
  // Create input element dynamically
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search...';
  input.classList.add('search-input');
  
  // Insert input before the search icon
  searchIcon.parentNode.insertBefore(input, searchIcon);
  
  // Toggle expand on click
  searchIcon.addEventListener('click', (e) => {
    e.preventDefault();
    input.classList.toggle('active');
    if(input.classList.contains('active')) {
      input.focus();
    } else {
      input.value = '';
    }
  });

  // Collapse when losing focus
  input.addEventListener('blur', () => {
    input.classList.remove('active');
  });
