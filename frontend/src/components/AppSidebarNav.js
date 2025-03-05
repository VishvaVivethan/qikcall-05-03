import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { CBadge, CNavLink, CSidebarNav, CNavItem, CNavGroup, CNavTitle } from '@coreui/react';

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge) => (
    <>
      {icon && <span className="nav-icon">{icon}</span>}
      {name}
      {badge && <CBadge color={badge.color} className="ms-auto">{badge.text}</CBadge>}
    </>
  );

  const navItem = (item, index) => {
    const { name, badge, icon, to } = item;
    return (
      <CNavItem key={index}>
        {to ? (
          <CNavLink as={NavLink} to={to} activeClassName="active">
            {navLink(name, icon, badge)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge)
        )}
      </CNavItem>
    );
  };

  const navGroup = (item, index) => {
    const { name, icon, items } = item;
    return (
      <CNavGroup key={index} toggler={navLink(name, icon)}>
        {items.map((childItem, childIndex) => (
          childItem.items ? navGroup(childItem, childIndex) : navItem(childItem, childIndex)
        ))}
      </CNavGroup>
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
