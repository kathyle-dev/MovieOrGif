let movieBtn = document.querySelector("#btn-movie")
movieBtn.addEventListener("click", (e)=>{fetchMovie(e)})

let giphyBtn = document.querySelector("#btn-giphy")
giphyBtn.addEventListener("click", (e)=>{fetchGif(e)})

// function axiosData(){
//   const url= 'http://www.omdbapi.com/?apikey=1a115513&'
  
//   axios.get(url)
//   .then(res=> displayData(res.data))
//   .catch(err=> console.log(err))
// }

function displayData(data, e){
  const app = document.querySelector("#app")
  if(e.target.classList.contains("movie")){
    console.log("display movie")
    app.innerHTML= getMovieDisplay(data)
  }
  else{
    console.log("display gif")
    app.innerHTML= getGifDisplay(data)
  } 
}

function getMovieDisplay(movies){
  let allMovies = "";
  movies.forEach( (movie) => {
    let {Title: title, Year: year, Poster: poster} = movie
    allMovies+= `
    <div class="card" style="width: 18rem;">
  <img src=${poster} class="card-img-top" alt="avatar image">
  <div class="card-body">
    <h5 class="card-title">Title: ${title}</h5>
    <p class="card-text">Year: ${year}</p>
  </div>
</div>
    `})
  return allMovies;
}

function fetchMovie(e){
  let input = document.querySelector("#inputId").value.replace(" ","+");
  console.log(input)
  fetch(`https://www.omdbapi.com/?s=${input}&apikey=1a115513`)
  .then(response => response.json())
  .then(data => 
        displayData(data.Search, e)
  );
}

function fetchGif(e){
  let input = document.querySelector("#inputId").value.replace(" ","+");
  console.log(input)
  fetch(`https://api.giphy.com/v1/gifs/search?q=${input}&api_key=RwxMrNo9mEFKeuL9FBZMBBG8u47CVs7q&limit=5`)
  .then(response => response.json())
  .then(data => 
      displayData(data.data, e)
  );
}

function getGifDisplay(gifs){
  let allGifs = "";
  gifs.forEach( (gif) => {
    let {images:{original:{url}}} = gif
    console.log(gif)
    allGifs+= `
    <div class="card" style="width: 18rem;">
  <img src=${url} class="card-img-top" alt="gif image">
</div>
    `})
  return allGifs;
}
