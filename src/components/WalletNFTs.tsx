import React, { Dispatch, SetStateAction, useEffect, useState} from 'react';
import { NFT } from '../service/moralis';
import { Row, Col, Button, Container } from 'react-bootstrap'
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
    const [nfts, setNFTS] = useState<NFT[]>([])

    async function fetchNFTs() {
        console.log("Address: ", address)
        console.log("Network: ", network?.name)
        let nfts = await getMoralisNFTs({address, network})
        setNFTS(nfts)
    }

    useEffect(() => {
       fetchNFTs()
    }, [address, network])

    // const groupBy = <K extends keyof NFT>(arr: NFT[], key: (i: NFT) => K) =>
    // arr.reduce((groups, item) => {
    //   (groups[key(item)] ||= []).push(item);
    //   return groups;
    // }, {} as Record<K, NFT[]>);

    const groupByToMap = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
            array.reduce((map, value, index, array) => {
            const key = predicate(value, index, array);
            map.get(key)?.push(value) ?? map.set(key, [value]);
            return map;
  }, new Map<Q, T[]>());

//   {
//     "Bored Ape" : [{name:"Monkey",}]
//     "Mulifacuer" : [{name:"Monkey"}, {name:"Monkey"}]

//   }

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
                            {nftGrid(values)}
                        </Container>
                    );
                } else {
                    return <Container />;

                }

            })
            // return groups. forEach((value: NFT[], key: string) => {
            //     // have 1 element 
            //     return (
            //         <Container>
            //             <h1>{key}</h1>
            //             {/* {nftGrid(value)} */}
            //         </Container>
            //     );
            // });
        } else {
            return <Container />;
        }
    }

    function nftGrid(_nfts: NFT[]) {
        return _nfts.map((nft: NFT, idx: number) => {
            return (
                <Col key={idx} className="overflow-hidden">
                    <NFTCardView nft={nft} setChosenNFT={setChosenNFT} chosenNFT={chosenNFT}></NFTCardView>
                </Col>
            );
        });
    }

    return(
        <div>
            <div className="flex justify-center">
            <Row xs={1} md={2} lg={4} className="g-4 py-5">
                {nftList()}
            </Row>
            </div>›
        </div>
    )
}

