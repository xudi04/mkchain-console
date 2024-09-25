import { block_chain_system } from "./chaindb/getBlocks.js";
import TransArea from "./trans-area.js";

function PendingTrans({trans,timastamp,setPendings, setter}) {
    return (
        <div className="pending">
            <h1>Pending Transaction</h1>
            <div>
                Bu işlemler bir sonraki bloğa dahil edilmeyi bekliyor. Madencilik işlemine başladığınızda bir sonraki blok oluşturulur.
            </div>

            <TransArea trans={block_chain_system.bc.pendingTransactions} timastamp={new Date().getTime()} setter={setter}/>

            <button onClick={()=> {
                    setter("home");
                    block_chain_system.bc.minePendingTransactions()
                    block_chain_system.bc.pendingTransactions = [];
                    setPendings(block_chain_system.bc.pendingTransactions);
                    }}>Start minig</button>
        </div>
    )
}


export default PendingTrans;