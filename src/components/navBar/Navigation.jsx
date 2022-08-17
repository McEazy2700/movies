import React from 'react'
import { Link } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import { CgClose } from 'react-icons/cg'
import Search from '../search/Search'
import './Navigation.css'
import Happy from '../../assets/happy.png'

const Navigation = ({ setSearch, isOpen, setIsOpen }) => {
    const menuClickHandler = ()=>{
        isOpen ? setIsOpen(false) : setIsOpen(true)
        console.log(isOpen)
    }

    return (
    <nav className='navbar'>
        <div onClick={menuClickHandler} className="hamburger">
            {isOpen ? <CgClose/> : <FiMenu/>}
        </div>
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