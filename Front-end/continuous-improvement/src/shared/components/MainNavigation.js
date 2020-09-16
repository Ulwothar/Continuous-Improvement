import React from 'react';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import MainHeader from './MainHeader';

const MainNavigation = () => {
  return (
    <MainHeader>
      <h1 className="header_title">Continuous Improvement</h1>
      <nav className="main_menu">
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
