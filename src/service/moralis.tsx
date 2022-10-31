import axios from 'axios';
import { Network } from "@ethersproject/networks";

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

interface Param {
  address:string | undefined | null, 
  network:Network | undefined | null
}

function chainRequest(network: Network){
  if (network.chainId === 31337) {
    return 'eth'
  } else {
    return '0x' + network.chainId.toString()
  }
}

function parseMetadata(data: any) {
  const metadata = JSON.parse(data.metadata) 
  const nft: NFT = {
    id: data.token_id, 
    address: data.token_address,
    metadata: metadata,
    contractName: data.name,
    uri: data.uri,
    symbol: data.symbol,
    contractType: data.contract_type
  }
  return nft
}

export const getMoralisNFTs = async ( param: Param ) => {
    const address = param.address
    const network = param.network

    axios.defaults.headers.common = { "X-API-Key": moralisAPIKEY,};

    if (address && network) {

      try {
          const chain = chainRequest(network)
          // console.log("CHAIN: ", chain)
          const ADDRESS = address //"0x92fCD15a46f9746D64369cCf73EBF6d6c5FD5a52"
          const endpoint = ADDRESS + `/nft?chain=${chain}&format=decimal`;
          console.log(moralisEndpoint + endpoint)
          const moralis = await axios.get(moralisEndpoint + endpoint);
          const result:[any] = moralis.data.result;
          console.log("Moralis Result: ", result);
          const mapped: NFT[] = result.map((i)=>{ 
            return parseMetadata(i)
          })
          return mapped
      } catch (error) {
          console.log("Moralis Error: ",error)
          return []
      }
  } else {
    return []
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
