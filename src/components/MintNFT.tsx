import React, {useState} from 'react';
import {mintREKT} from '../service/REKT';
import { imageURL, NFT} from '../service/moralis';
import { Col, Row, Button, Container } from 'react-bootstrap'
import {NFTCardView} from './NFTCardView';
import { useWeb3Context } from '../context'
import { toast } from 'react-toastify'

interface MintProp {
    chosenNFT: NFT | undefined,
}

export const MintNFT: React.FC<MintProp> = ({ chosenNFT})=> {
    const { web3Provider } = useWeb3Context()
    const [mintedMetada, setMintedMetadata] = useState<any | undefined>()
    const [rektMessage, setRektMessage] = useState("")
    const [isMinting, setMinting] = useState(false)
    
    const mintRekt = async () => {
        if (chosenNFT !== undefined){
            try {
                setMinting(true)
                const signer = web3Provider?.getSigner()
                const metadata = await mintREKT(chosenNFT,rektMessage,signer)
                console.log(metadata)
                setMintedMetadata(metadata)
                toast.success('Succesfully Minted')

            } catch (error) {
                console.log("Mint Error: ", error)
                toast.error(`Mint Error: ${error}`)
            }
        }
    }

    const chosenView = (nft: NFT) => { return(
        <div>
            <Row>
                <Col className="overflow-hidden">
                <img alt="" width="500" height="600" src={imageURL(nft.metadata)}></img>
                <h1>RIP Message: </h1>

                </Col>
            
            <div>
            <textarea value={rektMessage} onChange={(e)=>setRektMessage(e.target.value)}></textarea>
            </div>
            </Row>
        </div>
    )}

    return (
        (chosenNFT !== undefined) ? (
            (mintedMetada !== undefined) ? (
            <div>
                <img alt="" width="500" height="600" src={mintedMetada.image as string}></img>
            </div>
            ) : (
            <div>
                {chosenView(chosenNFT)}
                {(isMinting ? (
                    (mintedMetada !== undefined) ? (
                        <div>
                            <h1>{mintedMetada.name}</h1>
                        </div>
                    ):(
                        <div>
                            <h1>Minting...</h1>
                        </div>
                    ) 
                ):(
                    <Button className="btn btn-primary btn-lg" onClick={mintRekt}> Mint </Button>
                ))}
            </div>


        )
        ) : (
                (web3Provider) ? (<h1>Choose an NFT</h1>) : 
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