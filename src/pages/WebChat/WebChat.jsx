import React, { useState, useEffect, useRef } from 'react';
import './WebChat.css';
import { FaPaperPlane } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WebChat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState( JSON.parse(sessionStorage.getItem('chatMessages')) ||[]);
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const chatEndRef = useRef(null);

  // Load initial data from sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('currentUser'));
    setCurrentUser(user);

    const storedMessages = JSON.parse(sessionStorage.getItem('chatMessages')) || [];
    setMessages(storedMessages);

    setDepartment(sessionStorage.getItem('chatDepartment') || '');
    setSemester(sessionStorage.getItem('chatSemester') || '');
    setSearchTerm(sessionStorage.getItem('chatSearchTerm') || '');
    setMessage(sessionStorage.getItem('chatTyping') || '');
  }, []);

  // Persist messages and scroll
  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Persist UI states
  useEffect(() => {
    sessionStorage.setItem('chatDepartment', department);
  }, [department]);

  useEffect(() => {
    sessionStorage.setItem('chatSemester', semester);
  }, [semester]);

  useEffect(() => {
    sessionStorage.setItem('chatSearchTerm', searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    sessionStorage.setItem('chatTyping', message);
  }, [message]);

  const navigate = useNavigate();
  // Handle sending a message
  const handleSend = () => {
    if (!message.trim()) return;

    if (!department || !semester) {
      alert("Please select both Department and Semester before sending a message.");
      return;
    }

    const newMsg = {
      id: Date.now(),
      text: message,
      sender: currentUser?.name || 'Unknown',
      department,
      semester,
      role: currentUser?.role || 'student',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toDateString()
    };

    setMessages([...messages, newMsg]);
    setMessage('');
  };

  // Apply filters
  const filtered = messages.filter(
    (msg) =>
      (!department || msg.department === department) &&
      (!semester || msg.semester === semester) &&
      (msg.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.sender.toLowerCase().includes(searchTerm.toLowerCase()))
  );
const CloseChatwindow = () => {
    console.log(currentUser)
    if(currentUser.role === 'student'){
        navigate("/student-home");}
        else{
    navigate("/teacher-home");

        }
}
  // Group messages by date
  const renderMessagesByDate = () => {
    const grouped = filtered.reduce((acc, msg) => {
      acc[msg.date] = acc[msg.date] || [];
      acc[msg.date].push(msg);
      return acc;
    }, {});

    return Object.entries(grouped).map(([date, msgs]) => (
      <div key={date}>
        <div className="date-divider">{date}</div>
        {msgs.map((msg) => (
          <div
            key={msg.id}
            className={`message-card ${msg.role === 'teacher' ? 'teacher-msg' : 'student-msg'}`}
          >
            <div className="message-header">
              <span className="sender">{msg.sender} ({msg.role})</span>
              <span className="timestamp">{msg.time}</span>
            </div>
            <p className="message-text">{msg.text}</p>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h3>💬 EMS Integrated Chat</h3>
    
<IconButton style={{width:"unset"}} onClick={CloseChatwindow}>
  <CloseIcon sx={{ color: 'white' }} />
</IconButton>      </header>

      <div className="chat-controls">
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          <option value="CS">CS</option>
          <option value="EC">EC</option>
          <option value="ME">ME</option>
        </select>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="">All Semesters</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <input
          type="text"
          placeholder="🔍 Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <main className="chat-messages">
        {renderMessagesByDate()}
        <div ref={chatEndRef} />
      </main>

      <footer className="chat-footer">
        <input
          type="text"
          placeholder="✏️ Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button title="Send Message" onClick={handleSend}><FaPaperPlane /></button>
      </footer>
    </div>
  );
};

export default WebChat;
