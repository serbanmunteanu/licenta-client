import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './context/UserContext';
import SocketProvider from './context/SocketContext';
import Main from './containers/Main';

function App() {
  return (
    <div className="App">
       <Router>
         <UserProvider>
           <SocketProvider>
              <Main/>
           </SocketProvider>
         </UserProvider>
       </Router>
    </div>
  );
}

export default App;
