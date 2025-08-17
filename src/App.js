import { Route, Routes } from 'react-router-dom';
import Hero from './pages/Hero';
import Originals from './pages/Originals';
import Series from './pages/Series';
import Movies from './pages/Movies';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { SingleTvShow } from './pages/SingleTvShow';
import { SingleMovie } from './pages/SingleMovie';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/originals' element={<Originals />} />
        <Route path='/series' element={<Series />} />
        <Route path='/series/:title' element={<SingleTvShow />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movie/:title' element={<SingleMovie />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<h1>Not Found 404</h1>} />
      </Routes>

    </div>
  );
}

export default App;
