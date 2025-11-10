import React from 'react';
export default function Calendar(){ return (<div className="screen card"><h3>Calendar View</h3><div className="mini-cal">{Array.from({length:30}).map((_,i)=><div key={i} className="cal-day">{i+1}</div>)}</div></div>); }
