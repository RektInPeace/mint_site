import MintPage from './MintPage';
import { ToastContainer } from 'react-toastify';
import { Web3ContextProvider } from './context'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Web3ContextProvider>
    <div className="App">
      <MintPage/>
      <ToastContainer />
    </div>
    </Web3ContextProvider>
  )
}

export default App;

