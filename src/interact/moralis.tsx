import { ethers } from 'ethers';
import axios from 'axios';
import { Network, Networkish } from "@ethersproject/networks";

const moralisAPIKEY = "ngTaOAuQWvTQl3BbibWd4d1KVfO0zFk70VowLzJ4XfUcgV0m0GoPAsvLf4bFLh64";
const moralisEndpoint = "https://deep-index.moralis.io/api/v2/";
const MYADDRESS = "0x956d6A728483F2ecC1Ed3534B44902Ab17Ca81b0";

export interface NFT {
  id:string | number, 
  address: string,
  metadata: any,
  contractName: string,
  uri: string,
  symbol: string,
  contractType: string
}

export const getMoralisNFTs = async(address:string, network:Network) => {
    axios.defaults.headers.common = { "X-API-Key": moralisAPIKEY,};
    const chainRequest = ()=> {
      if (network.chainId === 31337) {
        return 'eth'
      } else {
        return '0x' + network.chainId.toString()
      }
    }
    try {
        console.log("CHAIN: ", chainRequest())
        const ADDRESS = "0x92fCD15a46f9746D64369cCf73EBF6d6c5FD5a52"
        const endpoint = ADDRESS + `/nft?chain=${chainRequest()}&format=decimal`;
        console.log(moralisEndpoint + endpoint)
        const moralis = await axios.get(moralisEndpoint + endpoint);

        const result:[any] = moralis.data.result;
        console.log("Moralis Result: ", result);
        const mapped: NFT[] = result.map((i)=>{ 
          const metadata = JSON.parse(i.metadata) 
          return {
            id:i.token_id, 
            address: i.token_address,
            metadata: metadata,
            contractName: i.name,
            uri: i.uri,
            symbol: i.symbol,
            contractType: i.contract_type
          }
        })
        return mapped
    } catch (error) {
        console.log("Moralis Error: ",error)
    }
}

export const imageURL = (metadata: any | null) => {
  // console.log(metadata)
  var url = ""
  if (metadata === null ) {
    return url
  }
  if (metadata.image as string !== undefined) {
      url = metadata.image
  } else if (metadata.image_url as string !== undefined){
      url = metadata.image_url
  } else if (metadata.image_data as string !== undefined){
      url = metadata.image_data
  }
  if (url.length > 0) {
      const ipfsBase = "https://ipfs.io/"
      if (url.indexOf("ipfs://") == 0) {
          if (!url.indexOf("ipfs://ipfs/")) {
              url = ipfsBase + String(url).substring(7)
          } else {
              url = ipfsBase + 'ipfs/' + String(url).substring(7)
          }
      }
  }
  // console.log(url)
  return url
}

export const isSvg64 = (string:string) => {
  const svgDataUriString = "data:image/svg+xml;base64,"
  return (string.indexOf(svgDataUriString) == 0) 
}

export const base64Svg = (string: string) => {
  const svgDataUriString = "data:image/svg+xml;base64,"
  const dataString = string.substring(26)
  console.log(dataString)
  const svgString = atob(dataString)
  console.log(svgString)
  return svgString
}



// export const getNFTs = async(address:string) => {
//     await Moralis.start({
//         apiKey: 'ngTaOAuQWvTQl3BbibWd4d1KVfO0zFk70VowLzJ4XfUcgV0m0GoPAsvLf4bFLh64',
//     });
//     const chain = EvmChain.ETHEREUM;

//     const response = await Moralis.EvmApi.nft.getWalletNFTs({
//         address,
//         chain,
//     });

//     return response.raw.result
//     // const nfts = response.result.map((nft)=>{
//     //     if (nft.metadata) {
//     //         const metadata = nft.metadata?.name
//     //     }

//     // })
// }
