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
          </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App;

