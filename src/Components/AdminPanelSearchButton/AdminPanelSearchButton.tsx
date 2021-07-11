import React, { FC } from 'react';
import './styles.css';

type ButtonProps = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const AdminPanelSearchButton: FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button className="AdminPanelSearchButton" type={type} onClick={onClick}>
    {text}
  </button>
);

export default AdminPanelSearchButton;
