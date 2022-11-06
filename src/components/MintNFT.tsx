import React, { useState } from 'react';
import { mintREKT } from '../service/REKT';
import { imageURL, NFT } from '../service/moralis';
import { Col, Row, Button, Container } from 'react-bootstrap'
import { NFTCardView } from './NFTCardView';
import { useWeb3Context } from '../context'
import { toast } from 'react-toastify'
import './walletNFT.css'

interface MintProp {
    chosenNFT: NFT | undefined,
}

export const MintNFT: React.FC<MintProp> = ({ chosenNFT }) => {
    const { web3Provider } = useWeb3Context()
    const [mintedMetada, setMintedMetadata] = useState<any | undefined>()
    const [rektMessage, setRektMessage] = useState("")
    const [isMinting, setMinting] = useState(false)

    const mintRekt = async () => {
        if (chosenNFT !== undefined) {
            try {
                setMinting(true)
                const signer = web3Provider?.getSigner()
                const metadata = await mintREKT(chosenNFT, rektMessage, signer)
                console.log(metadata)
                setMintedMetadata(metadata)
                toast.success('Succesfully Minted')

            } catch (error) {
                console.log("Mint Error: ", error)
                toast.error(`Mint Error: ${error}`)
            }
        }
    }

    const chosenView = () => {
        return (
            (!chosenNFT) ? <div></div> :
                <div>
                    <Row>
                        <Col className="overflow-hidden">
                            <img alt="" width="500" height="600" src={imageURL(chosenNFT.metadata)}></img>
                            <h1>RIP Message: </h1>

                        </Col>
                        <div>
                            <textarea value={rektMessage} onChange={(e) => setRektMessage(e.target.value)}></textarea>
                        </div>
                    </Row>
                    {mintButton()}
                </div>

        )
    }

    const mintedNFT = () => {
        return (
            <div>
                <img alt="" width="500" height="600" src={mintedMetada.image as string}></img>
            </div>
        )
    }

    const mintButton = () => {return(
        (isMinting ? (
            (mintedMetada !== undefined) ? (
                <div>
                    <h1>{mintedMetada.name}</h1>
                </div>
            ) : (
                <div>
                    <h1>Minting...</h1>
                </div>
            )
        ) : (
            <Button className="btn btn-primary btn-lg" onClick={mintRekt}> Mint </Button>
        ))
    )}

    const oldChosen = () => { return (
        (mintedMetada) ? mintedNFT() : (
        <div>
            {chosenView()}
        </div >
    ))}

    return (
        oldChosen()
    )
}
export default MintNFT