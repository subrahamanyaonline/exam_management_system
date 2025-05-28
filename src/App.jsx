import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
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
  Grid,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Login from './pages/Login/Login.jsx';
import CreateTest from './pages/CreateTest/CreateTest.jsx';
import AssignTest from './pages/AssignTests/AssignTests.jsx';
import WriteTest from './pages/TakeTest/TakeTest.jsx';
import TestResults from './pages/TestResult/TestResult.jsx';
import TeacherHomePage from './pages/TeacherHome/TeacherHome.jsx';
import TeacherTestResults from './pages/TestResultTeacher/TestResultTeacher.jsx';
import StudentHomePage from './pages/StudentHomePage/StudentHomePage.jsx';
import UpdateTest from './pages/UpdateTest/UpdateTest.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import TopNavbar from './pages/TopNavBar/TopNavbar.jsx';
import AdminHome from './pages/AdminHome/AdminHome.jsx';
import ManualEvaluation from './pages/ManualEvaluation/ManualEvaluation.jsx';
import ChatComponent from './pages/WebChat/WebChat.jsx';
import AIEvaluation from './pages/AiEvaluation/AiEvaluation.jsx';
function App() {
  return (
    <Router>
      <TopNavbar />
      <Toolbar />
      <Grid container>
        <Grid item xs={12}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-test" element={<CreateTest />} />
            <Route path="/teacher-home" element={<TeacherHomePage />} />
            <Route path="/assign-test" element={<AssignTest />} />
            <Route path="/take-test" element={<WriteTest />} />
            <Route path="/test-results" element={<TestResults />} />
            <Route path="/student-home" element={<StudentHomePage />} />
                        <Route path="/update-test" element={<UpdateTest />} />
           
            <Route path="/test-results-teacher" element={<TeacherTestResults />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin-home" element={<AdminHome />} />
                        <Route path="/manual-evaluation" element={<ManualEvaluation />} />
                        <Route path="/ems-integrated-chat" element={<ChatComponent />} />
                        <Route path="/ai-evaluation" element={<AIEvaluation />} />


            
          </Routes>
        </Grid>
      </Grid>
    </Router>
  );
}

export default App;
