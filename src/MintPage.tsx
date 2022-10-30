import {useState} from 'react';
import {NFT} from './service/moralis';
import {mintSqaure} from './service/REKT';

import {WalletNFTs} from './components';
import MintNFT from './components/MintNFT';

import Navigation from './components/NavigationBar'
import { Button } from 'react-bootstrap'
import { useWeb3Context } from './context'


const MintPage = ()=>{
    const [chosenNFT, setChosenNFT] = useState<NFT>()
    const { web3Provider, } = useWeb3Context()

    const mintSquareNFT = async() => {
      const metadata = await mintSqaure(web3Provider?.getSigner())
      console.log("Metadata: ", metadata)
    }

    return(
    <div>
        <Navigation />    
        <div className="Home-header">
            <div className='pt-5'>
            <Button onClick={mintSquareNFT} >Mint Square</Button>
            <MintNFT chosenNFT={chosenNFT} ></MintNFT>
            <WalletNFTs setChosenNFT={setChosenNFT} chosenNFT={chosenNFT}></WalletNFTs>
            </div>
            
        </div>
    </div>
    )
}

export default MintPage