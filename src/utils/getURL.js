const getURL = (apiKey, path, search) => {
    if (search !== '') {
        const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&include_adult=false`
        return searchURL
    }else {
        const theMovieDBURL = 'https://api.themoviedb.org/3/movie/'
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
    const theMovieDBURL = 'https://api.themoviedb.org/3/movie/'
    const url = `${theMovieDBURL}${path}?api_key=${apiKey}&include_adult=false`
    return url
}

export const getYouTube = (code) => {
    const url = `https://www.youtube.com/watch?v=${code}`
    return url
}