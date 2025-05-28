import React, { useState } from 'react';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Popover,
  Typography,
  Box,
  Button,
  Badge,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';

const TopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handlePopoverClose();
    navigate('/');
  };
const handleMessageclick = () => {
  navigate('/ems-integrated-chat');
}

  const ManageUserprofile = () => {
    handlePopoverClose();
    navigate('/profile');
  };

  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  const open = Boolean(anchorEl);
  const id = open ? 'user-popover' : undefined;

  if (location.pathname === '/') return null;

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        style={{
          zIndex: 1300,
          height: '55px',
          borderRadius: '10px',
        }}
      >
        <Toolbar sx={{ position: 'relative', height: '55px', px: 2 }}>
          
          {/* Center-Aligned Title */}
          <Box sx={{ position: 'absolute', left: 0, right: 0, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Exam Management System
            </Typography>
          </Box>

          {/* Right-Aligned Icons */}
          <Box sx={{ marginLeft: 'auto', display: 'flex', justifyContent: 'flex-end', gap: "10px" }}>
            <IconButton onClick={handleMessageclick} sx={{ width: "50px" }} size="large" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton sx={{ width: "50px" }} onClick={handleAvatarClick} color="inherit">
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>

        </Toolbar>
      </AppBar>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ mt: 1 }}
      >
        <Box sx={{ p: 2, minWidth: 220 }}>
          <Typography variant="subtitle1">
            <strong>User Name:</strong> {currentUser?.name}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {currentUser?.email}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Role:</strong> {currentUser?.role}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<AccountCircleIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
          <br /><br />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<AccountCircleIcon />}
            onClick={ManageUserprofile}
          >
            Manage Profile
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default TopNavbar;
