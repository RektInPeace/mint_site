import { useState } from 'react';
import { NFT } from './service/moralis';
import { mintSqaure } from './service/REKT';

import { WalletNFTs } from './components';
import MintNFT from './components/MintNFT';

import Navigation from './components/NavigationBar'
import { Button } from 'react-bootstrap'
import { useWeb3Context } from './context'


const MintPage = () => {
    const [chosenNFT, setChosenNFT] = useState<NFT>()
    const { web3Provider, } = useWeb3Context()

    const mintSquareNFT = async () => {
        const metadata = await mintSqaure(web3Provider?.getSigner())
        console.log("Metadata: ", metadata)
    }

    const mintButton = () => {
        return (
            <a href="https://mint.rektinpeace.com/">
                <button className="mint-button font-face-mm ">MINT</button>
            </a>
        )
    }

    const top = () => {
        return (
            <div className='parent'>
            <img className='tomb-image child' src="/tomb.png"></img>
            <div className='child back-image'>
                <h1 className='font-face-mm'>GONE TOO SOON MEMORIALIZE<br />YOUR DEAD NFTs</h1>
                {mintButton()}
                <h2 className='font-face-mm'>Choose an NFT to mint with and send to graveyard to get REKT</h2>
            </div>
        </div>
        )
    }


    return (
        <div>
        <Navigation />
        {top()}
        <MintNFT chosenNFT={chosenNFT} ></MintNFT>
        <WalletNFTs setChosenNFT={setChosenNFT} chosenNFT={chosenNFT}></WalletNFTs>
        </div>
    )
}

export default MintPage