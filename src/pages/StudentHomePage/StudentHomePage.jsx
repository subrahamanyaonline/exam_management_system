import React, { useState, useEffect } from 'react';
import {
  FaClipboardList, FaBook, FaClock, FaUsers, FaCommentDots,
  FaEdit,
  FaEye
} from 'react-icons/fa';
import '../TeacherHome/TeacherHomePage.css'; // Reuse existing styles
import Chatbot from '../Chatbot/Chatbot';
import { useNavigate } from 'react-router-dom';

const StudentHomePage = () => {
  const [tests, setTests] = useState([  ]);

  const [commentPopup, setCommentPopup] = useState({ visible: false, testId: null });
  const [commentText, setCommentText] = useState('');
 const navigate = useNavigate();
  const totalAssigned = tests.length;
  const totalAttempted = tests.filter(t => t.studentsAttempted > 0).length;

  const handleWriteTest = (testId) => {
  navigate(`/take-test?testId=${testId}`);
  };

  const handleViewResults = (testId) => {
  navigate(`/test-results?testId=${testId}`);
  };
  
      useEffect(() => {
        const savedTestdata = JSON.parse(sessionStorage.getItem('testsData'));
        if (savedTestdata) {
         setTests(savedTestdata);
        }
      }, []);
  
  
  

  const handleOpenComment = (testId) => {
    setCommentPopup({ visible: true, testId });
    setCommentText('');
  };

  const handleSubmitComment = () => {
    if (commentText.trim()) {
      alert(`Comment submitted for Test ID ${commentPopup.testId}: "${commentText}"`);
      // In real app, send to backend here
      setCommentPopup({ visible: false, testId: null });
    } else {
      alert("Please enter a comment before submitting.");
    }
  };

  return (
    <div className="teacher-homepage">
      <header className="teacher-header">
        <h1><FaClipboardList style={{fontSize:"1.6rem"}} className="header-icon" /> Student Dashboard</h1>
      </header>

      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="card stat-card">
          <h3>Total Tests Assigned</h3>
          <p>{totalAssigned}</p>
        </div>
        <div className="card stat-card">
          <h3>Tests Attempted</h3>
          <p>{totalAttempted}</p>
        </div>
         <div className="card stat-card">
          <h3>Results Published</h3>
          <p>{1}</p>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="tests-section">
        <h3>Assigned Tests</h3>
        <div className="tests-container">
          {tests.map((test) => (
            <div  key={test.id} className="test-card">
              <h3 style={{marginBottom:10}}><FaBook style={{fontSize:"1.2rem"}} className="icon green" /> {test.name}</h3>
              <p style={{marginBottom:5}} ><FaClock  className="icon yellow" /> Duration: {test.duration}</p>
              <p>Total Score: {test.totalScore}</p>
              <div className="card-actions">
                <button className="btn-info" onClick={() => handleWriteTest(test.id)}>Write Test <FaEdit/> </button>
                <button className="btn-secondary" onClick={() => handleViewResults(test.id)}> Results<br/>  <FaEye/></button>
                <button className="btn-warning" onClick={() => handleOpenComment(test.id)}>Comment <FaCommentDots /> </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comment Popup */}
      {commentPopup.visible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Comment on Test</h3>
            <textarea
              rows="5"
              placeholder="Write your correction or comment here..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="popup-actions">
              <button className="btn-secondary" onClick={() => setCommentPopup({ visible: false, testId: null })}>Cancel</button>
              <button className="btn-success" onClick={handleSubmitComment}>Submit</button>
            </div>
          </div>
        </div>
      )}

      <Chatbot />
    </div>
  );
};

export default StudentHomePage;
