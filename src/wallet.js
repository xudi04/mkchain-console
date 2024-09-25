import { block_chain_system } from "./chaindb/getBlocks.js";
import TransArea from "./trans-area.js";

function Wallet({trans, walletAddress, setter, setWalletAddress}) {
    var transactions = block_chain_system.getTransactionsToAddress(walletAddress);
    
    return (
        <div className="wallet">
            <h1>Wallet Details</h1>
            <div className="wrow">
                <h3>Address:</h3>
                <div>{walletAddress}</div>
            </div>

            <div className="wrow">
                <h3>Balance:</h3>
                <div>{block_chain_system.bc.getBalanceOfAddress(walletAddress)}</div>
            </div>

            <TransArea trans={transactions} timastamp={new Date().getTime()} setter={setter} setWalletAddress={setWalletAddress}/>
        </div>
    );
}

export default Wallet;