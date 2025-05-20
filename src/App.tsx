import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Layouts and Pages
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Create from './pages/Create';
import Gallery from './pages/Gallery';
import About from './pages/About';
import NotFound from './pages/NotFound';

// State Context Provider
import { MemeProvider } from './context/MemeContext';

function App() {
  return (
    <MemeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="create/:templateId" element={<Create />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MemeProvider>
  );
}

export default App;