import React, { useEffect, useState } from 'react'
import { FaPlay, FaDownload } from 'react-icons/fa'
import { useParams, Link } from 'react-router-dom'
import VideoQuality from '../../components/card/VideoQuality'
import getTorrent from '../../utils/getTorrent'
import { getImageURL, getMovie } from '../../utils/getURL'
import './MovieDetail.css'

const MovieDetail = () => {
    const loadjs = require('loadjs')
    const [movie, setMovie] = useState({})
    const [genres, setGenres] = useState([])
    const [classes, setClasses] = useState({
        qualityClass: 'video__quality fade__out',
        applogyClass: 'video__appology fade__out'
    })
    const [videoExists, setVideoExists] = useState(false)
    const [yts, setYts] = useState({
        exists: false,
        movie: {},
        torrents: []
    })
    const [torrentURL, setURL] = useState('')
    const [isDownloading, setIsDownloading] = useState(false)
    const axios = require('axios')
    const query = useParams()
    useEffect(()=>{
        const movieURL = getMovie(process.env.REACT_APP_MY_API_KEY, query.movieId)
        axios.get(movieURL)
        .then(data => {
            const movie = data.data
            setMovie(movie)
            setGenres(movie.genres || [])
            
            axios.get(`https://yts.mx/api/v2/movie_details.json?imdb_id=${movie.imdb_id}&with_images=true&with_cast=true`)
            .then(resp=> {
                const movie = resp.data.data.movie || {}
                setYts({
                    exists: movie.torrents ? true : false,
                    movie: movie,
                    torrents: movie.torrents || []
                })
        })})

        
    },[isDownloading])
    const movieStyle = {
        backgroundImage: `url('${getImageURL(movie.backdrop_path, 'original')}')`,
        backgroundSize: 'cover',
        zIndex: '-1000',
        position: 'fixed',
        top: '10px',
        left: '0',
        right: '0',
        bottom: '0'
    }
    const playMovie = async (url)=>{
        getTorrent(url, setURL)
        setIsDownloading(true)
    }
    const showQuality = ()=>{
        if (yts.torrents.length > 0) {
            setVideoExists(true)
            setClasses({
                qualityClass: 'video__quality fade__in',
                applogyClass: 'video__appology fade__out'
            })
        }else {
            setVideoExists(false)
            setClasses({
                qualityClass: 'video__quality fade__out',
                applogyClass: 'video__appology fade__in'
            })
        }
    }
  return (
    <div className='movie'>
        <div className="movie__details-short">
            <div className="movie__details-image">
                <img src={getImageURL(movie.poster_path, 'w300')} alt={movie.title} />
            </div>
            <div className="movie__details-text">
                <div className="movie__details-short_text">
                    <div className="movie__details-cta">
                        <button onClick={showQuality} className='movie__play-btn'>
                            <div className="button__icon"><FaPlay /></div>
                        </button>
                        {videoExists ?<div className={classes.qualityClass}>
                            {yts.torrents.map((torrent, index) =><VideoQuality 
                            torrent={torrent} key={index} onPlayVideo={playMovie}/>)}
                        </div> : <div className={classes.applogyClass}>
                            <span />
                            <p>This video is currently unalvailable!</p>
                        </div> }
                    </div>
                    <h1>{movie.original_title}</h1>
                    <h4>{movie.runtime} mins</h4>
                    <div className="movie__genres">
                        {genres.map(genre => {
                            return <div key={genre.id} className="genre">{genre.name}</div>
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className="movie__details-long">
            {isDownloading && <div id="player"  className='movie__details-video'>
                <video controls id="player" src={torrentURL}></video>
            </div>}
            <div className="movie__details-description">
                <p>{movie.overview}</p>
            </div>
            <div className="movie__details-long_images">
                <div className="movie__detail-image">
                    <img src={yts.movie.medium_screenshot_image1} alt={movie.title} />
                </div>
                <div className="movie__detail-image">
                    <img src={yts.movie.medium_screenshot_image2} alt={movie.title} />
                </div>
                <div className="movie__detail-image">
                    <img src={yts.movie.medium_screenshot_image3} alt={movie.title} />
                </div>
            </div>
        </div>
        <div className="movie__background" style={movieStyle} />
        {setTimeout(()=>{
            loadjs("https://cdn.jsdelivr.net/npm/@webtor/embed-sdk-js/dist/index.min.js")
        }, 5000)}
    </div>
  )
}

export default MovieDetail