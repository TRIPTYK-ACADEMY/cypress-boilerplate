/* eslint-disable no-undef */
import React, { useEffect, useState, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/ui/Sidebar';
import LoginCtx from './loginCtx';
import Secure from './pages/Secure';
import Home from './pages/Home';
import Materials from './pages/Materials';
import DetailMaterial from './pages/DetailMaterial';
import NoMatch from './pages/NoMatch';

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      setIsLogged(true);
    }
  }, []);
  const contextValue = useMemo(
    () => ({ setIsLogged, isLogged }),
    [setIsLogged, isLogged],
  );
  return (
    <LoginCtx.Provider value={contextValue}>
      <Router>
        <div className="flex pl-4 pr-8 py-8 bg-slate-200 w-full min-h-screen relative">
          <Sidebar />
          <main className="flex-grow px-16 pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="materials">
                <Route index element={<Materials />} />
                <Route path=":materialId" element={<DetailMaterial />} />
              </Route>
              <Route path="secure" element={<Secure />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 2000, className: 'toastStyle' }}
        />
      </Router>
    </LoginCtx.Provider>
  );
};

export default App;
