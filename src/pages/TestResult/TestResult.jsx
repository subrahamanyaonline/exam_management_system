// Enhanced TestResults Component
import React, { useState, useEffect } from 'react';
import { FaDownload, FaChartBar, FaBackward } from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import './TestResults.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TestResults() {
  const [showAnswers, setShowAnswers] = useState(false);
  const [testResult, setTestResult] = useState(null); // initially null

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const testId = queryParams.get('testId');
  const navigate = useNavigate();

   const [studentInfo] = useState(JSON.parse(sessionStorage.getItem('currentUser')));
 

  useEffect(() => {
    const savedTestdata = JSON.parse(sessionStorage.getItem('submittedTests'));
    if (savedTestdata) {
      const test = savedTestdata.find(t => t.testId === testId); // NOTE: use 'testId', not 'id'
      if (test) {
        setTestResult(test);
      }
    }
  }, [testId]);

  if (!testResult || !testResult.questions) {
    return <div className="loading">Loading test results...</div>;
  }

  const performanceData = testResult.questions.map((q, index) => ({
    name: `Q${index + 1}`,
    Total: q.score,
    Obtained: q.obtained,
  }));

  const pieData = [
    { name: 'Correct', value: testResult.obtainedScore || 0 },
    { name: 'Incorrect', value: (testResult.totalScore || 0) - (testResult.obtainedScore || 0) },
  ];

  const COLORS = ['#28a745', '#dc3545'];

  const handleDownloadReport = () => {
    const reportContent = `
Test Name: ${testResult.testName}
Student Name: ${studentInfo.name}
Roll Number: ${studentInfo.rollNumber}
Class: ${studentInfo.class}
Total Score: ${testResult.totalScore}
Obtained Score: ${testResult.obtainedScore}
Percentage: ${testResult.percentage}%
    `;
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'test_result.txt';
    link.click();
  };

  const handleBack = () => {
   navigate("/student-home");
  };
  return (
    <div className="test-results-page">
      <header className="results-header1">
        <h3><FaChartBar /> Test Results: {testResult.testName}</h3>
      </header>

      <div style={{display:'flex',justifyContent:"flex-end", gap:"20px"}}>
        <button style={{width:"unset",padding:8,fontSize:12,marginBottom:0}} onClick={handleDownloadReport}>
          <FaDownload /> Download
        </button>
        <button style={{width:"unset",padding:8,fontSize:12,marginBottom:0}}  onClick={handleBack}>
          <FaBackward /> Back
        </button>
      </div>

      <div className="student-info">
        <p><strong>Name:</strong> {studentInfo.name}</p>
        <p><strong>Roll Number:</strong> {studentInfo.rollNumber}</p>
        <p><strong>Branch:</strong> {studentInfo.branch}</p>
                <p><strong>Semester:</strong> {studentInfo.semester}</p>

      </div>

      <div className="results-summary">
        <p><strong>Total Score:</strong> {testResult.totalScore}</p>
        <p><strong>Obtained Score:</strong> {testResult.obtainedScore}</p>
        <p><strong>Percentage:</strong> {testResult.percentage}%</p>
        <button className="toggle-answers-btn" onClick={() => setShowAnswers(!showAnswers)}>
          {showAnswers ? 'Hide' : 'Show'} Student Answers
        </button>
        
      </div>

      {showAnswers && (
        <div className="answers-section">
          <h3>Student Answers</h3>
          {testResult.questions.map((q, i) => (
            <div key={i} className="answer-block">
              <p><strong>Q{i + 1}: {q.question}</strong></p>
              <p><strong>Student Answer:</strong> {q.studentAnswer}</p>
            <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>

              <p><strong>Score:</strong> {q.obtained}/{q.score}</p>
            </div>
          ))}
        </div>
      )}

      <h3> Result Analytics: {testResult.testName}</h3>

      <div className="graphs-section">
        <div className="graph-container">
          <h3>Performance per Question</h3>
          <BarChart width={500} height={300} data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Total" fill="#8884d8" />
            <Bar dataKey="Obtained" fill="#82ca9d" />
          </BarChart>
        </div>

        <div className="graph-container">
          <h3>Overall Performance</h3>
          <PieChart width={300} height={300}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="graph-container">
          <h3>Line Chart of Scores</h3>
          <LineChart width={500} height={300} data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Obtained" stroke="#8884d8" />
            <Line type="monotone" dataKey="Total" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="graph-container">
          <h3>Area Chart Insights</h3>
          <AreaChart width={500} height={300} data={performanceData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Obtained" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </div>
      </div>

      <br /><br />
    </div>
  );
}

export default TestResults;
