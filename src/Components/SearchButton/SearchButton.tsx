import React, { FC } from 'react';
import './styles.css';

type ButtonProps = {
  text: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

const SearchButton: FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button className="searchButton" type={type} onClick={onClick}>
    {text}
  </button>
);

export default SearchButton;
