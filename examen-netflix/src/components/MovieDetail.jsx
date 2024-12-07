import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header"; 

const MovieDetail = () => {
  const { id } = useParams(); 
  const [pelicula, setPelicula] = useState(null); 
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth(); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch("/trailerflix.json"); 
        const data = await response.json();
        const movie = data.find((item) => item.id === parseInt(id)); 

        if (movie) {
          setPelicula(movie); 
        } else {
          console.error("Película no encontrada");
        }
      } catch (error) {
        console.error("Error al cargar los detalles de la película:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (!pelicula) {
    return <div className="error">Película no encontrada</div>;
  }

  return (
    <div className="movie-detail-container">
      <Header />

      <div className="details-header">DETALLES DE LA PELICULA </div>

      <div className="login-container">
        {user ? (
          <div id="userInfo">
            <span>Bienvenido, {user}</span>
            <button className="logout-button" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div id="loginInfo">
          </div>
        )}
      </div>

      <div className="movie-detail-content">
        <div className="movie-poster">
          <img src={pelicula.poster} alt={pelicula.titulo} />
        </div>
        <div className="movie-info">
          <h2>{pelicula.titulo}</h2>
          <p>
            <strong>Resumen:</strong> {pelicula.resumen}
          </p>
          <iframe
            width="560"
            height="315"
            src={pelicula.trailer}
            allowFullScreen
          ></iframe>
          <p>
            <strong>Reparto:</strong> {pelicula.reparto}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;