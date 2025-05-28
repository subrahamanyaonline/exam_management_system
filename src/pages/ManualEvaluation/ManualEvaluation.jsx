import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck, FaCommentDots, FaArrowRight } from 'react-icons/fa';
import './ManualEvaluation.css';
import Chatbot from '../Chatbot/Chatbot';

function ManualEvaluation() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('testId');

  const [submissions, setSubmissions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState({});
  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedSubmissions = JSON.parse(sessionStorage.getItem('submittedTests')) || [];
    const testSubmissions = storedSubmissions.filter((submission) => submission.testId === testId);
    setSubmissions(testSubmissions);
    setIsLoading(false);
  }, [testId]);

  const handleScoreChange = (questionIndex, value) => {
    setScores((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleCommentChange = (questionIndex, value) => {
    setComments((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleSave = () => {
    const updatedSubmissions = submissions.map((submission, index) =>
      index === currentIndex
        ? {
            ...submission,
            questions: submission.questions.map((q, idx) => ({
              ...q,
              teacherScore: scores[idx] || q.obtained,
              teacherComment: comments[idx] || '',
            })),
          }
        : submission
    );
    sessionStorage.setItem('submittedTests', JSON.stringify(updatedSubmissions));
    alert('Evaluation saved successfully!');
  };

  const moveToNext = () => {
    if (currentIndex < submissions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setScores({});
      setComments({});
    } else {
      alert('You have evaluated all the submissions.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading submissions...</div>;
  }

  if (submissions.length === 0) {
    return <div className="no-submissions">No submissions available for this test.</div>;
  }

  const currentSubmission = submissions[currentIndex];

  return (
    <div className="manual-evaluation-container">
      <header className="evaluation-header">
        <h4 style={{paddingBottom:"6px"}}> Evaluation Portal</h4>
<p style={{ fontSize: '14px', display: 'flex',justifyContent:"center", gap: '20px' }}>
    <span><strong>Test Name:</strong>   {currentSubmission.testName}</span>
  <span><strong>Total Score:</strong> {currentSubmission.totalScore}</span>

  <span><strong>Student Name:</strong> {currentSubmission.student.name}</span>
  <span><strong>Roll Number:</strong> {currentSubmission.student.rollNumber}</span>

</p>
      </header>
      <div className="evaluation-body">
        <div className="questions-list">
          {currentSubmission.questions.map((q, index) => (
            <div className="question-card" key={index}>
              <h4>Question {index + 1}: {q.question}</h4>
              <p>
                <strong>Student Answer:</strong> {q.studentAnswer || 'Not Answered'}
              </p>
              <p>
                <strong>Correct Answer:</strong> {q.correctAnswer}
              </p>
              <div className="input-group">
                <label>Score:</label>
                <input
                  type="number"
                  min="0"
                  max={q.score}
                  value={scores[index] || q.obtained}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  placeholder="Enter score"
                />
              </div>
              <div className="input-group">
                <label>Comment:</label>
                <textarea
                  rows="2"
                  placeholder="Add a comment (optional)"
                  value={comments[index] || ''}
                  onChange={(e) => handleCommentChange(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="evaluation-actions">
        <button className="save-btn" onClick={handleSave}>
          Save Evaluation <FaCheck />
        </button>
        <button
          className="next-btn"
          onClick={moveToNext}
          disabled={currentIndex >= submissions.length - 1}
        >
          Next Submission <FaArrowRight />
        </button>
      </footer>      <Chatbot />

    </div>
  );
}

export default ManualEvaluation;
