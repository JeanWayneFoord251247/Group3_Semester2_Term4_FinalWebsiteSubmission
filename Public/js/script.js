// =================== MOVIE CLASS ===================
class Movie {
	constructor(id, title, overview, release_date, backdrop_path, poster_path, vote_average) {
		this.id = id;
		this.title = title;
		this.overview = overview;
		this.release_date = release_date;
		this.backdrop_path = backdrop_path;
		this.poster_path = poster_path;
		this.vote_average = vote_average;
	}
}

// =================== API OPTIONS ===================
const apiOptions = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMjRiODdlYjZkMGE5ZDZlM2M0NGQ2NzY0YjhlOSIsIm5iZiI6MTc1ODIxOTEzMS45ODUsInN1YiI6IjY4Y2M0YjdiYTY5NjNmODZjNjA3M2FjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvq9nNtX8qnCtav2IRxSOX28k9EWqMQLja5B4BcesJM'
	}
};

// =================== HELPER FUNCTIONS ===================
async function fetchJSON(url) {
	try {
		const res = await fetch(url, apiOptions);
		return await res.json();
	} catch (err) {
		console.error(err);
		return null;
	}
}

function createCarouselItem(movie, active = false) {
	return `
	<div class="carousel-item ${active ? 'active' : ''}">
		<img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="d-block w-100" alt="${movie.title}">
		<div class="carousel-caption">
			<h5>${movie.title}</h5>
			<p class="d-none d-md-block">${movie.overview}</p>
			<p><small>Released: ${movie.release_date}</small></p>
		</div>
	</div>`;
}

function createMovieCard(movie) {
	return `
	<div class="movie-card" data-id="${movie.id}">
		<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
		<div class="movie-card-info">
			<h6>${movie.title}</h6>
			<p>Released: ${movie.release_date}</p>
		</div>
	</div>`;
}

function setupMovieCardClicks() {
	document.querySelectorAll('.movie-card').forEach(card => {
		card.addEventListener('click', () => {
			const id = card.getAttribute('data-id');
			window.location.href = `movie.html?id=${id}`;
		});
	});
}

// =================== MAIN MOVIES & CAROUSEL ===================
!async function() {
	const apiUrl = 'https://api.themoviedb.org/3/account/22320853/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
	const data = await fetchJSON(apiUrl);
	if (!data || !data.results) return;

	const movies = data.results.map(m => new Movie(
		m.id,
		m.title,
		m.overview,
		m.release_date,
		m.backdrop_path,
		m.poster_path,
		m.vote_average
	));

	// Populate Carousels
	const heroCarouselInner = document.getElementById('hero-carousel-inner');
	const carouselUnderPopularInner = document.getElementById('carousel-under-popular-inner');
	const carouselAboveRecommendedInner = document.getElementById('carousel-above-recommended-inner');

	[heroCarouselInner, carouselUnderPopularInner, carouselAboveRecommendedInner].forEach(carousel => {
		if (!carousel) return;
		carousel.innerHTML = '';
		for (let i = 0; i < 5 && i < movies.length; i++) {
			carousel.innerHTML += createCarouselItem(movies[i], i === 0);
		}
	});

	// Populate Movie Rows
	const movieLists = document.querySelectorAll('.movie-list');
	const movieHTML = movies.map(createMovieCard).join('');
	movieLists.forEach(list => list.innerHTML = movieHTML);
	setupMovieCardClicks();
}();

// =================== MOVIE PAGE ===================
const movieId = new URLSearchParams(window.location.search).get('id');

if (movieId) {
	!async function() {
		const movieData = await fetchJSON(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`);
		const trailerData = await fetchJSON(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`);
		if (!movieData) return;

		const detailsContainer = document.getElementById('movie-details');
		if (!detailsContainer) return;

		detailsContainer.innerHTML = `
		<div class="col-md-5">
			<img src="https://image.tmdb.org/t/p/w500${movieData.poster_path}" alt="${movieData.title}" class="img-fluid rounded">
		</div>
		<div class="col-md-7">
			<h2>${movieData.title}</h2>
			<p><strong>Release Date:</strong> ${movieData.release_date}</p>
			<p><strong>Rating:</strong> ${movieData.vote_average} / 10</p>
			<p>${movieData.overview}</p>
			<button class="index-btn btn-play"> Play Trailer</button>
			<button class="index-btn btn-watchlist"> Add to Watchlist</button>
			<div id="trailer-container" style="margin-top:20px;"></div>
		</div>`;

		// Trailer Logic
		const trailer = trailerData?.results?.find(v => v.site === 'YouTube' && v.type === 'Trailer');
		const playBtn = document.querySelector('.btn-play');
		const trailerContainer = document.getElementById('trailer-container');

		playBtn.addEventListener('click', () => {
			if (trailer) {
				trailerContainer.innerHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${trailer.key}" title="${movieData.title} Trailer" frameborder="0" allowfullscreen></iframe>`;
				playBtn.style.display = 'none';
			} else {
				trailerContainer.innerHTML = `<p>No trailer available.</p>`;
			}
		});

		// Watchlist Logic
		const watchlistBtn = document.querySelector('.btn-watchlist');
		let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

		if (watchlist.some(item => item.id === movieData.id)) {
			watchlistBtn.textContent = ' Added';
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
				watchlistBtn.textContent = ' Added';
				watchlistBtn.disabled = true;
				watchlistBtn.style.backgroundColor = 'green';
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
					<button class="remove-btn" data-id="${movie.id}">Remove</button>
				</div>
			</div>`).join('');
	}

	watchlistContainer.addEventListener('click', e => {
		if (e.target.classList.contains('remove-btn')) {
			const id = parseInt(e.target.dataset.id);
			watchlist = watchlist.filter(movie => movie.id !== id);
			localStorage.setItem('watchlist', JSON.stringify(watchlist));
			e.target.closest('.col-md-3').remove();
		}
	});
}









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


// =================== PASSWORD TOGGLE ===================
document.getElementById('togglePassword')?.addEventListener('click', () => {
	const input = document.getElementById('passwordInput');
	const eye = document.getElementById('eyeIcon');
	if (!input || !eye) return;
	input.type = input.type === 'password' ? 'text' : 'password';
	eye.classList.toggle('fa-eye');
	eye.classList.toggle('fa-eye-slash');
});

// =================== CARD ACTION BUTTONS ===================
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

// =================== SIGN IN / SIGN UP TOGGLE USING jQUERY ===================
$(document).ready(function() {

  // Toggle between Sign In and Sign Up forms
  $("#show-signup").click(function(e) {
    e.preventDefault();
    $("#login-form").fadeOut(200, function() {
      $("#signup-form").fadeIn(200);
    });
  });

  $("#show-login").click(function(e) {
    e.preventDefault();
    $("#signup-form").fadeOut(200, function() {
      $("#login-form").fadeIn(200);
    });
  });

  // Password eye toggle for both forms
  $("#toggleLoginPassword").click(function() {
    const input = $("#loginPassword");
    const icon = $(this);
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      input.attr("type", "password");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });

  $("#toggleSignupPassword").click(function() {
    const input = $("#signupPassword");
    const icon = $(this);
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      input.attr("type", "password");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });
});