const dbDomain = 'https://api.themoviedb.org/3'

const getURL = (apiKey, path, search) => {
    if (search !== '') {
        const searchURL = `${dbDomain}/search/movie?api_key=${apiKey}&language=en-US&query=${search}&include_adult=false`
        return searchURL
    }else {
        const theMovieDBURL = `${dbDomain}/movie/`
        const url = `${theMovieDBURL}${path}?api_key=${apiKey}&include_adult=false`
        return url
    }
}

export default getURL;

export const getImageURL = (path, width) => {
    const imageURL = `https://image.tmdb.org/t/p/${width}${path}`
    return imageURL
}

export const getMovie = (apiKey, path) => {
    const theMovieDBURL = `${dbDomain}/movie/`
    const url = `${theMovieDBURL}${path}?api_key=${apiKey}&include_adult=false`
    return url
}

export const getGenresURL = (apiKey) => {
    return `${dbDomain}/genre/movie/list?api_key=${apiKey}`
}

export const getGenreMoviesURL = (apiKey, genreId) => {
    return `${dbDomain}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
}