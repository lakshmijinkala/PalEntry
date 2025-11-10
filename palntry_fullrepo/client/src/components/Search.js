import React, { useState } from 'react';
const SAMPLES = ['What can I cook in under 10 minutes?','What recipes use my soon-to-expire items?','What is a high-protein meal I can make?'];
export default function Search(){ const [q,setQ]=useState(''); return (<div className="screen card"><h3>Search</h3><input placeholder="Search for any ideas here" value={q} onChange={e=>setQ(e.target.value)} /><div className="suggest-list">{SAMPLES.filter(s=>s.toLowerCase().includes(q.toLowerCase())).map((s,i)=><div key={i} className="suggest">{s}</div>)}</div></div>); }
