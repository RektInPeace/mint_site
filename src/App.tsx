import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MintPage from './pages/MintPage';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div>
          <Routes>
            <Route path="/" element={
              <Home></Home>
            } />
            <Route path="/mint" element={
              <MintPage></MintPage>
              // <WalletNFTs nfts={walletNFTs}></WalletNFTs>
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

