import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Hero from './pages/Hero';
import Originals from './pages/Originals';
import Series from './pages/Series';
import Movies from './pages/Movies';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SingleTvShow } from './pages/SingleTvShow';
import { SingleMovie } from './pages/SingleMovie';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Search from './pages/Search';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/originals' element={<Originals />} />
        <Route path='/series' element={<Series />} />
        <Route path='/series/:title' element={<SingleTvShow />} />
        <Route path='/movie' element={<Movies />} />
        <Route path='/:type/:title' element={<SingleMovie />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/search' element={<Search />} />
        <Route path='*' element={<h1>Not Found 404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
