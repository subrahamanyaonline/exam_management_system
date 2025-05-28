import React, { useState ,useEffect} from 'react';
import {
  FaPlusCircle, FaEdit, FaTrashAlt, FaBook,
  FaClock, FaClipboardList, FaUsers,
  FaClipboardCheck,
  FaChartLine,
  FaPlus,
  FaBrain
} from 'react-icons/fa';
import './TeacherHomePage.css';
import UpdateTest from '../UpdateTest/UpdateTest';
import Chatbot from '../Chatbot/Chatbot';
import { useNavigate } from 'react-router-dom';



const TeacherHomePage = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [className, setClassName] = useState('');
  const [editingTest, setEditingTest] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);
  const [branchName, setBranchName] = useState('');
 const [semester, setSemester] = useState('');

  const handleAssignTest = (testId) => {
    setSelectedTestId(testId);
    setShowPopup(true);
    
  };
  const handleViewResults = (testId) => {
    setSelectedTestId(testId);
    // setShowPopup(true);
    navigate(`/test-results-teacher`);
  };

    useEffect(() => {
      const savedTestdata = JSON.parse(sessionStorage.getItem('testsData'));
      if (savedTestdata) {
       setTests(savedTestdata);
      }
    }, []);



  const handlePopupSubmit = () => {
      const updatedTests = tests.map(t =>
    t.id === selectedTestId
      ? {
          ...t,
          assignedTo: [...(t.assignedTo || []), { branch: branchName, semester }],
        }
      : t
  );
  setTests(updatedTests);
  sessionStorage.setItem('testsData', JSON.stringify(updatedTests));
  
    alert(`Assigned Test ID: ${selectedTestId} to Branch: ${branchName} and Semester: ${semester}`);
    setShowPopup(false);
    setClassName('');
  };



const handleEditTest = (test) => {
  const mappedTest = {
    ...test,
    testName: test.name,
    testDuration: test.duration,
    questions: test.questions || []
  };
  setEditingTest(mappedTest);
};


const handleUpdateSubmit = (updatedTest) => {
  const updatedTests = tests.map(t =>
    t.id === editingTest.id
      ? {
          ...t,
          name: updatedTest.testName,
          duration: updatedTest.testDuration,
          totalScore: updatedTest.totalScore,
          questions: updatedTest.questions
        }
      : t
  );
  setTests(updatedTests);
  sessionStorage.setItem('testsData', JSON.stringify(updatedTests));

  setEditingTest(null);
  alert('Test updated successfully!');
};


  const handleCancelEdit = () => setEditingTest(null);

  const handleDeleteClick = (test) => {
    setTestToDelete(test);
    setShowDeletePopup(true);
  };
const confirmDelete = () => {
  // Remove from local state
  const updatedTests = tests.filter(t => t.id !== testToDelete.id);
  setTests(updatedTests);

  // Remove from sessionStorage
  sessionStorage.setItem('testsData', JSON.stringify(updatedTests));

  // Cleanup
  setShowDeletePopup(false);
  setTestToDelete(null);
  alert('Test deleted successfully!');
};

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setTestToDelete(null);
  };

  const handleMannualEvaluation = (testId) => {
    navigate(`/manual-evaluation?testId=${testId}`);
  }
  const handleAIEvaluation = (testId) => {
    navigate(`/ai-evaluation?testId=${testId}`);
  }


  const navigateToCreateTest = () => {
    navigate('/create-test');
  };

  const totalAssignedClasses = tests.reduce((sum, test) => sum + test.assignedTo.length, 0);
  const totalStudents = tests.reduce((sum, test) => sum + (test.studentsAttempted || 0), 0);

  return (
    <div className="teacher-homepage">
      <header className="teacher-header">
        <h1><FaClipboardList style={{fontSize:"1.6rem"}} className="header-icon" /> Teacher Dashboard</h1>
      </header>

      {/* Summary Cards */}
      <section className="summary-cards">
        <div className="card stat-card">
          <h3>Total Tests</h3>
          <p>{tests.length}</p>
        </div>
        <div className="card stat-card">
          <h3>Classes Assigned</h3>
          <p>{totalAssignedClasses}</p>
        </div>
        <div className="card stat-card">
          <h3>Manual Evaluations</h3>
          <p>{totalStudents}</p>
        </div>

         <div className="card stat-card">
          <h3>Auto Evaluation</h3>
          <p>{totalStudents}</p>
        </div>
      </section>

      {/* Tests Grid */}
      <section className="tests-section">
        <h3>Available Tests</h3>
<div style={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}> <button style={{ width:"unset",padding:10}} className="btn-primary" onClick={navigateToCreateTest}>
          <FaPlusCircle  /> Create Test
        </button></div>
         
        <div className="tests-container">
          {tests.map((test) => (
            <div key={test.id} className="test-card">
              <h3><FaBook className="icon green" /> {test.name}</h3>

              <p><FaClock className="icon yellow" /> Duration: {test.duration}</p>
              <p>Total Score: {test.totalScore}</p>
              <p>Assigned To: {test.assignedTo.length > 0 ? test.assignedTo[0].branch + "," + test.assignedTo[0].semester   : 'None'}</p>
              <p><FaUsers style={{fontSize:"1.5rem"}} className="icon blue" /> Students Attempted: {test.studentsAttempted}</p>
              <div className="card-actions">
                <button style={{background:"#28a745"}}  className="btn-success" title="Assign" onClick={() => handleAssignTest(test.id)}>Assign </button>
                <button title="Edit test" className="btn-warning" onClick={() => handleEditTest(test)}><FaEdit /></button>
                <button style={{background:"#c2185b"}} title="Delete test" className="btn-danger" onClick={() => handleDeleteClick(test)}><FaTrashAlt /></button>
                  <button title="View Results" className="btn-info" onClick={() => handleViewResults(test.id)}><FaChartLine/></button>
               
               {test.evaluationType === "Manual" && (<button title="Evaluate" className="btn-secondary" onClick={() => handleMannualEvaluation(test.id)}><FaClipboardCheck /></button>)}
               {test.evaluationType === "AI" && (<button title="Evaluate" className="btn-secondary" onClick={() => handleAIEvaluation(test.id)}><FaBrain /></button>)}

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Section */}
    

      {/* Assign Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Assign Test to Class</h3>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
            />
            <input
              type="text"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              placeholder="Enter semester name"
            />
            <div className="popup-actions">
              <button className="btn-secondary" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="btn-success" onClick={handlePopupSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete the test: <strong>{testToDelete.name}</strong>?</p>
            <div className="popup-actions">
              <button className="btn-secondary" onClick={cancelDelete}>Cancel</button>
              <button className="btn-danger" onClick={confirmDelete}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Test Section */}
    {editingTest && (
  <div className="popup-overlay">
      <UpdateTest
        initialTestData={editingTest}
        onUpdate={handleUpdateSubmit}
        onCancel={handleCancelEdit}
      />
  </div>
)}



          <Chatbot />

    </div>
  );
};

export default TeacherHomePage;
