document.getElementById("search-data").addEventListener('submit', function(event) {
  event.preventDefault();

  const searchTerm = document.getElementById('search-bar').value.trim();
  const apiKey = '5d7a133b';
  const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=${apiKey}&r=json`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Create and append total results count
      const padediv = document.getElementById("addpageshere");
      padediv.innerHTML = "";
      padediv.innerText = `Total Results: ${data.totalResults}`;
      // Create pagination links
      const numberOfPages = Math.ceil(data.totalResults / 10);
      for (let i = 0; i < numberOfPages; i++) {
        const newElementh6 = document.createElement('h6');
        newElementh6.classList.add('pageNumberUrl' + (i + 1));
        newElementh6.setAttribute('data-src', apiUrl + "&page=" + (i + 1));
        newElementh6.innerText = i + 1;
        document.querySelector("div#addpageshere").appendChild(newElementh6);

        // Add event listener for pagination links
        newElementh6.addEventListener('click', () => {
          const searchplaylistmovie = newElementh6.getAttribute('data-src');
          pageQueryNumber(searchplaylistmovie);
        });
      }

      // Fetch and display initial search results
      pageQueryNumber(apiUrl);
    })
    .catch(error => {
      console.error('Error fetching search results:', error);
    });

  function pageQueryNumber(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const pagesearchResultslist = data.Search || [];
        const containerOne = document.getElementById("search-results-table-one");
        const containerTwo = document.getElementById("search-results-table-two");

        // Clear previous results
        containerOne.innerHTML = '';
        containerTwo.innerHTML = '';

        // Append new results
        pagesearchResultslist.forEach((result, index) => {
          const imgLink = result.Poster;
          const movieName = result.Title;
          const imdbUrlID = result.imdbID;
          const newDiv = document.createElement('div');
          newDiv.classList.add('newDivClass');
          const newImg = document.createElement('img');
          newImg.setAttribute('src', imgLink);
          newImg.setAttribute('alt', 'Poster not found');
          const newName = document.createElement('p');
          newName.textContent = movieName;
          newName.setAttribute('data-id', imdbUrlID);
          newName.addEventListener('click', () => {

                  if (result.Type == "movie") {
                    var serverprompt = prompt("Enter One Server (xyz,net,to,pm,in)");
                            document.querySelector("iFrame").setAttribute("src", `https://vidsrc.${serverprompt}/embed/movie/${imdbUrlID}`);;
                } else {
                    var serverprompt = prompt("Enter One Server (xyz,net,to,pm,in)");
                    document.querySelector("iFrame").setAttribute("src", `https://vidsrc.${serverprompt}/embed/movie/${imdbUrlID}`);
                                }
          });
          newDiv.appendChild(newImg);
          newDiv.appendChild(newName);

          // Correct placement of this block to avoid using index outside the forEach loop
          if (index < 5) {
            containerOne.appendChild(newDiv);
          } else {
            containerTwo.appendChild(newDiv);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching page results:', error);
      });
  }
});
