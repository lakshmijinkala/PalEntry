import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
const SUGGESTIONS = [
  "What can I cook in under 10 minutes?",
  "What recipes use my soon-to-expire items?",
  "What's a healthy meal with pasta?",
  "What is a high-protein meal I can make?"
];
export default function ChatBot(){
  const [input,setInput]=useState('');
  const [msgs,setMsgs]=useState([]);
  const [loading,setLoading]=useState(false);
  const ref = useRef();
  useEffect(()=>{ if(ref.current) ref.current.scrollTop = ref.current.scrollHeight }, [msgs]);
  async function send(){
    if(!input.trim()) return;
    setMsgs(m=>[...m,{from:'user',text:input}]);
    setLoading(true);
    try{
      const res = await axios.post('/api/chat',{message:input});
      setMsgs(m=>[...m,{from:'bot',text:res.data.reply||'No response'}]);
    }catch(e){
      setMsgs(m=>[...m,{from:'bot',text:'Server error'}]);
    }finally{ setLoading(false); setInput(''); }
  }
  const suggestions = SUGGESTIONS.filter(s=>s.toLowerCase().includes(input.toLowerCase()) && input.trim().length>0);
  return (
    <div className="screen card">
      <h3>AI Chatbot</h3>
      <div ref={ref} className="chat-window">
        {msgs.length===0 && <div className="muted">Ask me about recipes or expiring food.</div>}
        {msgs.map((m,i)=>(<div key={i} className={m.from==='user'?'bubble user':'bubble bot'}>{m.text}</div>))}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Type a question..." />
        <button className="btn btn-green" onClick={send}>Send</button>
      </div>
      {input.trim().length>0 && (
        <div className="typeahead">
          {suggestions.length===0 && <div className="muted">No suggestions</div>}
          {suggestions.map((s,i)=>(<div key={i} onClick={()=>setInput(s)} className="suggest">{s}</div>))}
        </div>
      )}
      {loading && <div className="muted">Thinking...</div>}
    </div>
  );
}
