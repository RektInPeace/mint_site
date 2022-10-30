import React, { Dispatch, SetStateAction, useEffect, useState} from 'react';
import { NFT } from '../service/moralis';
import { Row, Col, Button } from 'react-bootstrap'
import { NFTCardView } from './NFTCardView'
import { getMoralisNFTs } from '../service/moralis'
import { useWeb3Context } from '../context'

interface Prop {
    // nfts: NFT[],
    setChosenNFT: Dispatch<SetStateAction<NFT | undefined>>,
    chosenNFT: NFT | undefined,
}

export const WalletNFTs: React.FC<Prop> = ({setChosenNFT, chosenNFT})=> {
    const { address, network } = useWeb3Context()
    const [nftss, setNFTS] = useState<NFT[]>([])

    async function fetchNFTs() {
        console.log("Address: ", address)
        console.log("Network: ", network?.name)
        let nfts = await getMoralisNFTs({address, network})
        setNFTS(nfts)
       }

    useEffect(() => {
       fetchNFTs()
    }, [address, network])

    const nftGrid = () => {
    
        // const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
        // arr.reduce((groups, item) => {
        //   (groups[key(item)] ||= []).push(item);
        //   return groups;
        // }, {} as Record<K, T[]>);

        // const groups:Record<string, NFT[]> = groupBy(nfts, i=>i.contractName)


        return nftss.map((nft, idx) => {
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

