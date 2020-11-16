import React from 'react';

import './App.css';

import ContactList from './components/ContactList/ContactList'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        Phone book
      </header>
      <ContactList />
    </div>
  );
}

export default App;
