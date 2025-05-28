import React, { useState, useEffect } from 'react';
import {
  FaTrashAlt,
  FaPlusCircle,
  FaCheck,
  FaClock,
  FaFileAlt,
  FaClipboardList,
  FaEdit
} from 'react-icons/fa';
import './UpdateTest.css';

function UpdateTest({ initialTestData, onUpdate, onCancel }) {
  const [testName, setTestName] = useState('');
  const [testDuration, setTestDuration] = useState('');
  const [totalScore, setTotalScore] = useState('');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (initialTestData) {
      setTestName(initialTestData.testName || '');
      setTestDuration(initialTestData.testDuration || '');
      setTotalScore(initialTestData.totalScore || '');
      setQuestions(initialTestData.questions || []);
    }
  }, [initialTestData]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      {
        question: '',
        type: 'Multiple Choice',
        options: ['', '', '', ''],
        correctAnswer: '',
        score: 0,
      }
    ]);
  };

  const deleteQuestion = (index) => {
    setQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = () => {
    if (!testName || !testDuration || !totalScore || questions.length === 0) {
      alert('Please complete all fields and ensure at least one question is added.');
      return;
    }

    const updatedTest = { testName, testDuration, totalScore, questions };
    onUpdate(updatedTest);
  };

  return (
    <div className="create-test-container">
      <h3 className="page-title"><FaEdit /> Update Test</h3>

      <div className="test-details">
        <div className="input-group">
          <label htmlFor="testName"><FaFileAlt /> Test Name</label>
          <input
            id="testName"
            type="text"
            placeholder="Enter the test title"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="testDuration"><FaClock /> Duration</label>
          <input
            id="testDuration"
            type="text"
            placeholder="e.g., 45 minutes"
            value={testDuration}
            onChange={(e) => setTestDuration(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="totalScore"><FaCheck /> Total Score</label>
          <input
            id="totalScore"
            type="number"
            placeholder="e.g., 100"
            value={totalScore}
            onChange={(e) => setTotalScore(e.target.value)}
          />
        </div>
      </div>

<div className="button-center">
  <button className="primary-btn1 compact-btn" onClick={addQuestion}>
    <FaPlusCircle /> Add Question
  </button>
</div>


      {questions.map((q, index) => (
        <div className="question-card" key={index}>
          <div className="question-header">
            <h4>Question {index + 1}</h4>
            
              <FaTrashAlt               className="icon-btn danger"
 onClick={() => deleteQuestion(index)}/>
          </div>

          <input
            type="text"
            placeholder="Enter your question here"
            value={q.question}
            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
          />

          <div className="input-group">
            <label>Question Type</label>
            <select
              value={q.type}
              onChange={(e) => handleQuestionChange(index, 'type', e.target.value)}
            >
              <option>Multiple Choice</option>
              <option>True/False</option>
              <option>Short Answer</option>
            </select>
          </div>

          {q.type === 'Multiple Choice' && (
            <div className="options-group">
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, i, e.target.value)}
                />
              ))}
              <input
                type="text"
                placeholder="Correct Answer"
                value={q.correctAnswer}
                onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
              />
            </div>
          )}

          {q.type === 'True/False' && (
            <select
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            >
              <option value="">Select correct answer</option>
              <option value="True">True</option>
              <option value="False">False</option>
            </select>
          )}

          {q.type === 'Short Answer' && (
            <input
              type="text"
              placeholder="Expected Answer"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
            />
          )}
        </div>
      ))}

<div className="action-buttons">
  <button style={{backgroundColor:"green"}}  className="primary-btn" onClick={handleSubmit}>
   Update Test
  </button>
  <button style={{backgroundColor:"#e83e3e"}} className="primary-btn" onClick={onCancel}>
    Cancel
  </button>
</div>

    </div>
  );
}

export default UpdateTest;
