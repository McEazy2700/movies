import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Movies from './site/movies/Movies';
import MovieDetail from './pages/movieDetail/MovieDetail';
import './App.css';
import Navigation from './components/navBar/Navigation';
import { useState } from 'react';
import MovieCategory from './pages/movieCategory/MovieCategory';
import SideBar from './components/sideBar/SideBar';

function App() {
    const [search, setSearch] = useState('')
    const [sideBarIsOpen, setSideBarIsOpen] = useState(false)

    const apiKey = process.env.REACT_APP_MY_API_KEY
    return (
    // Development
    // <BrowserRouter className="App" >
    //   <Navigation isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} setSearch={setSearch}/>
    //   <SideBar isOpen={sideBarIsOpen} apiKey={apiKey} setIsOpen={setSideBarIsOpen}/>
    //   <Routes>
    //     <Route exact path='/' element={<Movies search={search} apiKey={apiKey}/>} />
    //     <Route exact path='/:movieId' element={<MovieDetail apiKey={apiKey} />} />
    //     <Route exact path='/genre/:genreName/:genreId' element={<MovieCategory apiKey={apiKey} />} />
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter className="App" basename={process.env.PUBLIC_URL}>
      <Navigation isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} setSearch={setSearch}/>
      <SideBar isOpen={sideBarIsOpen} apiKey={apiKey} setIsOpen={setSideBarIsOpen}/>
      <Routes>
        <Route exact path='/' element={<Movies search={search} apiKey={apiKey}/>} />
        <Route exact path=':movieId' element={<MovieDetail apiKey={apiKey} />} />
        <Route exact path='genre/:genreName/:genreId' element={<MovieCategory apiKey={apiKey} />} />
      </Routes>
    </BrowserRouter>
    
    //Production
    // <BrowserRouter className="App" basename={process.env.PUBLIC_URL}>
    //   <Navigation setSearch={setSearch}/>
    //   <Routes>
    //     <Route exact={true} path='/' element={<Movies search={search} apiKey={apiKey}/>} />
    //     <Route exact={true} path=':movieId' element={<MovieDetail />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
