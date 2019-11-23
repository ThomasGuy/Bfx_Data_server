import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import MyModel from "./MyModel";
import ProfileModel from "./ProfileModel";
// import Twg from "../../img/TWG-logo2.png";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand='md' fixed='top' className='navbar-mysite'>
      <Navbar.Brand href='#'>
        <img src='../../img/TWG-logo2.png' alt='my-logo' height='50' />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Item>
            <Nav.Link href='#welcome'>Welcome</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#test'>Coins</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#contact'>Contact</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href='#about'>About</Nav.Link>
          </Nav.Item>
          <NavDropdown title='Menu' id='collasible-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.2'>More action</NavDropdown.Item>
            <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href='#deets'>
            <MyModel />
          </Nav.Link>
          <Nav.Link eventKey={2} href='#memes'>
            <ProfileModel />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
