
class Movies {
  constructor(adult, backdrop_path, genre_ids, id, original_language, original_title, overview,
   popularity, poster_path, release_date, title, video, vote_average, vote_count, rating) {
      this.adult = adult;
      this.backdrop_path = backdrop_path;
      this.genre_ids = genre_ids;
      this.id = id;
      this.original_language = original_language;
      this.original_title = original_title;
      this.overview = overview;
      this.popularity = popularity;
      this.poster_path = poster_path;
      this.release_date = release_date;
      this.title = title;
      this.video = video;
      this.vote_average = vote_average;
      this.vote_count = vote_count;
      this.rating = rating;
   }
}

!(async function() {
  const url = 'https://api.themoviedb.org/3/account/22320853/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwMjRiODdlYjZkMGE5ZDZlM2M0NGQ2NzY0YjhlOSIsIm5iZiI6MTc1ODIxOTEzMS45ODUsInN1YiI6IjY4Y2M0YjdiYTY5NjNmODZjNjA3M2FjOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hvq9nNtX8qnCtav2IRxSOX28k9EWqMQLja5B4BcesJM'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data); 

  } catch (error) {
    console.error('Error:', error);
  }
})();

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
