import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Movies from './site/movies/Movies';
import MovieDetail from './pages/movieDetail/MovieDetail';
import './App.css';
import Navigation from './components/navBar/Navigation';
import { useState } from 'react';

function App() {
    const [search, setSearch] = useState('')
    return (
    <BrowserRouter className="App">
      <Navigation setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<Movies search={search}/>} />
        <Route path='/:movieId' element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
