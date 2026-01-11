import React from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import PlaceholderPage from '@/pages/PlaceholderPage';

// Usar HashRouter para GitHub Pages (maneja mejor las rutas sin servidor)
// Si prefieres BrowserRouter, necesitarás configurar el archivo 404.html
const Router = HashRouter;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<PlaceholderPage />} />
          <Route path="/agents" element={<HomePage />} />
          <Route path="/shop" element={<PlaceholderPage />} />
          <Route path="/info" element={<PlaceholderPage />} />
          <Route path="/privacy" element={<PlaceholderPage />} />
          <Route path="/terms" element={<PlaceholderPage />} />
          <Route path="/contact" element={<PlaceholderPage />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
