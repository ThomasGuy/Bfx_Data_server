import React from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function NavMenu() {

  return (
    <DropdownButton variant='secondary' id='dropdown-basic-button' title='Menu'>
      <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
      <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
      <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
    </DropdownButton>
  );
}

export default NavMenu;
