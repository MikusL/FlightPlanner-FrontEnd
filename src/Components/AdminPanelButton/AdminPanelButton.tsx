import React, { FC } from 'react';
import './styles.css';

type ButtonProps = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const AdminPanelButton: FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button className="AdminPanelButton" type={type} onClick={onClick}>
    {text}
  </button>
);

export default AdminPanelButton;
