import React, { Dispatch, SetStateAction} from 'react';
import { imageURL, NFT} from '../service/moralis';
// import { SvgXml } from 'react-native-svg';
// import base64 from "react-native-base64";
import { Card, Button, Container } from 'react-bootstrap'

interface Prop {
    nft: NFT,
    setChosenNFT: Dispatch<SetStateAction<NFT | undefined>> | undefined,
    chosenNFT: NFT | undefined,
}

export const NFTCardView: React.FC<Prop> = ({nft, setChosenNFT, chosenNFT}) => {
    const name = (metadata: any | null)  => {
        if (metadata){
            if (metadata.name as string) {
                return metadata.name
            } else if (metadata.title as string){
                return metadata.title
            } 
        } else {
            return ""
        }
    }
    function setChosen() {
        if (setChosenNFT){
            setChosenNFT(nft)
        } 
    }

    // const buttonView = () => {
    //     let button = (<Button onClick={setChosen} className="btn btn-lg ml-auto">
    //     <i className="mr-2"/>Choose
    // </Button>)
    //     if (chosenNFT) {
    //         if ( (nft.address === chosenNFT.address) && (nft.id === chosenNFT.id) ) {
    //             return <div/>
    //         } else {
    //             return button
    //         }
    //     } else {
    //         return button
    //     }
    // }

    const leader = () => { return (
        <a className="each-portfolio" data-fancybox="gallery" onClick={setChosen}>
            <div className="content hover-cont-wrap">
                <div className="content-overlay"></div>
                <img className="content-image" src={imageURL(nft.metadata)} />
                <div className="content-details fadeIn-bottom">
                    <h5 className="p-title">{nft.contractName}</h5>
                    <h5 className="p-title">#{nft.id}</h5>
                    <p className="p-desc">{name(nft.metadata)}</p>
                    {/* {buttonView()} */}
                    <span className="zoom"><i className="fa fa-search-plus"></i></span>
                </div>
            </div>
        </a>
    )}

    return(
        leader()
    )
}