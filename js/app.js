'use strict';

const spotifyEndpoint = 'https://api.spotify.com/v1/search'

let userAlbumQuery;

$('form').on('submit', (event) => {
    event.preventDefault();

    $('#albums').empty();

    userAlbumQuery = $('#search').val().trim();
    console.log(`Searching for ${userAlbumQuery}`);

    if (userAlbumQuery === '') {
        const noUserInput = `<li class='no-albums desc'>
                             <i class='material-icons icon-help'>help_outline</i>Please enter the title of an album to seach.
                           </li>`;
        $('#albums').append(noUserInput);
    } else {


        const requestParameters = {
            q: userAlbumQuery,
            type: 'album'
        };

        $.getJSON(spotifyEndpoint, requestParameters, displayResults);
    }
});




//Call back for $.getJSON function that gets the required JSON data. This function goes through each movie and appends the proper HTML.
function displayResults(results) {

    // if (results.Response === 200){

    console.log(`The length of items is: ${results.albums.items.length}`);

    if (results.albums.items.length > 0) {

        for (let i = 0; i < results.albums.items.length; i++) {

            $('#albums').append(function() {

                //START of List Item
                const listItemHTML = `<li>
                                       <div class="album-wrap">
                                         <a class="album-link" href="${results.albums.items[i].external_urls.spotify}" target="_blank">
                                           <img class="album-art" src="${results.albums.items[i].images[0].url}">
                                         </a>
                                       </div>
                                       <span class="album-title">${results.albums.items[i].name}</span>
                                       <span class="album-artist">${results.albums.items[i].artists[0].name}</span>
                                     </li>`;
                return listItemHTML;
            });
        }
    } else {
        const noResultsListItem = `<li class='no-albums desc'>
                                    <i class='material-icons icon-help'>help_outline</i>No albums found that match: ${userAlbumQuery}.
                                   </li>`;

        $('#albums').append(noResultsListItem);
    }
}
