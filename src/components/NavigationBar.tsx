import { Navbar, Nav, Container } from 'react-bootstrap'
import icon from './logo512.png'
import {Web3Button} from './Web3Button'

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="/">
          <Nav.Item>
            <Nav.Link className='nav-header'>REKT IIN PEACE</Nav.Link>
          </Nav.Item>
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
        </Navbar>
    )
}

export default Navigation;