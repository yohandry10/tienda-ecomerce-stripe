// src/components/layout/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div style={{ width: '200px' }}>
      <List>
        <ListItem button component={Link} to="/admin/products">
          <ListItemText primary="Productos" />
        </ListItem>
        <ListItem button component={Link} to="/admin/orders">
          <ListItemText primary="Pedidos" />
        </ListItem>
        <ListItem button component={Link} to="/admin/users">
          <ListItemText primary="Usuarios" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;
