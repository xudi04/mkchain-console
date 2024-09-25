import { useState, useEffect } from "react";
import { block_chain_system, blockchain } from "./chaindb/getBlocks.js";
import Settings from './Settings.js';
import CreateTrans from './createTrans.js';
import PendingTrans from './pending-trans.js';
import Wallet from "./wallet.js";
import TransArea from "./trans-area.js";




// Import css files
import "./css/part-style.css";
import "./css/settings.css";
import "./css/create-trans.css";
// import { render } from "@testing-library/react";

function Header({setter, pendings}) {
  
  return (
    <div className="web-header">
      <div className="logo" onClick={()=> setter("home")}><a>MK Chain</a></div>

      <div className="menu">
        {pendings.length !== 0 && <div onClick={()=> setter("pending")}><a>Pending {pendings.length}</a></div>}
        <div onClick={()=> setter("settings")}><a>Settings</a></div>
        {/* <div onClick={()=> setter("wallet")}><a>Wallet</a></div> */}
        <div onClick={()=> setter("creater")}><a>Create Transactions</a></div>
      </div>
    </div>
  );
}

function BlockDiv(data) {
  // var [selected, setSelected] = useState(data.x);
  
  return (
    <div onClick={() => data.slc(block_chain_system.findBlock(data.hash)) } className="block-div">
      <div><h1>Block {data.x}</h1></div>
      <div className="at">
        <div>Hash</div>
        <div>{data.hash}</div>
      </div>

      <div className="at">
        <div>Previous Hash</div>
        <div>{data.prehash}</div>
      </div>

      <div className="at">
        <div>Nonce</div>
        <div>{data.nonce}</div>
      </div>

      <div className="at">
        <div>Timestamp</div>
        <div>{data.timestamp}</div>
      </div>
    </div>
  );
}

function BlocksArea({slc}) {
  var blockl = [];

    
  var data = {
       x: 1,
       hash: "mmmmmmmmmmmmmmmmmmmmmmmmmm",
       prehash: "kkkkkkkkkkkkkkkkkkkkkkkk",
       nonce: "2",
       timastamp: "1717177171771"
     }
  var blocks = blockchain.chain;
     
  for (let i = 0; i < blocks.length; i++) {
    const value = blocks[i];
      var b =  <BlockDiv 
                slc={slc}
                x={i}
                hash= {value.hash.toString()}
                prehash= {value.previousHash.toString()}
                nonce= {value.nonce.toString()}
                timestamp= {value.timestamp.toString()}/>
      blockl.push(b);
    
  }
    

  return (
    <div className="blocks-area">
      {blockl}
    </div>
  );
}


function Home({setter, setWalletAddress}) {
  var [selected, setSelected] = useState({});

  return (
    <div className="App">
      {/* <Header/> */}
      <BlocksArea slc={setSelected}/>
      {selected && <TransArea trans={selected.transations} timastamp={selected.timestamp} setter={setter} setWalletAddress={setWalletAddress} />}
  </div>);
}

function App() {
  var [tab, settab] = useState("home");
  var [pendings, setPendings] = useState([]);
  var [walletAddress, setWalletAddress] = useState("");
  

  return (
    <div>
      <Header setter={settab} pendings={pendings}/>
      {tab === "home" && <Home setter={settab} setWalletAddress={setWalletAddress}/>}
      {tab === "settings" && <Settings/>}
      {tab === "wallet" && <Wallet trans={block_chain_system.bc.chain[2].transations} walletAddress={walletAddress} setWalletAddress={setWalletAddress} setter={settab}/>}
      {tab === "pending" && <PendingTrans trans={pendings} setPendings={setPendings} setter={settab}/>}
      {tab === "creater" && <CreateTrans setter={settab} setPendings={setPendings}/>}
    </div>
  );
}

export default App;
