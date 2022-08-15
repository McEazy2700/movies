import React from 'react'
import { Link } from 'react-router-dom'
import Search from '../search/Search'
import './Navigation.css'
import Happy from '../../assets/happy.png'

const Navigation = ({ setSearch }) => {
    return (
    <nav className='navbar'>
        <Link to='/'>
            <div className="nav__brand">
                <div className="nav__brand-image">
                    <img src={Happy} alt="" />
                </div>
            <h1 className='nav__brand-text'>VM</h1>
            </div>
        </Link>
        <Search setSearch={setSearch} />
    </nav>
  )
}

export default Navigation