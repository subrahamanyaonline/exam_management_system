import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import "./UserProfile.css";
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    role: '',
    bio: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    image: null,
  });

  // Load user data from sessionStorage on mount
  useEffect(() => {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser) {
      setProfile({
        fullName: currentUser.name || '',
        email: currentUser.email || '',
        role: currentUser.role || '',
        phone: currentUser.phone || '',
        dob: currentUser.dateOfBirth || '',
        bio: currentUser.bio || '',
        address: currentUser.address || '',
        gender: currentUser.gender || '',
        image: currentUser.image || null,
      });
      setPreviewImage(currentUser.image || null);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setProfile((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };
const handleSave = () => {
  const currentUserId = sessionStorage.getItem('currentUserId');

  // Get the current user from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || {};

  // Merge only updated fields, preserving existing ones
  const updatedUser = {
    ...currentUser,
    name: profile.fullName,
    email: profile.email,
    role: profile.role,
    phone: profile.phone,
    dateOfBirth: profile.dob,
    bio: profile.bio,
    address: profile.address,
    gender: profile.gender,
    image: profile.image,
  };

  // Update users list
  const users = JSON.parse(sessionStorage.getItem('users')) || [];
  const updatedUsers = users.map((user) =>
    user.userId === currentUserId ? { ...user, ...updatedUser } : user
  );

  // Save back to sessionStorage
  sessionStorage.setItem('users', JSON.stringify(updatedUsers));
  sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

  navigate('/student-home');
};

  return (
    <Container style={{ border: "none", width: "60%" }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          My Profile
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar src={previewImage} sx={{ width: 100, height: 100, mb: 2 }} />
          <Button variant="contained" component="label" size="small">
            Upload Photo
            <input hidden accept="image/*" type="file" onChange={handleImageUpload} />
          </Button>
        </Box>

        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              name="fullName"
              placeholder="Full Name"
              fullWidth
              value={profile.fullName}
              onChange={handleChange}
              sx={{ '& input': { border: 'none', outline: 'none' } }}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              name="email"
              placeholder="Email"
              fullWidth
              value={profile.email}
              InputProps={{ readOnly: true }}
              sx={{ '& input': { border: 'none', outline: 'none' } }}
            />
          </Grid>

          <Grid item md={2}>
            <TextField
              name="role"
              placeholder="Role"
              fullWidth
              value={profile.role}
              InputProps={{ readOnly: true }}
              sx={{ '& input': { border: 'none', outline: 'none' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="phone"
              placeholder="Phone Number"
              fullWidth
              value={profile.phone}
              onChange={handleChange}
              sx={{ '& input': { border: 'none', outline: 'none' } }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="dob"
              placeholder="Date of Birth"
              type="date"
              fullWidth
              value={profile.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={{ height: "10", width: "180px", '& input': { border: 'none', outline: 'none' } }}
              InputProps={{
                sx: {
                  padding: '4px',
                  height: '36px',
                  fontSize: '0.875rem',
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="address"
              placeholder="Address"
              fullWidth
              value={profile.address}
              onChange={handleChange}
              sx={{ '& input': { border: 'none', outline: 'none' } }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="bio"
              placeholder="Bio"
              fullWidth
              multiline
              minRows={2}
              maxRows={2}
              value={profile.bio}
              onChange={handleChange}
              sx={{ width: "250px", '& textarea': { border: 'none', outline: 'none' } }}
            />
          </Grid>

          <Grid item xs={12}></Grid>
        </Grid>

        <br />
        <Grid item md={12} xs={12} style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ width: "50%" }} color="primary" fullWidth onClick={handleSave}>
            Save Profile
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
