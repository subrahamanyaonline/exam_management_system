import React, { useEffect, useState } from 'react';
import { FaUsers, FaChalkboardTeacher, FaUserGraduate, FaPlus, FaTrash } from 'react-icons/fa';
import './AdminHome.css'; // Create a new modern CSS file
import Chatbot from '../Chatbot/Chatbot';

const AdminHomePage = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ students: 0, teachers: 0, departments: {}, semesters: {} });
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', password: '', department: '', semester: '' ,rollNumber:''});

  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("users")) || [];
    const filtered = stored.filter(user => user.role !== 'admin');
    setUsers(filtered);
    calculateStats(filtered);
  }, []);

  const calculateStats = (users) => {
    const stats = {
      students: 0,
      teachers: 0,
      departments: {},
      semesters: {}
    };

    users.forEach(user => {
      if (user.role === 'student') {
        stats.students++;
        const dept = user.branch;
        const sem = user.semester;

        if (dept) stats.departments[dept] = (stats.departments[dept] || 0) + 1;
        if (sem) stats.semesters[`${dept || 'Unknown'}-Sem${sem}`] = (stats.semesters[`${dept || 'Unknown'}-Sem${sem}`] || 0) + 1;

      } else if (user.role === 'teacher') {
        stats.teachers++;
        const dept = user.department;
        if (dept) stats.departments[dept] = (stats.departments[dept] || 0) + 1;
      }
    });

    setStats(stats);
  };

  const updateSessionUsers = (updated) => {
    const original = JSON.parse(sessionStorage.getItem("users")) || [];
    const withAdmin = original.filter(u => u.role === 'admin').concat(updated);
    sessionStorage.setItem("users", JSON.stringify(withAdmin));
    setUsers(updated);
    calculateStats(updated);
  };

  const handleAddUser = () => {
    const userId = `user_${Date.now()}_${Math.floor(Math.random() * 9999)}`;
    const user = { userId, ...newUser };
    updateSessionUsers([...users, user]);
    setNewUser({ name: '', email: '', role: 'student', password: '', department: '', semester: '',rollNumber:'' });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure to remove this user?")) {
      const updated = users.filter(u => u.userId !== id);
      updateSessionUsers(updated);
    }
  };

  return (
    <div className="admin-homepage">
      <header className="admin-header">
        <h2><FaUsers /> Admin Dashboard</h2>
      </header>

      <section className="kpi-cards">
        <div className="card kpi-card">
          <FaUsers className="icon purple" />
          <h3>Total Users</h3>
          <p>{users.length}</p>
        </div>
        <div className="card kpi-card">
          <FaChalkboardTeacher className="icon green" />
          <h3>Total Teachers</h3>
          <p>{stats.teachers}</p>
        </div>
        <div className="card kpi-card">
          <FaUserGraduate className="icon blue" />
          <h3>Total Students</h3>
          <p>{stats.students}</p>
        </div>
      </section>

      

      <section className="user-management">
        <h2>User Management</h2>
        <div className="add-user-form">
          <input placeholder="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <input placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
          <input placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
          <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          {(newUser.role === 'student' || newUser.role === 'teacher') && (
            <input placeholder="Department" value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} />
          )}
          {newUser.role === 'student' && (
            <>
            <input style={{width:"130px"}} placeholder="Roll No" value={newUser.rollNumber} onChange={(e) => setNewUser({ ...newUser, rollNumber: e.target.value })} />

                        <input style={{width:"130px"}} placeholder="Semester" value={newUser.semester} onChange={(e) => setNewUser({ ...newUser, semester: e.target.value })} />

            </>

          )}
          <button className="btn-success" onClick={handleAddUser}><FaPlus /> Add</button>
        </div>

        <div className="users-table">
          <h3>Registered Users</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Semester</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.branch || user.department || '-'}</td>
                  <td>{user.semester || '-'}</td>
                  <td><button className="btn-danger" onClick={() => handleDeleteUser(user.userId)}><FaTrash /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <br/>
      <br/>

      <Chatbot />
    </div>
  );
};

export default AdminHomePage;
