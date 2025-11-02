class Movie {
	constructor(title, overview, release_date, backdrop_path, poster_path) {
		this.title = title;
		this.overview = overview;
		this.release_date = release_date;
		this.backdrop_path = backdrop_path;
		this.poster_path = poster_path;
	}
}

!async function() {

	const apiUrl = 'https://api.themoviedb.org/3/account/22320853/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
	const apiOptions = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMjRiODdlYjZkMGE5ZDZlM2M0NGQ2NzY0YjhlOSIsIm5iZiI6MTc1ODIxOTEzMS45ODUsInN1YiI6IjY4Y2M0YjdiYTY5NjNmODZjNjA3M2FjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvq9nNtX8qnCtav2IRxSOX28k9EWqMQLja5B4BcesJM'
		}
	};

	let data = await fetch(apiUrl, apiOptions)
		.then((response) => response.json())
		.then((result) => { return result })
		.catch((error) => console.log(error));

	let movies = [];
	for (let i = 0; i < data.results.length; i++) {
		let movieData = data.results[i];
		let movie = new Movie(
			movieData.title,
			movieData.overview,
			movieData.release_date,
			movieData.backdrop_path,
			movieData.poster_path
		);
		movies.push(movie);
	}

	const heroCarouselInner = document.getElementById('hero-carousel-inner');
	const carouselUnderPopularInner = document.getElementById('carousel-under-popular-inner');
	const carouselAboveRecommendedInner = document.getElementById('carousel-above-recommended-inner');
	const movieLists = document.querySelectorAll('.movie-list');

	function populateHeroCarousel() {
		const carousels = [
			heroCarouselInner,
			carouselUnderPopularInner,
			carouselAboveRecommendedInner
		];

		carousels.forEach(carousel => {
			if (!carousel) return;
			carousel.innerHTML = '';
			for (let i = 0; i < 5 && i < movies.length; i++) {
				const movie = movies[i];
				const activeClass = i === 0 ? 'active' : '';
				carousel.innerHTML += `
					<div class="carousel-item ${activeClass}">
						<img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="d-block w-100" alt="${movie.title}">
						<div class="carousel-caption">
							<h5>${movie.title}</h5>
							<p class="d-none d-md-block">${movie.overview}</p>
							<p><small>Released: ${movie.release_date}</small></p>
						</div>
					</div>
				`;
			}
		});
	}

	function populateMovieRows() {
		let html = '';
		for (let i = 0; i < movies.length; i++) {
			const movie = movies[i];
			html += `
				<div class="movie-card" data-id="${data.results[i].id}">
					<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
					<div class="movie-card-info">
						<h6>${movie.title}</h6>
						<p>Released: ${movie.release_date}</p>
					</div>
				</div>
			`;
		}
		movieLists.forEach(list => list.innerHTML = html);

		// Make cards clickable
		document.querySelectorAll('.movie-card').forEach(card => {
			card.addEventListener('click', () => {
				const id = card.getAttribute('data-id');
				window.location.href = `movie.html?id=${id}`;
			});
		});
	}

	populateHeroCarousel();
	populateMovieRows();

}();

// Get movie ID from URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const apiOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMjRiODdlYjZkMGE5ZDZlM2M0NGQ2NzY0YjhlOSIsIm5iZiI6MTc1ODIxOTEzMS45ODUsInN1YiI6IjY4Y2M0YjdiYTY5NjNmODZjNjA3M2FjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvq9nNtX8qnCtav2IRxSOX28k9EWqMQLja5B4BcesJM'
	}
};

!async function() {

	let movieData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, apiOptions)
		.then((response) => response.json())
		.then((result) => { return result })
		.catch((error) => console.log("Movie fetch error:", error));

	let trailerData = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, apiOptions)
		.then((response) => response.json())
		.then((result) => { return result })
		.catch((error) => console.log("Trailer fetch error:", error));

	// Display movie info
	const detailsContainer = document.getElementById('movie-details');
	detailsContainer.innerHTML = `
		<div class="col-md-5">
			<img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title}" class="img-fluid rounded">
		</div>
		<div class="col-md-7">
			<h2>${movieData.title}</h2>
			<p><strong>Release Date:</strong> ${movieData.release_date}</p>
			<p><strong>Rating:</strong> ${movieData.vote_average} / 10</p>
			<p>${movieData.overview}</p>
			<button class="index-btn btn-play"><i class="fa-solid fa-play"></i> Play Trailer</button>
			<div id="trailer-container" style="margin-top:20px;"></div>
		</div>
	`;

	// Handle trailer
	const trailer = trailerData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
	const playButton = document.querySelector('.btn-play');
	const trailerContainer = document.getElementById('trailer-container');

	playButton.addEventListener('click', () => {
		if (trailer) {
			trailerContainer.innerHTML = `
				<iframe width="100%" height="400" src="https://www.youtube.com/embed/${trailer.key}" 
				title="${movieData.title} Trailer" frameborder="0" allowfullscreen></iframe>
			`;
			playButton.style.display = 'none';
		} else {
			trailerContainer.innerHTML = `<p>No trailer available for this movie.</p>`;
		}
	});

}();






// //console.log(data);
// //console.log(data.response[0].name);

// let name = data.response[0].name;
// let city = data.response[0].city;
// let code = data.response[0].code;
// let nickname = data.response[0].nickname;

// let nbaTeams = new Teams(name, city,code, nickname,)

// //console.log(nbaTeams);

// document.getElementById('name').innerHTML = nbaTeams.name;
// document.getElementById('content').innerHTML = "Nickname: " + nbaTeams.nickname + "<br>" + "Code: " + nbaTeams.code + "<br>" + "City: " + nbaTeams.city;


// }();


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


