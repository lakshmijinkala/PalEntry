import React, { useState } from 'react';
export default function Scanner(){
  const [result,setResult]=useState(null);
  return (
    <div className="screen card">
      <h3>Scanner</h3>
      <div className="camera">Camera area (demo)</div>
      <div style={{marginTop:12}}>
        <button className="btn btn-green" onClick={()=>setResult({name:'Organic Whole Milk', expiry:'Expires in 5 days'})}>Simulate Scan</button>
      </div>
      {result && (
        <div className="scan-result">
          <h4>{result.name}</h4>
          <div>{result.expiry}</div>
          <button className="btn btn-green">Save expiry to calendar</button>
        </div>
      )}
    </div>
  );
}
