import axios from 'axios'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import MovieCard from '../../components/card/MovieCard'
import { getGenreMoviesURL } from '../../utils/getURL'

const MovieCategory = ({ apiKey, search }) => {
    const redirect = useNavigate()
    const genre = useParams()
    const location = useLocation()
    const moviesURL = getGenreMoviesURL(apiKey, genre.genreId)
    const [hasMorePages, setHasMorePages] = useState(true)
    const [nextPage, setNextPage] = useState(1)
    const [movies, setMovies] = useState([])
    useEffect(()=>{
        search != '' && redirect('/', {replace: true, state: []})
        axios.get(moviesURL)
        .then(movies=>{
            const data = movies.data
            setMovies(data.results)
            setHasMorePages(data.page < data.total_pages ? true : false)
            setNextPage(thisPage=> thisPage + 1)
        })
    },[location, search])
    
    const getNext = async ()=> {
        const getMoreMovies = async ()=>{
            const moreMoviesUrl = moviesURL + `&page=${nextPage}`
            axios.get(moreMoviesUrl)
            .then(data=>{
                const recievedData = data.data
                setMovies(currMovies=> [...currMovies, ...recievedData.results])
                setHasMorePages(recievedData.page < recievedData.total_pages ? true : false)
                setNextPage(thisPage=> thisPage + 1)
            })
        }
        getMoreMovies()
    }
  return (
    <div className="movies">
        <div className="genre__title">
            <h1>{genre.genreName}</h1>
        </div>
        <InfiniteScroll
        dataLength={movies.length}
        next={getNext}
        hasMore={hasMorePages} 
        className="movies__list">
            {movies.map(movie=>{ return (
                <Link key={movie.id} className='card__link' to={`/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            )})}
        </InfiniteScroll>
    </div>
  )
}

export default MovieCategory