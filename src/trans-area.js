function TransDiv({trans, timastamp, setter, setWalletAddress}) {
    return (<div>
              {Object.entries(trans).map(([key, value]) => (
                  <div className="row" key={key}>
                    <div className="col">{key}</div>
                    <div className="col c"onClick={()=>{
                      setter("wallet");
                      setWalletAddress(value.fromAddress);
                    }}>{value.fromAddress}</div>

                    <div className="col c" onClick={()=>{
                      setter("wallet");
                      setWalletAddress(value.toAddress);
                    }}>{value.toAddress}</div>
                    <div className="col">{value.amount}</div>
                    <div className="col">{timastamp}</div>
                    <div className="col">true</div>
                  </div>
                ))}
            </div>);
  }

  function TransArea({trans, timastamp,setter, setWalletAddress}) {
    
    if (Object.keys(trans || {}).length === 0) {
      return <h1>Transactions not have in this block</h1>
  
    } else {
      return (
        <div className="trans">
          <div className="row trans-head">
              <div className="col">#</div>
              <div className="col">From</div>
              <div className="col">To</div>
              <div className="col">Ammount</div>
              <div className="col">Timastamp</div>
              <div className="col">Valid</div>
          </div>

          <TransDiv trans={trans} timastamp={timastamp} setter={setter} setWalletAddress={setWalletAddress}/>
        </div>
        
      );
    }
  
}

export default TransArea;