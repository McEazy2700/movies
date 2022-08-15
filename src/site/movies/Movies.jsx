import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/card/MovieCard'
import axios from 'axios'
import './Movies.css'
import getURL from '../../utils/getURL'

const Movies = ({ search }) => {
    const [nextPage, setNextPage] = useState(1)
    const [page, setPage] = useState({
        currentPage: 0,
        totalPages: 0,
        hasMore: false
    })
    const [movies, setMovies] = useState([])

    
    useEffect(()=>{
        const getMovies = async ()=>{
            const moviesURL = getURL(process.env.REACT_APP_MY_API_KEY, 'popular', search)
            axios.get(moviesURL)
            .then(data => {
                const recievedData = data.data
                setMovies(recievedData.results || [])
                setPage({
                    currentPage: recievedData.page,
                    totalPages: recievedData.total_pages,
                    hasMore: recievedData.page <= recievedData.total_pages ? true : false
                })
                setNextPage(thisPage=> thisPage + 1)
            })
            .catch(err => console.error(err))
        }
        getMovies()
    },[search])

    
    const getNext = async ()=> {
        const getMoreMovies = async ()=>{
            const moviesURL = `${getURL(process.env.REACT_APP_MY_API_KEY, 'popular', search)}` + `&page=${nextPage}`
            axios.get(moviesURL)
            .then(data=>{
                const recievedData = data.data
                setMovies(currMovies=> [...currMovies, ...recievedData.results])
                setPage({
                    currentPage: recievedData.page,
                    totalPages: recievedData.total_pages,
                    hasMore: recievedData.page <= recievedData.total_pages ? true : false
                })
                setNextPage(thisPage=> thisPage + 1)
            })
        }
        getMoreMovies()
    }
  return (
    <div className="movies">
        <InfiniteScroll
        dataLength={movies.length}
        next={getNext}
        hasMore={page.hasMore}
        className="movies__list">
            {movies.map(movie=>{ return (
                <Link key={`/${movie.id}`} className='card__link' to={`/${movie.id}`}>
                    <MovieCard movie={movie} />
                </Link>
            )})}
        </InfiniteScroll>
    </div>
  )
}

export default Movies