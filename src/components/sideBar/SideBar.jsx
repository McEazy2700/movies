import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { getGenresURL } from '../../utils/getURL'
import './SideBar.css'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SideBar = ({ apiKey, isOpen, setIsOpen }) => {
    const redirect = useNavigate()
    const [genres, setGenres] = useState([])

    const [selectedGenre, setSelectedGenre] = useState('')
    console.log('Sidebar here')
    useEffect(()=>{
        axios.get(getGenresURL(apiKey))
        .then(data => setGenres(data.data.genres))
    },[isOpen])

    const genreChangeHandler = (event)=>{
        const genreName = event.target.value.split(',')[0]
        const genreId = event.target.value.split(',')[1]
        setSelectedGenre(genreId)
        redirect(`/genre/${genreName}/${genreId}`, {replace: true, state: []})
    }

    const menuClickHandler = ()=>{
        isOpen ? setIsOpen(false) : setIsOpen(true)
        console.log(isOpen)
    }

  return (
    <div className={isOpen ? 'sidebar slide__inX' : 'sidebar slide__outX'}>
        <div className="sidebar__home">
            <Link to='/'><span>Home</span><AiOutlineHome /></Link>
        </div>
        <div className="sidebar__filters">
            <Box className="sidebar__filters-children" sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="genres">Genre</InputLabel>
                    <Select
                    labelId="genres"
                    id="genreOptions"
                    value={selectedGenre}
                    label="Genre"
                    onChange={genreChangeHandler}
                    >
                    {genres.map(genre=><MenuItem key={genre.id} value={`${genre.name},${genre.id}`}>{genre.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <div onClick={menuClickHandler} className="filter_icon">
                <FiFilter />
            </div>
        </div>
    </div>
  )
}

export default SideBar