import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NFT } from '../service/moralis';
import { Row, Col, Button, Container } from 'react-bootstrap'
import { NFTCardView } from './NFTCardView'
import { getMoralisNFTs } from '../service/moralis'
import { useWeb3Context } from '../context'
import { groupByToMap } from '../utils/group';
// import './components.css'
import './walletNFT.css'


interface Prop {
    // nfts: NFT[],
    setChosenNFT: Dispatch<SetStateAction<NFT | undefined>>,
    chosenNFT: NFT | undefined,
}

export const WalletNFTs: React.FC<Prop> = ({ setChosenNFT, chosenNFT }) => {
    const { address, network } = useWeb3Context()
    const [nfts, setNFTS] = useState<NFT[]>([])

    async function fetchNFTs() {
        console.log("Fetching Moralis NFT")
        console.log("Address: ", address)
        console.log("Network: ", network?.name)
        let nfts = await getMoralisNFTs({ address, network })
        setNFTS(nfts)
    }

    useEffect(() => {
        fetchNFTs()
    }, [address, network])

    function nftList() {
        const groups = groupByToMap(nfts, v => v.contractName); // Map string -> NFT[]

        if (groups.size > 1) {
            const keys = Array.from(groups.keys())
            return keys.map((key: string) => {
                const values = groups.get(key)

                if (values) {
                    return (
                        <Container>
                            <h1>{key}</h1>
                            {/* {nftGrid(values)} */}
                        </Container>
                    );
                } else {
                    return <Container />;

                }

            })
        } else {
            return <Container />;
        }
    }
    function nftGrid(_nfts: NFT[]) {
        <div className="flex">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
                {
                    _nfts.map((nft: NFT, idx: number) => {
                        return (
                            <Col key={idx} className="overflow-hidden">
                                <NFTCardView nft={nft} setChosenNFT={setChosenNFT} chosenNFT={chosenNFT}></NFTCardView>
                            </Col>
                        )
                    })
                }
            </Row>
        </div>
    }

    const section = (body: JSX.Element) => {

        return (
            <section id={"Portfolio"} className="content-section">
                <div className="container">
                    <div className="block-heading">
                        <h1>Choose an NFT</h1>
                        <p>Choose an NFT to send to the graveyard</p>
                    </div>
                    {body}
                </div>
            </section>
        )
    }

    const grid = () => {
        return nfts.map((nft: NFT, idx: number) => {
            return (
                <NFTCardView nft={nft} setChosenNFT={setChosenNFT} chosenNFT={chosenNFT}></NFTCardView>
            );
        });
    }

    return (
        <div>
            {
                section(
                    <div className="portfolio-wrapper clearfix">
                        {grid()}
                    </div>
                )
            }
        </div>
    )
}


