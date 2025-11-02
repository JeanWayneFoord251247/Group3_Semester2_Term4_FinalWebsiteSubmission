
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


// Mene' De Beer 
 
const btn-remove = document.getElementById('btn-remove');
const movie-name  = document.getElementById('movie-name');
const watchlist = document.getElementById('watchlist');

//add movie 
addBtn-play.addEventListener('click', () => {
  // add to watchlist
  watchlist.appendChild(movie-card);

  // remove add button
  movie-card.querySelector('.btn-add').remove();

  // add remove button
  const removeBtn = document.createElement('button');
  removeBtn.classList.add('btn-remove');
  removeBtn.textContent = 'Remove';
  movie-card.appendChild(removeBtn);

  // add remove functionality
  removeBtn.addEventListener('click', () => {
    movie-card.remove();
  });
});


// Add to watchlist logic
const watchlistBtn = document.querySelector('.btn-watchlist');
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Disable button if already in watchlist
if (watchlist.some(item => item.id === movieData.id)) {
	watchlistBtn.textContent = '✔ Added';
	watchlistBtn.disabled = true;
	watchlistBtn.style.backgroundColor = 'green';
}

watchlistBtn.addEventListener('click', () => {
	if (!watchlist.some(item => item.id === movieData.id)) {
		watchlist.push({
			id: movieData.id,
			title: movieData.title,
			poster: movieData.poster_path,
			rating: movieData.vote_average,
			release: movieData.release_date
		});
		localStorage.setItem('watchlist', JSON.stringify(watchlist));
		watchlistBtn.textContent = '✔ Added';
		watchlistBtn.disabled = true;
		watchlistBtn.style.backgroundColor = 'green';
	} else {
		alert('Movie is already in your watchlist.');
	}
});
}();
}

// =================== WATCHLIST PAGE ===================
const watchlistContainer = document.getElementById('watchlist-container');
if (watchlistContainer) {
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

if (watchlist.length === 0) {
watchlistContainer.innerHTML = '<p>No movies in your watchlist yet.</p>';
} else {
watchlistContainer.innerHTML = watchlist.map(movie => `
	<div class="col-md-3 mb-4">
		<div class="card watchlist-card">
			<img src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="${movie.title}" class="img-fluid rounded">
			<h3>${movie.title}</h3>
			<p>⭐ ${movie.rating} / 10</p>
			<p>${movie.release}</p>
			<button class="remove-btn" data-id="${movie.id}"><i class="fa-solid fa-minus"></button>
		</div>
	</div>
`).join('');
}

// Remove movie instantly
watchlistContainer.addEventListener('click', e => {
if (e.target.classList.contains('remove-btn')) {
	const id = parseInt(e.target.dataset.id);
	watchlist = watchlist.filter(movie => movie.id !== id);
	localStorage.setItem('watchlist', JSON.stringify(watchlist));
	e.target.closest('.col-md-3').remove();
}
});
}