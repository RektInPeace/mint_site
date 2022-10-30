import React from 'react'
import { useWeb3Context } from '../context/'
// import { useWeb3 } from '../hooks/Web3Client'
import { Button } from 'react-bootstrap'

interface ConnectProps {
  connect: (() => Promise<void>) | null
}
const ConnectButton = ({ connect }: ConnectProps) => {
  return connect ? (
    <Button onClick={connect} variant="outline-light">Connect Wallet</Button>
  ) : (
    <button>Loading...</button>
  )
}

interface DisconnectProps {
  disconnect: (() => Promise<void>) | null
}

const DisconnectButton = ({ disconnect }: DisconnectProps) => {
  return disconnect ? (
    <Button onClick={disconnect} variant="outline-light">Disconnect</Button>
  ) : (
    <button>Loading...</button>
  )
}

export function Web3Button() {
  const { web3Provider, connect, disconnect } = useWeb3Context()

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}

/* {account ? (
    <Nav.Link
        href={`https://etherscan.io/address/${account}`}
        target="_blank"
        rel="noopener noreferrer"
        className="button nav-button btn-sm mx-4">
        <Button variant="outline-light">
            {account.slice(0, 5) + '...' + account.slice(38, 42)}
            {' - ' + ethers.providers.getNetwork(network).name}
        </Button>
    </Nav.Link>
) : (
    <Button onClick={web3Handler} variant="outline-light">Connect Wallet</Button>
)} */