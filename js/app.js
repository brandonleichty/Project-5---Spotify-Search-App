'use strict';

let userAlbumQuery;

$('form').on('submit', (event) => {
    event.preventDefault();
    userAlbumQuery = $('#search').val().trim();
    console.log(`Searching for ${userAlbumQuery}`);
});
