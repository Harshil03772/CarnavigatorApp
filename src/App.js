import React from 'react';
import './App.css';
import PopularBrand from './Components/PopularBrand';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Maruti from './Components/Brand/Maruti';
import 'bootstrap/dist/css/bootstrap.min.css';
import Brezza from './Components/Model/Brezza/Brezza';
import Base from './Components/Model/Brezza/Varient/Base';
import Login from './Admin/Login';
import Main from './Admin/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Login />} />
        <Route path="/admin-panel" element={<Main />} />
        <Route path="/" element={<PopularBrand />} />
        <Route path="/cars/:brandId" element={<Maruti />} />
        <Route path="/variant/:id" element={<Base />} />
        <Route path="/models/:carId" element={<Brezza />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
