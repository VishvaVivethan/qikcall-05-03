// nav.js
import React from 'react';
import CIcon from '@coreui/icons-react';
import {
  cilSpeedometer,
  cilPuzzle,
  cilStar,
  cilDescription,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard', // Path for the Dashboard
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'About Users',
  },
  {
    component: CNavGroup,
    name: 'User Details',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/admin/customer',
      },
      {
        component: CNavItem,
        name: 'Freelancer',
        to: '/admin/freelancer',
      },
      {
        component: CNavItem,
        name: 'Businessman',
        to: '/admin/businessman',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Edit Features',
  },
  {
    component: CNavGroup,
    name: 'Features',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Categories',
        to: '/admin/category',
      },
      {
        component: CNavItem,
        name: 'Services',
        to: '/admin/services',
      },
      {
        component: CNavItem,
        name: 'Advertisement',
        to: '/admin/advertise',
      },
      {
        component: CNavItem,
        name: 'Notification',
        to: '/admin/notification',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
];

export default _nav;
