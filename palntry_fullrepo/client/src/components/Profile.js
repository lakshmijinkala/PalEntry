import React, { useState } from 'react';
export default function Profile(){
  const [show,setShow]=useState(false);
  return (
    <div className="screen card">
      <h3>Profile</h3>
      <div className="profile-header"><div className="avatar" /><div><div className="name">John Doe</div><div className="muted">Member since 2025</div></div></div>
      <div style={{marginTop:12}}><button className="btn btn-green" onClick={()=>setShow(true)}>Support / Rate Us</button></div>
      {show && (<div className="modal"><h4>Rate PalNtry</h4><div className="rating">{[1,2,3,4,5].map(s=> <button key={s} className="btn">{s} ⭐</button>)}</div><button className="btn" onClick={()=>setShow(false)}>Close</button></div>)}
    </div>
  );
}
