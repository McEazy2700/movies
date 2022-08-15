import React from 'react'
import './VideoQuality.css'

const VideoQuality = ({torrent, onPlayVideo}) => {
    const clickHandler = ()=>{
        onPlayVideo(torrent.url)
    }
  return (
    <button onClick={clickHandler} className="quality"><span></span>{torrent.quality}</button>
  )
}

export default VideoQuality