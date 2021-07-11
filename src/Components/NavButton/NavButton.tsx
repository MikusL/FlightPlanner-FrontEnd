import React, {FC} from 'react';
import './styles.css';
import {
  NavLink,
} from "react-router-dom";

type ButtonProps = {
  text: string
  adress: string
}

const Button: FC<ButtonProps> = ({text, adress}) => {

  const checkActive = (match:any, location:any) => {
    if(!location) return false;
    const {pathname} = location;
    return pathname === adress;
  }

  return (
    <NavLink to={adress} className="NavButton" activeClassName="active" isActive={checkActive}>
      {text}
    </NavLink>
  )
}

export default Button

