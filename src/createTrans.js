import { useState } from "react";
import { block_chain_system } from "./chaindb/getBlocks.js";

function CreateTrans({setPendings, setter}) {
    const [myKey, setMyKey] = useState(block_chain_system.makeNewKey());
    const [address, setAddress] = useState(block_chain_system.makeNewKey().pub);
    const [amount, setAmount] = useState(0);
    return (
        <div className="creater">
            <h1>Create Transaction</h1>
            <div className="crow">
                <h3>From Address</h3>
                <input value={myKey.pub} disabled/>
                <div>
                    Bu sizin cüzdan adresinizdir. Bunu değiştiremezsiniz çünkü yalnızca kendi paralarınızı harcayabilirsiniz.
                </div>
            </div>

            <div className="crow">
                <h3>To Address</h3>
                <input id="address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                <div>
                    Parayı göndermek istediğiniz cüzdanın adresi. Buraya rastgele metin yazabilirsiniz (eğer parayı geri almakla ilgilenmiyorsanız)
                </div>
            </div>

            <div className="crow">
                <h3>Amount</h3>
                <input id="a" value={amount} type="number" onChange={(e) =>{
                    var val = Number(e.target.value);
                    
                    setAmount(val);
                }}/>
                <div>
                    İstediğiniz tutarı aktarabilirsiniz. Bu demoda hesap bakiyesi kontrol edilmiyor. Haydi bakalım!
                </div>
            </div>

            <button onClick={() =>{ 
                var val = document.getElementById("a").value;
                var Aval = document.getElementById("address").value;

                if (val <= 0 || Aval === "") {
                    if(val <= 0)alert("Amount 0 yada 0 dan küçük olamaz...");
                    if(Aval === "")alert("Lütfen bir adres girin");
                    setTimeout(() => {setAmount(1)}, 10);
                } else {
                    setter("pending"); 
                    block_chain_system.stratTransaction(myKey,address, amount)
                    setPendings(pendings => block_chain_system.bc.pendingTransactions)}
                }

                }>Sign & create transaction</button>
        </div>
    );
}

export default CreateTrans;