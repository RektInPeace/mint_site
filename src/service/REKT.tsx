import {ethers} from 'ethers'
import { imageURL, NFT} from './moralis';
import { Rekt__factory, ImageTest__factory } from '../typechain-types/factories/contracts'
const toNum = (bigNum: ethers.BigNumber) => ethers.BigNumber.from(bigNum).toNumber()
const rektAddress = "0x3c586e048573A323B9794c38010D721d6ca5182B"
export const mintREKT = async (nft:NFT,message: string, signer: ethers.providers.JsonRpcSigner | undefined) => {
    if (signer){
        const rektContract = Rekt__factory.connect(rektAddress,signer)
        const imgURL = imageURL(nft.metadata)
        console.log("Attempting Mint")
        const overrides = {
            value: ethers.utils.parseEther('0.02'),
          }
        const tx = await (await rektContract.mintWithID(nft.address, nft.id, message, overrides)).wait()
        console.log("Mint Success")

        const bigNum = await rektContract._tokenIds()
        const tokenID = toNum(bigNum)
        console.log("Mint Success! Token ID: ", tokenID)

        const uri = await rektContract.tokenURI(tokenID)
        // console.log("Minted URI: ", uri as string)
        const response = await fetch(uri)
        const metadata = await response.json()
        // console.log(metadata)
        return metadata
    } else {
        console.log("No Signer")
    }
}

export const uriFor = async (tokenId:number, signer: ethers.providers.JsonRpcSigner | undefined) => {
    if (signer){
        const rekt = Rekt__factory.connect(rektAddress,signer)
        const uri = await rekt.tokenURI(tokenId)
        const response = await fetch(uri)
        const metadata = await response.json()
        return metadata
    }
}

export const mintSqaure = async (signer: ethers.providers.JsonRpcSigner | undefined) => {
    if (signer){
        const colorContract = ImageTest__factory.connect('0x29f3187590C6D61Ac04847971e7685AfebaC7b11',signer)
        console.log("Attempting Mint")

        const tx = await (await colorContract.mint()).wait()
        console.log("Mint Success")

        const bigNum = await colorContract._tokenIds()
        const tokenID = toNum(bigNum)
        console.log("Mint Success! Token ID: ", tokenID)

        const uri = await colorContract.tokenURI(tokenID)
        // console.log("Minted URI: ", uri as string)
        const response = await fetch(uri)
        const metadata = await response.json()
        // console.log(metadata)
        return metadata
    } else {
        console.log("No Signer")
    }
}