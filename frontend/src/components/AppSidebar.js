import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Collapse, ListItemButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import logo from '../assets/logo/recent2.png';
import {
  Dashboard as DashboardIcon,
  Category as CategoryIcon,
  Work as WorkIcon,
  Storefront as StorefrontIcon,
  Star as StarIcon,
  ErrorOutline as ErrorIcon,
  BusinessCenter as BusinessCenterIcon,
} from '@mui/icons-material';

// Sidebar navigation items
const navigation = [
  {
    name: 'Dashboard',
    to: '/dashboard',
    icon: <DashboardIcon />,
  },
  {
    name: 'User Details',
    icon: <BusinessCenterIcon />,
    items: [
      { name: 'Customer', to: '/admin/customer', icon: <WorkIcon /> },
      { name: 'Freelancer', to: '/admin/freelancer', icon: <WorkIcon /> },
      { name: 'Businessman', to: '/admin/businessman', icon: <WorkIcon /> },
    ],
  },
  {
    name: 'Features',
    icon: <CategoryIcon />,
    items: [
      { name: 'Categories', to: '/admin/category', icon: <CategoryIcon /> },
      { name: 'Services', to: '/admin/services', icon: <StorefrontIcon /> },
      { name: 'Advertisement', to: '/admin/advertise', icon: <StorefrontIcon /> },
      { name: 'Today Offer', to: '/admin/offer', icon: <StorefrontIcon /> },
      { name: 'Biz-sales', to: '/admin/sales', icon: <StorefrontIcon /> },
     
    ],
  },
  // {
  //   name: 'Logout',
  //   to: '/admin/logout',
  //   icon: <StarIcon />,
  // },
];

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppSidebar = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);

  const toggleDrawer = (visible) => {
    dispatch({ type: 'set', sidebarShow: visible });
  };

  const handleToggleUserDetails = () => {
    setOpenUserDetails(!openUserDetails);
  };

  const handleToggleFeatures = () => {
    setOpenFeatures(!openFeatures);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={sidebarShow}
      onClose={() => toggleDrawer(false)}
      sx={{
        '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', backgroundColor: '#2d2859', color: '#fff' },
      }}
    >
      <DrawerHeader>
        <img src={logo} height={32} alt="Logo" />
        <IconButton onClick={() => toggleDrawer(false)} sx={{ color: '#fff' }}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {navigation.map((item, index) => (
          item.items ? (
            <React.Fragment key={index}>
              <ListItemButton onClick={item.name === 'User Details' ? handleToggleUserDetails : handleToggleFeatures}>
                <ListItemIcon sx={{ color: '#fff' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ color: '#fff' }} />
                {item.name === 'User Details' ? (openUserDetails ? <ExpandLess /> : <ExpandMore />) : (openFeatures ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
              <Collapse in={item.name === 'User Details' ? openUserDetails : openFeatures} timeout="auto" unmountOnExit>
                {item.items.map((subItem, subIndex) => (
                  <ListItem
                    button
                    key={subIndex}
                    component={NavLink}
                    to={subItem.to}
                    sx={{ pl: 4, color: '#fff', textDecoration: 'none' }}
                  >
                    <ListItemIcon sx={{ color: '#fff' }}>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.name} />
                  </ListItem>
                ))}
              </Collapse>
              <Divider />
            </React.Fragment>
          ) : (
            <ListItem
              button
              key={index}
              component={NavLink}
              to={item.to}
              sx={{ color: '#fff', textDecoration: 'none' }}
            >
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          )
        ))}
      </List>
    </Drawer>
  );
};

export default React.memo(AppSidebar);
