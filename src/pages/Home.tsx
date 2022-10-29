import React, {ReactElement, FC} from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'


const Home= () => {
    return (
    <div className="Home-header">
        <h1>
            Rekt in Peace
        </h1>
        <Button onClick={event =>  window.location.href='/mint'}>
            Mint
        </Button>
    </div>
    )
}

export default Home