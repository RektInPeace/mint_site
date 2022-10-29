import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import { imageURL, NFT, isSvg64, base64Svg} from '../interact/moralis';
import { uriFor } from '../interact/REKT';
import ethers from 'ethers'
import { SvgXml } from 'react-native-svg';
// import base64 from "react-native-base64";
import { Row, Col, Card, Button } from 'react-bootstrap'

interface Prop {
    nfts: NFT[],
    setChosenNFT: Dispatch<SetStateAction<NFT | undefined>>,
    chosenNFT: NFT | undefined,
    signer: ethers.providers.JsonRpcSigner | undefined
}

interface NFTCardProp {
    nft: NFT,
    setChosenNFT: Dispatch<SetStateAction<NFT | undefined>>,
    chosenNFT: NFT | undefined,
}

export const WalletNFTs: React.FC<Prop> = ({nfts, setChosenNFT, chosenNFT, signer})=> {
    const nftGrid = () => {

        const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
        arr.reduce((groups, item) => {
          (groups[key(item)] ||= []).push(item);
          return groups;
        }, {} as Record<K, T[]>);

        const groups:Record<string, NFT[]> = groupBy(nfts, i=>i.contractName)


        return nfts.map((nft, idx) => {
            return (
                <Col key={idx} className="overflow-hidden">
                    <NFTCardView nft={nft} setChosenNFT={setChosenNFT} chosenNFT={chosenNFT}></NFTCardView>
                </Col>
            )
        })
    }
    

    return(
        <div>
            <div className="flex justify-center">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
                {nftGrid()}
            </Row>

            </div>
        </div>
    )
}

export const NFTCardView: React.FC<NFTCardProp> = ({nft, setChosenNFT, chosenNFT}) => {

    // const [metadata, setMetadata] = useState()

    const name = (metadata: any | null)  => {

        if (metadata === null) {
            return ""
        }
        var name = ""
        if (metadata.name as string !== null) {
            name = metadata.name
        } else if (metadata.title as string !== null){
            name = metadata.title
        } 
        return name

    }

    const showButton = () => {
        if (chosenNFT === undefined) {
            return true
        } else {
            if ( (nft.address === chosenNFT.address) && (nft.id === chosenNFT.id) ) {
                return false
            } else {
                return true
            }

        }
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
    function render_xml(id: string, xml_string:string){
        var doc = new DOMParser().parseFromString(xml_string, 'application/xml');
        var el = document.getElementById(id)
        el?.appendChild(
          el.ownerDocument.importNode(doc.documentElement, true)
        )
      }

      const svgElement = (metadata: any | null) => {
        const svgString = base64Svg(imageURL(metadata))
        var placeholder = document.createElement('div');
        placeholder.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>';
        var elem = placeholder.firstChild;
        return placeholder
      }
    return(
    // <Card style={{color: "#000"}}>
    //     <Card.Header>{nft.contractName}</Card.Header>
    //     {/* <img alt="" src={imageURL(nft.metadata)}></img> */}
    //     {/* <SvgXml xml={DATA_IMAGE(nft.metadata)} width='50%' height='50%' /> */}
    //     {(isSvg64(imageURL(nft.metadata))) ? (<div>
    //         <img src={`data:image/svg+xml;utf8,${base64Svg(imageURL(nft.metadata))}`} />
    //     </div>) : (<Card.Img alt ="" src={imageURL(nft.metadata)}></Card.Img>)}
    //     <Card.Body>
    //     <Card.Title>{name(nft.metadata)}</Card.Title>
    //     <Card.Text>#{nft.id}</Card.Text>
    //     </Card.Body>
    //     <Card.Footer>
    //         {showButton() ? (
    //             <Button onClick={()=> setChosenNFT(nft)} className="btn btn-bordered-white btn-smaller mt-3">
    //                 <i className="mr-2"/>Choose
    //             </Button>
    //         ):(
    //             <div></div>
    //         )}

    //     </Card.Footer>
    // </Card>
    <div>
    <img alt="" src="data:image/svg+xml;basdata:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHZpZXdCb3g9IjAgMCAxMjAwIDEyMDAiPjxpbWFnZSBocmVmPSJodHRwczovL25lb3Rva3lvLm15cGluYXRhLmNsb3VkL2lwZnMvUW1lcWVCcHNZVHVKTDhBWmhZOWZHQmVUajlRdXZNVnFhWmVSV0ZuakEyNFFFRS9iYWNrZ3JvdW5kLzgucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL2JvZHkvMC0xLnBuZyIvPjxpbWFnZSBocmVmPSJodHRwczovL25lb3Rva3lvLm15cGluYXRhLmNsb3VkL2lwZnMvUW1lcWVCcHNZVHVKTDhBWmhZOWZHQmVUajlRdXZNVnFhWmVSV0ZuakEyNFFFRS9jbG90aC8yMi5wbmciLz48aW1hZ2UgaHJlZj0iaHR0cHM6Ly9uZW90b2t5by5teXBpbmF0YS5jbG91ZC9pcGZzL1FtZXFlQnBzWVR1Skw4QVpoWTlmR0JlVGo5UXV2TVZxYVplUldGbmpBMjRRRUUvaGFuZC8wLTEtMi5wbmciLz48aW1hZ2UgaHJlZj0iaHR0cHM6Ly9uZW90b2t5by5teXBpbmF0YS5jbG91ZC9pcGZzL1FtZXFlQnBzWVR1Skw4QVpoWTlmR0JlVGo5UXV2TVZxYVplUldGbmpBMjRRRUUvd2VhcG9uLzE3LnBuZyIvPjxpbWFnZSBocmVmPSJodHRwczovL25lb3Rva3lvLm15cGluYXRhLmNsb3VkL2lwZnMvUW1lcWVCcHNZVHVKTDhBWmhZOWZHQmVUajlRdXZNVnFhWmVSV0ZuakEyNFFFRS9oZWFkLzAtMS5wbmciLz48aW1hZ2UgaHJlZj0iaHR0cHM6Ly9uZW90b2t5by5teXBpbmF0YS5jbG91ZC9pcGZzL1FtZXFlQnBzWVR1Skw4QVpoWTlmR0JlVGo5UXV2TVZxYVplUldGbmpBMjRRRUUvbW91dGgvMC0xLTIucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL25vc2UvMC0xLTIucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL2V5ZXMvMC0xLTAucG5nIi8+PGltYWdlIGhyZWY9Imh0dHBzOi8vbmVvdG9reW8ubXlwaW5hdGEuY2xvdWQvaXBmcy9RbWVxZUJwc1lUdUpMOEFaaFk5ZkdCZVRqOVF1dk1WcWFaZVJXRm5qQTI0UUVFL2hlbG0vMTAucG5nIi8+PC9zdmc+e64,PHN2ZyB4bWxucz0iaHR0cDo etc"></img>

    </div>

    )
}

// export default WalletNFTs;