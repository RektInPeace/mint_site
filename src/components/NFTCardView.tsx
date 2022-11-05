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

    const buttonView = () => {
        let button = (<Button onClick={setChosen} className="btn btn-lg ml-auto">
        <i className="mr-2"/>Choose
    </Button>)
        if (chosenNFT) {
            if ( (nft.address === chosenNFT.address) && (nft.id === chosenNFT.id) ) {
                return <div/>
            } else {
                return button
            }
        } else {
            return button
        }
    }

    const leader = () => { return (
        <a className="each-portfolio" data-fancybox="gallery" onClick={setChosen}>
            <div className="content hover-cont-wrap">
                <div className="content-overlay"></div>
                <img className="content-image" src={imageURL(nft.metadata)} />
                <div className="content-details fadeIn-bottom">
                    <h5 className="p-title">{nft.contractName}</h5>
                    <h5 className="p-title">#{nft.id}</h5>
                    <p className="p-desc">{name(nft.metadata)}</p>
                    {buttonView()}
                    <span className="zoom"><i className="fa fa-search-plus"></i></span>
                </div>
            </div>
        </a>
    )}

    return(
        leader()
    // <Card style={{color: "#000"}}>
    //     <Card.Header className='font-face-mm'>{nft.contractName} #{nft.id}</Card.Header>
    //     <Card.Img alt ="" src={imageURL(nft.metadata)}></Card.Img>
    //     <Card.Body>
    //     {/* <Card.Title></Card.Title> */}
    //     <Card.Text>{name(nft.metadata)}</Card.Text>
    //     </Card.Body>
    //     <Card.Footer>
    //         {buttonView()}
    //     </Card.Footer>
    // </Card>
    )
}



    // const DATA_IMAGE = (metadata: any | null) => {
    //     let imageUrl = imageURL(metadata)

    //     if ((imageUrl.indexOf("https") == 0) || (imageUrl.indexOf("http") == 0)){
    //         console.log("Return Link")
    //         return imageUrl
    //     } else if (imageUrl == "") {
    //         console.log("Return Empty")
    //         return ""
    //     } else if (imageUrl.indexOf(svgDataUriString) == 0) {
    //         imageUrl = imageUrl.substring(26)
    //         console.log("Return URI")
    //         const data = atob(imageUrl)
    //         // const string = data.toString('ascii');
    //         console.log(data)
    //         return imageUrl
    //     }
    // }

    // const imageDiv = (metadata: any | null) => {
    //     let imageUrl = imageURL(metadata)
    //     if (isSvg64(imageUrl)) {
    //         const svgString = base64Svg(imageUrl) {
    //             return <div>{svgString}</div>
    //         }
    //     } else {
    //         return (<Card.Img alt ="" src={DATA_IMAGE(nft.metadata)}></Card.Img>)
    //     }
    // }
    // function render_xml(id: string, xml_string:string){
    //     var doc = new DOMParser().parseFromString(xml_string, 'application/xml');
    //     var el = document.getElementById(id)
    //     el?.appendChild(
    //       el.ownerDocument.importNode(doc.documentElement, true)
    //     )
    //   }

    //   const svgElement = (metadata: any | null) => {
    //     const svgString = base64Svg(imageURL(metadata))
    //     var placeholder = document.createElement('div');
    //     placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>';
    //     var elem = placeholder.firstChild;
    //     return placeholder
    //   }