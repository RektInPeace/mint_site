import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import {mintREKT} from '../interact/REKT';
import {ethers} from "ethers"
import {NFT} from '../interact/moralis';
import { Col, Row, Card, Button } from 'react-bootstrap'
import {NFTCardView} from '../components/AdressNFTs';

interface MintProp {
    chosenNFT: NFT | undefined,
    provider: ethers.providers.Web3Provider | undefined
}

export const MintNFT: React.FC<MintProp> = ({ chosenNFT, provider})=> {
    const [mintedMetada, setMintedMetadata] = useState<any | undefined>()
    const [message, setMessage] = useState("")
    const [dummy, setChosenNFT] = useState<NFT>()

    const [status, setStatus] = useState("")
    const [isMinting, setMinting] = useState(false)
    
    const mintRekt = async () => {
        if (chosenNFT !== undefined){
            try {
                setMinting(true)
                const metadata = await mintREKT(chosenNFT,message,provider?.getSigner())
                console.log(metadata)
                setMintedMetadata(metadata)
            } catch (error) {
                console.log("Mint Error: ", error)
            }
        }
    }


    return (
        (chosenNFT !== undefined) ? (
            (mintedMetada !== undefined) ? (
            <div>
                <img src={mintedMetada.image as string}></img>
            </div>
            ) : (
            <div>
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
                <Col className="overflow-hidden">
                <NFTCardView nft={chosenNFT} setChosenNFT={setChosenNFT} chosenNFT={chosenNFT} ></NFTCardView>
                </Col>
                <div>
                <h1>RIP Message: </h1>
                <textarea value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                {(isMinting ? (
                    (mintedMetada !== undefined) ? (
                        <div>
                            <h2>{status}</h2>
                            <h1>{mintedMetada.name}</h1>
                        </div>
                    ):(
                        <div>
                            <h1>Minting</h1>
                        </div>
                    ) 
                ):(
                    <Button className="btn btn-primary btn-lg" onClick={mintRekt}> Mint </Button>
                ))}
            </div>
            </Row>


            </div>
        )
        ) : (
                (provider !== null) ? (<h1>Choose an NFT</h1>) : 
            ( <h1>Connect your wallet</h1>
            )
            // <div>
            //     <h1>Image</h1>
            // <img alt="" src='data:image/svg+xml;basdata:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAxMjAwIDEyMDAiPjxpbWFnZSBocmVmPSJodHRwczovL25lb3Rva3lvLm15cGluYXRhLmNsb3VkL2lwZnMvUW1lcWVCcHNZVHVKTDhBWmhZOWZHQmVUajlRdXZNVnFhWmVSV0ZuakEyNFFFRS9iYWNrZ3JvdW5kLzgucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL2JvZHkvMC0xLnBuZyIvPjxpbWFnZSBocmVmPSJodHRwczovL25lb3Rva3lvLm15cGluYXRhLmNsb3VkL2lwZnMvUW1lcWVCcHNZVHVKTDhBWmhZOWZHQmVUajlRdXZNVnFhWmVSV0ZuakEyNFFFRS9jbG90aC8yMi5wbmciLz48aW1hZ2UgaHJlZj0iaHR0cHM6Ly9uZW90b2t5by5teXBpbmF0YS5jbG91ZC9pcGZzL1FtZXFlQnBzWVR1Skw4QVpoWTlmR0JlVGo5UXV2TVZxYVplUldGbmpBMjRRRUUvaGFuZC8wLTEtMi5wbmciLz48aW1hZ2UgaHJlZj0iaHR0cHM6Ly9uZW90b2t5by5teXBpbmF0YS5jbG91ZC9pcGZzL1FtZXFlQnBzWVR1Skw4QVpoWTlmR0JlVGo5UXV2TVZxYVplUldGbmpBMjRRRUUvd2VhcG9uLzE3LnBuZyIvPjxpbWFnZSBocmVmPSJodHRwczovL25lb3Rva3lvLm15cGluYXRhLmNsb3VkL2lwZnMvUW1lcWVCcHNZVHVKTDhBWmhZOWZHQmVUajlRdXZNVnFhWmVSV0ZuakEyNFFFRS9oZWFkLzAtMS5wbmciLz48aW1hZ2UgaHJlZj0iaHR0cHM6Ly9uZW90b2t5by5teXBpbmF0YS5jbG91ZC9pcGZzL1FtZXFlQnBzWVR1Skw4QVpoWTlmR0JlVGo5UXV2TVZxYVplUldGbmpBMjRRRUUvbW91dGgvMC0xLTIucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL25vc2UvMC0xLTIucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL2V5ZXMvMC0xLTAucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL2hlbG0vMTAucG5nIi8+PC9zdmc+'></img>
        
            // </div>
        )
    )
}
export default MintNFT