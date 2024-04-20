const apiKey = '55ff5f5a56cec3e5fc3e0dcd52b63c0a'; // TMDb API key

// Function to search for movies by title
async function searchMoviesByTitle(title) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`);
        const data = await response.json();
        return data.results; // Returns an array of movie objects
    } catch (error) {
        console.error('Error searching for movies:', error);
        return [];
    }
}

// Function to get movie details by ID
async function getMovieDetailsById(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const data = await response.json();
        return data; // Returns a movie object with details
    } catch (error) {
        console.error('Error getting movie details:', error);
        return null;
    }
}

// Function to get the URL of the poster image for a movie
function getPosterImageUrl(posterPath, size = 'w500') {
    return `https://image.tmdb.org/t/p/${size}/${posterPath}`;
}

async function getAllMovies(maxMovies) {
    let allMovies = [];
    let currentPage = 1;

    try {
        while (allMovies.length < maxMovies) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`);
            const data = await response.json();
            
            if (data.results.length === 0) {
                break; // No more movies available
            }

            allMovies = allMovies.concat(data.results); // Concatenate current page results to allMovies array
            currentPage++;
        }
    } catch (error) {
        console.error('Error retrieving movies:', error);
    }

    return allMovies.slice(0, maxMovies); // Return up to maxMovies
}



module.exports = {
    searchMoviesByTitle,
    getMovieDetailsById,
    getAllMovies,
    getPosterImageUrl
};