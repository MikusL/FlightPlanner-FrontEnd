import React from 'react';
import Button from '../NavButton/NavButton';
import './styles.css'


const NavBar = () => {

  return (
    <div id="NavBar">
      <Button
        text="Home"
        adress = "/"/>
      <Button
        text="Airports"
        adress = "/Airports"
      />
      <Button
        text="Flights"
        adress = "/Flights"
      />
      <Button
        text="Admin"
        adress = "/admin"
      />
    </div>
  )
}

export default NavBar