/* eslint-disable no-undef */
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, NavLink } from 'react-router-dom';
import loginCtx from '../../loginCtx';

const Sidebar = () => {
  const { isLogged, setIsLogged } = useContext(loginCtx);
  const [isExpand, setIsExpand] = useState(true);
  const navigate = useNavigate();
  const login = () => {
    localStorage.setItem('isLogged', true);
    setIsLogged(true);
    toast('Connecté !', { className: 'successToast' });
  };
  const logout = () => {
    localStorage.clear('isLogged');
    setIsLogged(false);
    navigate('/');
    toast('Déconnecté !', { className: 'errorToast' });
  };
  return (
    <div
      className={`relative p-4 rounded-md shadow-md bg-white flex flex-col duration-200 ${
        isExpand ? 'min-w-[250px] expand' : 'min-w-[10px]'
      }`}
      data-cy="sidebar">
      <button
        type="button"
        className="absolute top-2 right-2"
        onClick={() => setIsExpand(!isExpand)}
        data-cy="expandBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 text-gray-400 duration-200 ${isExpand ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <img
        src="/img/logo.png"
        alt="logo app"
        className={`mt-8 mx-auto ${isExpand ? 'w-24' : 'w-12'}`}
      />
      <nav className="flex flex-col items-center flex-grow mt-8">
        <ul className="flex flex-col w-full flex-grow space-y-6">
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              data-cy="homeLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className={`${!isExpand ? 'expand' : ''}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isExpand && 'Accueil'}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="materials"
              className={({ isActive }) => (isActive ? 'active' : '')}
              data-cy="materialsLink">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className={`${!isExpand ? 'expand' : ''}`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              {isExpand && 'Matériels'}
            </NavLink>
          </li>
          {isLogged && (
            <li className="nav-item">
              <NavLink
                to="secure"
                className={({ isActive }) => (isActive ? 'active' : '')}
                data-cy="secureLinks">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className={`${!isExpand ? 'expand' : ''}`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                {isExpand && 'Admin'}
              </NavLink>
            </li>
          )}
        </ul>
        {isLogged ? (
          <button
            type="button"
            className="flex items-center text-blue-600 duration-200 hover:text-blue-800"
            onClick={logout}
            data-cy="logoutBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${!isExpand ? 'mr-0' : 'mr-2'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {isExpand && 'Se déconnecter'}
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center text-blue-600 duration-200 hover:text-blue-800"
            onClick={login}
            data-cy="loginBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${!isExpand ? 'mr-0' : 'mr-2'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            {isExpand && 'Se connecter'}
          </button>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
