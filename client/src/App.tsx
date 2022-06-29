import './App.css';
import NFT from './scenes/NFT';
import Moralis from 'moralis';
import { REACT_APP_MORALIS_SERVER_URL, REACT_APP_MORALIS_APP_ID } from './config';
import NFTDetail from './scenes/NFTDetail';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



// TODO move this too App.tsx so it doesn't have to call oral
// Moralis.start({ serverUrl: REACT_APP_MORALIS_SERVER_URL, appId: REACT_APP_MORALIS_APP_ID });

function App() {
  return (
    <div className="container shadow p-3 m-3">
      <Router>
        <Switch>
          <Route exact path="/" component={NFT} />
          <Route path="/nft/:chainId/:nftAddress/:tokenId" component={NFTDetail} />
        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
