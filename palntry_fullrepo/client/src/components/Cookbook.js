import React from 'react';
export default function Cookbook(){
  return (
    <div className="screen card">
      <h3>Cookbook</h3>
      <div className="recipe-grid">
        <div className="recipe">
          <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc" alt="r" />
          <div className="meta"><h4>Salmon & Veggie Bowl</h4><div className="badge green">Match</div></div>
        </div>
      </div>
    </div>
  );
}
