import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; 
import '../style.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('/trailerflix.json');
      const data = await response.json();
      setMovies(data);

      const uniqueGenres = [...new Set(data.map(movie => movie.gen))];
      uniqueGenres.sort();  
      setGenres(uniqueGenres);
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="home-container">
      <Header /> 

      <div className="genero-list">
        {genres.map((genre) => (
          <div key={genre} className="genero">
            <h2>{genre}</h2>
            <div className="movie-container">
              {movies.filter((movie) => movie.gen === genre).map((movie) => (
                <div key={movie.id} className="card" onClick={() => handleMovieClick(movie.id)}>
                  <div className="card-picture">
                    <img src={movie.poster} alt={movie.titulo} />
                  </div>
                  <div className="card-bottom">
                    <p className="card-bottom-title">{movie.titulo}</p>
                    <p>{movie.categoria}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

