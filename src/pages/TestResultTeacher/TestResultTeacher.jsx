import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { FaChartBar, FaEye, FaTimesCircle } from 'react-icons/fa';
import './TestResultTeacher.css';

const COLORS = ['#28a745', '#dc3545', '#ffc107', '#17a2b8'];

const mockData = {
  testName: 'Math Midterm',
  date: '2025-05-10',
  totalScore: 20,
  class: '10A',
  students: [
    {
      name: 'John Doe',
      rollNumber: '12345',
      obtainedScore: 17,
      percentage: 85,
      questions: [
        { question: '2+2?', answer: '4', score: 5, obtained: 5 },
        { question: '3*3?', answer: '9', score: 5, obtained: 5 },
        { question: '5-2?', answer: '3', score: 10, obtained: 7 },
      ],
    },
    {
      name: 'Jane Smith',
      rollNumber: '12346',
      obtainedScore: 14,
      percentage: 70,
      questions: [
        { question: '2+2?', answer: '4', score: 5, obtained: 5 },
        { question: '3*3?', answer: '6', score: 5, obtained: 2 },
        { question: '5-2?', answer: '3', score: 10, obtained: 7 },
      ],
    },
    {
      name: 'Tom Lee',
      rollNumber: '12347',
      obtainedScore: 10,
      percentage: 50,
      questions: [
        { question: '2+2?', answer: '3', score: 5, obtained: 2 },
        { question: '3*3?', answer: '9', score: 5, obtained: 5 },
        { question: '5-2?', answer: '5', score: 10, obtained: 3 },
      ],
    },
  ],
};

function TeacherTestResults() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const average = (
    mockData.students.reduce((acc, s) => acc + s.percentage, 0) / mockData.students.length
  ).toFixed(2);

  const barChartData = mockData.students.map(s => ({
    name: s.name,
    Score: s.obtainedScore,
  }));

  const pieData = [
    { name: 'Above Avg', value: mockData.students.filter(s => s.percentage > average).length },
    { name: 'Below Avg', value: mockData.students.filter(s => s.percentage <= average).length },
  ];

  const scoreRanges = [0, 5, 10, 15, 20];
  const scoreDistribution = scoreRanges.map((min, i) => {
    const max = min + 4;
    return {
      range: `${min}-${max}`,
      count: mockData.students.filter(s => s.obtainedScore >= min && s.obtainedScore <= max).length,
    };
  });

  const questionAverageData = mockData.students[0].questions.map((_, i) => {
    const avg = (
      mockData.students.reduce((sum, s) => sum + s.questions[i].obtained, 0) / mockData.students.length
    ).toFixed(2);
    return {
      question: `Q${i + 1}`,
      avgScore: parseFloat(avg),
    };
  });

  return (
    <div className="teacher-results-container">
      <header className="results-header">
        <h2><FaChartBar /> Results Overview: {mockData.testName}</h2>
        <p><strong>Class:</strong> {mockData.class} &nbsp; | &nbsp; <strong>Date:</strong> {mockData.date}</p>
        <p><strong>Average Class Score:</strong> {average}%</p>
      </header>

      <section className="charts-section">
        <div className="chart-card">
          <h4>Individual Scores</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Score" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>Performance Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>Score Range Distribution</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={scoreDistribution}>
              <XAxis dataKey="range" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#17a2b8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h4>Question-wise Average Score</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={questionAverageData}>
              <XAxis dataKey="question" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgScore" fill="#ffc107" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="results-table-section">
        <h4>Student-wise  Results</h4>
        <br/>
        
        <table className="results-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.students.map((student, idx) => (
              <tr key={idx}>
                <td>{student.name}</td>
                <td>{student.rollNumber}</td>
                <td>{student.obtainedScore}/{mockData.totalScore}</td>
                <td>{student.percentage}%</td>
                <td>
                  <button className="view-btn" onClick={() => setSelectedStudent(student)}><FaEye /> View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <br/>
      <br/>

      {selectedStudent && (
        <div className="student-modal">
          <div className="modal-overlay" onClick={() => setSelectedStudent(null)} />
          <div className="modal-content">
            <div className="modal-header">
              <h3>Details for {selectedStudent.name}</h3>
              <button onClick={() => setSelectedStudent(null)}><FaTimesCircle /></button>
            </div>
            <div className="modal-body">
              {selectedStudent.questions.map((q, i) => (
                <div key={i} className="question-block">
                  <p><strong>Q{i + 1}:</strong> {q.question}</p>
                  <p><strong>Student Answer:</strong> {q.answer}</p>
                  <p style={{ color: q.obtained === q.score ? 'green' : 'red' }}>
                    <strong>Score:</strong> {q.obtained}/{q.score}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherTestResults;
