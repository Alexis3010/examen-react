import { useAuthContext } from './AuthContext';

const UserInfo = () => {
  const { user, logout } = useAuthContext(); 

  return (
    <div className="user-info">
      {user ? (
        <>
          <p>Bienvenido, {user}!</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
};

export default UserInfo;
