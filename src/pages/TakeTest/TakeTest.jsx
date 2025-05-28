import React, { useState, useEffect, useRef } from 'react';
import { FaCamera, FaClock, FaFileAlt } from 'react-icons/fa';
import './TakeTest.css';
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

function TakeTest() {

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('testId');

const Navigate = useNavigate();
  const [questions,setQuestions] = useState([]);

  
      useEffect(() => {
        const savedTestdata = JSON.parse(sessionStorage.getItem('testsData'));
        if (savedTestdata) {
          const test = savedTestdata.find(t => t.id === testId);
         setQuestions(test.questions || []);
        }
      }, []);
  
  const [studentInfo] = useState(JSON.parse(sessionStorage.getItem('currentUser')));

  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(30 * 60); // 30 minutes in seconds
  const videoRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch(() => {
          alert('Video recording is required for this test. Please enable your camera.');
        });
    }
  }, []);

  const handleAnswerChange = (qIndex, value) => {
    setAnswers((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const handleCancel = () => {
    Navigate("/student-home");
  }

const handleSubmit = () => {
  const savedTestdata = JSON.parse(sessionStorage.getItem('testsData'));
  const test = savedTestdata?.find(t => t.id === testId);

  if (!test) {
    alert("Test data not found!");
    return;
  }

  let obtainedScore = 0;

  const evaluatedQuestions = test.questions.map((q, index) => {
    const studentAnswer = answers[index];
    let scoreEarned = 0;

    if (q.type === 'Multiple Choice' || q.type === 'True/False') {
      if (studentAnswer === q.correctAnswer) {
        scoreEarned = parseInt(q.score);
      }
    } else if (q.type === 'Short Answer') {
      // For now, give partial score if short answer is non-empty (you can improve this logic)
      scoreEarned = studentAnswer?.trim() ? Math.floor(parseInt(q.score) / 2) : 0;
    }

    obtainedScore += scoreEarned;

    return {
      question: q.question,
      correctAnswer: q.correctAnswer,
      studentAnswer: studentAnswer || '',
      score: parseInt(q.score),
      obtained: scoreEarned,
    };

    
  });

  const percentage = test.totalScore > 0 ? Math.round((obtainedScore / test.totalScore) * 100) : 0;

  const testResult = {
    testId: test.id,
    testName: test.name,
    totalScore: parseInt(test.totalScore),
    obtainedScore,
    percentage,
    student: studentInfo,
    timestamp: new Date().toISOString(),
    questions: evaluatedQuestions
  };

  // Save result to sessionStorage
  const previousSubmissions = JSON.parse(sessionStorage.getItem('submittedTests')) || [];

// Remove any previous submission with the same testId
const filteredSubmissions = previousSubmissions.filter(sub => sub.testId !== test.id || sub.student.userId !== studentInfo.userId);

  const updatedSubmissions = [...filteredSubmissions, testResult];
  sessionStorage.setItem('submittedTests', JSON.stringify(updatedSubmissions));

  console.log('Evaluated Test Result:', testResult);
  alert('Test submitted and evaluated successfully!');
      Navigate("/student-home");

};


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isTimeCritical = timer < 5 * 60; // Less than 5 minutes

  return (
    <div className="take-test-page">
      <div className="timer-header">
        <h3>
          <FaFileAlt /> Test: Sample Test
        </h3>
        <div className={`timer ${isTimeCritical ? 'critical' : ''}`}>
          <FaClock /> Time Left: {formatTime(timer)}
        </div>
      </div>
      <div className="main-content">
        <div className="video-section">
          <div className="video-box">
            <video ref={videoRef} autoPlay muted className="video-stream" />
            <p className="recording-text">
              <FaCamera /> Camera & Microphone recording in progress...
            </p>
            {/* Student Information Section */}
            <br/>
            <div>
              <p><strong>Name:</strong> {studentInfo.name}</p>
              <p><strong>Roll Number:</strong> {studentInfo.rollNumber}</p>
              {/* <p><strong>Branch:</strong> {studentInfo.branch}</p>
              <p><strong>Semester:</strong> {studentInfo.semester}</p> */}
            </div>
          </div>
        </div>
        <div className="questions-section">
          {questions.map((q, index) => (
            <div className="question-card" key={index}>
              <div className="question-header">
                <h4>Question {index + 1}: {q.question}</h4>
                <span className="question-score">Score: {q.score}</span>
              </div>
              {q.type === 'Multiple Choice' && (
                <div className="options">
                  {q.options.map((option, optIndex) => (
                    <label key={optIndex}>
                      <input
                        style={{ marginRight: '10px' }}
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {q.type === 'True/False' && (
                <div className="options">
                  {["True","False"].map((option, optIndex) => (
                    <label key={optIndex}>
                      <input
                        style={{ marginRight: '10px' }}
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
              {q.type === 'Short Answer' && (
                <textarea
                  rows="3"
                  placeholder="Type your answer here..."
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              )}
            </div>
          ))}
             <div style={{ display: 'flex', justifyContent: 'flex-end',padding: '20px',gap:"10px" }}>
  
    <button
    className="submit-btn"
    onClick={handleCancel}
    style={{ width: "150px",background:"red",color:"white" }}
  >
    Cancel
  </button>
  <button
    className="submit-btn"
    onClick={handleSubmit}
    disabled={timer === 0}
    style={{ width: "150px" }}
  >
    Submit Test
  </button>

  
</div>
        </div>

      
      </div>
      

    </div>
  );
}

export default TakeTest;
