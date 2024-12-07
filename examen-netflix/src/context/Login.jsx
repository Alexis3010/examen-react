import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <div className="login-container">
      <form id="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      <div id="userInfo" style={{ display: 'none' }}>
        <span id="userNameDisplay"></span>
        <button id="logoutBtn">Cerrar sesión</button>
      </div>
    </div>
  );
};

export default Login;
