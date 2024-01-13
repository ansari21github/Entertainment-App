
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Movies from './components/Movies';
import TVSeries from './components/TVSeries';
import Recommended from './components/Recommended';
import MovieDetail from './components/MovieDetail';
import TvSeriesDetail from './components/TvSeriesDetail';
import BookmarkPage from './components/BookmarkPage'
function App() {
  return (

    <div >
   
<Routes>
<Route path="/" element={<Home/>} />
  <Route path='login' element={ <Login/> }/>
  <Route path='signup' element={<Signup/>}/>
  <Route path='movies' element={<Movies/>}/>
  <Route path='tvseries' element={<TVSeries/>}/>
  <Route path='recommended' element={<Recommended/>}/>
  <Route path="/movies/:id" element={<MovieDetail/>}/>
  <Route path="/tvseries/:id" element={<TvSeriesDetail/>}/>
  <Route path='bookmark' element={<BookmarkPage/>}/>

</Routes> 

    </div>
  );
}

export default App;
