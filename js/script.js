
class Movies {
  constructor(original_title, release_date, poster_path) {
    this.original_title = original_title;
    this.release_date = release_date;
    this.poster_path = poster_path;
  }
}

!async function() {
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMjRiODdlYjZkMGE5ZDZlM2M0NGQ2NzY0YjhlOSIsInN1YiI6IjY4Y2M0YjdiYTY5NjNmODZjNjA3M2FjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvq9nNtX8qnCtav2IRxSOX28k9EWqMQLja5B4BcesJM'
    }
  };

  // Fetch movies
  let data = await fetch(url, options)
    .then(response => response.json())
    .then(result => { return result })
    .catch(error => console.log(error));

  const movieRow = document.getElementById('movieRow');

  // Loop through first 6 movies
  for (let i = 0; i < 6; i++) {
    let movieData = data.results[i];
    let movie = new Movies(movieData.original_title, movieData.release_date, movieData.poster_path);

    // Create HTML card
    let card = document.createElement('div');
    card.classList.add('movie-card');
    card.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.original_title}">
      <p class="movie-original_title">${movie.original_title}</p>
      <p class="movie-date">${movie.release_date}</p>
    `;

    movieRow.appendChild(card);
  }
}();

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


