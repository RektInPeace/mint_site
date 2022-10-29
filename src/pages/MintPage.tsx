import React, {useState, useEffect} from 'react';
import {getMoralisNFTs, imageURL, NFT} from '../interact/moralis';
import {mintSqaure} from '../interact/REKT';

import {ethers, getDefaultProvider} from "ethers"
import { isHexString } from 'ethers/lib/utils';
import { Network, Networkish } from "@ethersproject/networks";

import {WalletNFTs, NFTCardView} from '../components/AdressNFTs';
import MintNFT from '../components/MintNFT';

import Navigation from '../components/NavigationBar'
import { Col, Row, Card, Button } from 'react-bootstrap'


const MintPage = ()=>{
    const [provider, setProvider] = useState<ethers.providers.Web3Provider>()
    const [address, setAccount] = useState('');
    const [walletNFTs, setNFTs] = useState<NFT[]>([]);
    const [network, setNetwork] = useState<Network>()
    const [chosenNFT, setChosenNFT] = useState<NFT>()

    async function requestAccount() {
        console.log("Requesting Account")
        const window_ = window as any
        listeners()
        if (window_.ethereum) {
            const provider = new ethers.providers.Web3Provider(window_.ethereum)
            setProvider(provider)
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0])
            const network: Network = await provider.getNetwork()
            setNetwork(network)
            walletNft(accounts[0], network)
        } else {
          console.log("No MetaMask Installed")
        }
      }

      const listeners = () => {
        const window_ = window as any
        window_.ethereum.on('chainChanged', async function (network: Network) {
            // setChain(network.chainId)
            console.log("Chain Changed: ",network)
            await requestAccount()
            // walletNft(address, network.chainId)    
          })

        window_.ethereum.on('accountsChanged', async function (accounts: string[]) {
            // setAccount(accounts[0])
            console.log("Account Changed: ", accounts[0])
            await requestAccount()
        })
      }
    
    const walletNft = async(address: string, network: Network) => {
        const nftss = await getMoralisNFTs(address, network) as NFT[]
        setNFTs(nftss)
    }

    const mintSquareNFT = async() => {
      const metadata = await mintSqaure(provider?.getSigner())
    }

    return(
    <div>
        <Navigation web3Handler={requestAccount} account={address} network={network?.chainId ?? 1} />    
        <div className="Home-header">
            <div className='pt-5'>
            <Button onClick={mintSquareNFT} >Mint Square</Button>
            <MintNFT chosenNFT={chosenNFT} provider={provider}></MintNFT>
            <WalletNFTs nfts={walletNFTs} setChosenNFT={setChosenNFT} chosenNFT={chosenNFT} signer={provider?.getSigner()}></WalletNFTs>
            </div>
            
        </div>
    </div>
    )
}

export default MintPage