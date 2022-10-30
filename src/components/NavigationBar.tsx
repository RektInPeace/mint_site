import { Navbar, Nav, Container } from 'react-bootstrap'
import icon from './logo512.png'
import {Web3Button} from './Web3Button'

const Navigation = () => {
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
                        <Web3Button/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation;