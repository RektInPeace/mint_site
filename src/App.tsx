import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MintPage from './pages/MintPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div>
          <Routes>
            <Route path="/" element={
              <MintPage></MintPage>
            } />
            <Route path="/test" element={
              <h1>Hello World!</h1>
            } />
          </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App;

