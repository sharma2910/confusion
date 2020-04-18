import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';


function App() {
  return (
    <div >
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Restorante Con Fusion</NavbarBrand>
        </div>
      </Navbar>
    </div>
  );
}

export default App;
