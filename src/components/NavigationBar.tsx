import { Link } from "react-router-dom";
import React, {ReactElement, FC} from 'react'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import icon from './logo512.png'
import { ethers } from "ethers"

interface Props {
    web3Handler: any,
    account: String,
    network: number
}

const Navigation: FC<Props> = ({ web3Handler, account, network }) => {
    return (
        <Navbar expand="lg" className="colorBackground">
            <Container>
                <Navbar.Brand href="/">
                    <img src={icon} width="40" height="40" className="" alt="" />
                    &nbsp; 
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link as={Link} to="/mint">Mint</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create Color</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {account ? (
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
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

const MyNavigation: FC<Props> = ({ web3Handler, account, network }) => {
    return(<div></div>)
}


export default Navigation;