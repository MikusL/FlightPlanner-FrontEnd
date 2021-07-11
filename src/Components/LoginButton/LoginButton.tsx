import React, { FC } from 'react';
import './styles.css';

type ButtonProps = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const LoginButton: FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button className="loginButton" type={type} onClick={onClick}>
    {text}
  </button>
);

export default LoginButton;
