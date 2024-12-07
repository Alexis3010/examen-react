import { useAuth } from '../hooks/useAuth'; 
import '../style.css';

const Header = () => {
  const { user, login, logout } = useAuth(); 

  return (
    <header>
      <div className="title">
        <h1 className="logo-title">TRAILERFLIX</h1>
      </div>
      <div className="login-container">
        {!user ? (
          <form id="loginForm" onSubmit={(e) => login(e, document.getElementById('username').value, document.getElementById('password').value)}>
            <input className="login-input" type="text" id="username" placeholder="Usuario" required />
            <input className="login-input" type="password" id="password" placeholder="Contraseña" required />
            <button className="login-button" type="submit">INGRESAR</button>
          </form>
        ) : (
          <div id="userInfo">
            <span>Bienvenido, {user}</span>
            <button className="logout-button" onClick={logout}>Cerrar sesión</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
