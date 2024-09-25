import { block_chain_system } from "./chaindb/getBlocks.js";
import { useState, useEffect } from "react";

function Settings({header}) {
    // console.log(block_chain_system.bc.miningReword);
    const [reword, setReword] = useState(block_chain_system.bc.miningReword);
    const [diff, setDiff] = useState(block_chain_system.bc.difficulty);

    useEffect(()=>{
        block_chain_system.setReword(reword);
        // console.log("new reword is " + block_chain_system.bc.miningReword); 
        // console.log(block_chain_system); 
    }, [reword]);

    useEffect(()=>{
        // block_chain_system.bc.difficulty = diff;
        block_chain_system.setDifficulty(diff);

        // console.log("new difficulty is " + block_chain_system.bc.difficulty); 
    }, [diff]);

    
    return (
        <div>
            {/* {header} */}
            <div className="settings">
                <h1>Settings</h1>
                <div className="srow">
                    <h3>Difficulty</h3>
                    <input 
                        type="number" 
                        value={diff}
                        placeholder={"Difficulty defult : " + block_chain_system.bc.difficulty} 
                        onChange={(e)=>{
                            var val = e.target.value;
                            if (val <= 0) {
                                alert("difficulty 0 yada 0 dan küçük olamaz");
                                setTimeout(() => {setDiff(2)}, 10);
                            }
                            setDiff(Number(val));
                        } }/>
                    <div>Zorluk, madencilik sürecinin ne kadar süreceğini kontrol eder. Daha yüksek rakamlar madenciliği çok daha yavaş hale getirecek!
                    <br/>Varsayılan: 2</div>
                </div>
        
                <div className="srow">
                    <h3>Mining reward</h3>
                    <input 
                        type="number" 
                        value={reword}
                        placeholder={"Mining reward defult : " + block_chain_system.bc.miningReword} 
                        onChange={(e)=> {
                            var val = e.target.value;
                            if (val <= 0) {
                                alert("Mining Reword 0 yada 0 dan küçük olamaz");
                                setTimeout(() => {setReword(1)}, 10);
                            }
                            setReword(Number(val));

                        }}/>
                    <div>Bir madencinin zincir için başarılı bir şekilde yeni bir blok oluşturması karşılığında ne kadar 'para' alacağı.
                    <br/>Varsayılan: 100</div>
                </div>
            </div>
        </div>
    );
}

export default Settings;