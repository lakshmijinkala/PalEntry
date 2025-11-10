import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ChatBot from './components/ChatBot';
import Scanner from './components/Scanner';
import Cookbook from './components/Cookbook';
import Calendar from './components/Calendar';
import Profile from './components/Profile';
import Search from './components/Search';
import Menu from './components/Menu';

export default function App(){
  return (
    <div className="app-root">
      <header className="topbar">
        <button className="menu-btn">☰</button>
        <h1>PalNtry</h1>
        <div className="bell">🔔</div>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/chat" element={<ChatBot/>} />
          <Route path="/scanner" element={<Scanner/>} />
          <Route path="/cookbook" element={<Cookbook/>} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/menu" element={<Menu/>} />
        </Routes>
      </main>
      <footer className="bottom-nav">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/scanner">Scan</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/profile">Profile</Link>
      </footer>
    </div>
  );
}
