import React from 'react';
import { Link } from 'react-router-dom';
export default function Home(){
  return (
    <div className="screen card">
      <div className="top-icons">
        <div className="icon">🥬</div>
        <div className="icon">📚</div>
        <div className="icon">📍</div>
      </div>
      <img className="hero" src="https://images.unsplash.com/photo-1543352634-2a5b2a0980b4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=123" alt="hero" />
      <div className="actions">
        <Link className="btn btn-white" to="/cookbook">Cookbook</Link>
        <Link className="btn btn-green" to="/scanner">Scan Item</Link>
        <Link className="btn btn-white" to="/calendar">Calendar</Link>
      </div>
    </div>
  );
}
