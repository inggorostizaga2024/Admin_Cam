import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
// Import pages
import Dashboard from './pages/Dashboard';
import Streams from "./pages/Streams";
import Login from "./pages/Login";
function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard/>} />
        <Route exact path="/streams" element={<Streams />} />
        <Route exact path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
