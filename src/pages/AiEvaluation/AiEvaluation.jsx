import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaCheck, FaArrowRight, FaRobot } from 'react-icons/fa';
import './AiEvaluation.css'; // Using same styling
import Chatbot from '../Chatbot/Chatbot';

function AIEvaluation() {
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

  const currentSubmission = submissions[currentIndex];

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

  // 💡 Simulated AI evaluation logic
  const handleAIEvaluate = () => {
    if (!currentSubmission) return;

    const aiScores = {};
    const aiComments = {};

    currentSubmission.questions.forEach((q, index) => {
      const answer = q.studentAnswer?.toLowerCase() || '';
      const correct = q.correctAnswer?.toLowerCase() || '';
      const maxScore = q.score;

      const isExactMatch = answer === correct;
      const isPartiallyCorrect = answer && correct && answer.includes(correct.split(' ')[0]);

      let score = 0;
      let comment = '';

      if (isExactMatch) {
        score = maxScore;
        comment = 'Excellent. Exact match.';
      } else if (isPartiallyCorrect) {
        score = Math.floor(maxScore / 2);
        comment = 'Partial answer. Needs improvement.';
      } else if (!answer) {
        comment = 'No answer provided.';
      } else {
        comment = 'Incorrect answer.';
      }

      aiScores[index] = score;
      aiComments[index] = comment;
    });

    setScores(aiScores);
    setComments(aiComments);
    alert('AI evaluation completed. You can review and adjust.');
  };

  if (isLoading) {
    return <div className="loading">Loading submissions...</div>;
  }

  if (submissions.length === 0) {
    return <div className="no-submissions">No submissions available for this test.</div>;
  }

  return (
    <div className="manual-evaluation-container">
      <header className="evaluation-header">
        <h4 style={{ paddingBottom: '6px' }}>AI Evaluation Portal</h4>
        <p style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <span><strong>Test Name:</strong> {currentSubmission.testName}</span>
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
              <p><strong>Student Answer:</strong> {q.studentAnswer || 'Not Answered'}</p>
              <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>

              <div className="input-group">
                <label>Score:</label>
                <input
                  type="number"
                  min="0"
                  max={q.score}
                  value={scores[index] || ''}
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
        <button className="next-btn" onClick={moveToNext}>
          Next Submission <FaArrowRight />
        </button>
        <button
          className="next-btn"
          style={{ backgroundColor: '#28a745' }}
          onClick={handleAIEvaluate}
        >
          Evaluate with AI <FaRobot />
        </button>
      </footer>

      <Chatbot />
    </div>
  );
}

export default AIEvaluation;
