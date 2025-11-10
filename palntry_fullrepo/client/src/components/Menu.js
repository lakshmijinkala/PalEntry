import React from 'react';
import { Link } from 'react-router-dom';
export default function Menu(){ return (<div className="screen card"><h3>Menu</h3><nav className="menu-list"><Link to="/search">Search</Link><Link to="/chat">AI Chatbot</Link><Link to="/calendar">Calendar View</Link><Link to="/scanner">Scanner</Link><Link to="/cookbook">Cookbook</Link><Link to="/profile">Profile Page</Link></nav></div>); }
