// Example: Event listener setup (if needed)
document.getElementById("search-data").addEventListener('submit', function(event) {
  event.preventDefault();

  const searchTerm = document.getElementById('search-bar').value.trim();
  const apiKey = '5d7a133b';
  const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(searchTerm)}&apikey=${apiKey}&r=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const imdbid = data.imdbID;
      console.log(imdbid);
      const videoType = data.Type
       // Set image source and movie title
       document.getElementById('imageofsearchcontant').setAttribute('src', data.Poster);
       document.getElementById('currentmovietitle').textContent = data.Title;
       // Set movie details
       document.getElementById('currentmovieplotes').textContent = "Plot: " + data.Plot;
       document.getElementById('currentmoviegenre').textContent = "Movie genre: " + data.Genre;
       document.getElementById('currentmovierated').textContent = "Rated: " + data.Rated;
       document.getElementById('currentmoviereleased').textContent = "Released: " + data.Released;
       document.getElementById('currentmovielanguage').textContent = "Language: " + data.Language;
       document.getElementById('currentmoviecountry').textContent = "Country: " + data.Country;
       document.getElementById('currentmovieimdbrating').textContent = "IMDB rating: " + data.imdbRating;
       document.getElementById('currentmovieimdbvotes').textContent = "IMDB votes: " + data.imdbVotes;
       document.getElementById('currentmoviedirector').textContent = "Directed by: " + data.Director;
      if (videoType === "movie") {
var serverprompt = prompt("Enter One Server (xyz,net,to,pm,in)");
        document.querySelector("iFrame").setAttribute("src", `https://vidsrc.${serverprompt}/embed/movie/${imdbid}`);
      } else {
        var serverprompt = prompt("Enter One Server (xyz,net,to,pm,in)");
        document.querySelector("iFrame").setAttribute("src", `https://vidsrc.${serverprompt}/embed/tv/${imdbid}`);
      }
    });
  });
