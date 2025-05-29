import React, { useState, useEffect } from 'react'; 
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('student');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [rollNumber, setRollNumber] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const [department, setDepartment] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');

  const navigate = useNavigate();

  // Hardcoded admin user
  const adminUser = {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin User',
    userId: 'admin001'
  };

  // Email & phone validation
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => phone.length === 10 && !isNaN(phone);

  useEffect(() => {
    // Preload admin user if not in sessionStorage
    const existing = JSON.parse(sessionStorage.getItem('users')) || [];
    const adminExists = existing.some(u => u.email === adminUser.email && u.role === 'admin');
    if (!adminExists) {
      sessionStorage.setItem('users', JSON.stringify([...existing, adminUser]));
    }
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      alert('Email and password are required.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (role === 'admin') {
      if (email === adminUser.email && password === adminUser.password) {
        sessionStorage.setItem('currentUser', JSON.stringify(adminUser));
        sessionStorage.setItem('currentUserId', adminUser.userId);
        navigate('/admin-home');
        return;
      } else {
        alert('Invalid admin credentials.');
        return;
      }
    }

    const userData = JSON.parse(sessionStorage.getItem('users')) || [];
    const user = userData.find(user => user.email === email && user.password === password && user.role === role);

    if (!user) {
      alert('Invalid email or password');
      return;
    }

    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('currentUserId', user.userId);

    const existingData= sessionStorage.getItem('testsData')
    if (!existingData) {
      let testsData=  [
    {
        "id": "af87456b-87a1-412a-b2f4-d3f1d7b0b8e1",
        "name": "general-knowledge-test",
        "duration": "30",
        "evaluationType": "Automated",
        "totalScore": "40",
        "questions": [
            {
                "question": "Who was the first president of the United States?",
                "type": "Multiple Choice",
                "options": [
                    "George Washington",
                    "Abraham Lincoln",
                    "Thomas Jefferson",
                    "John Adams"
                ],
                "correctAnswer": "George Washington",
                "score": "10"
            },
            {
                "question": "Is the Earth the third planet from the Sun?",
                "type": "True/False",
                "options": [
                    "",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "True",
                "score": "10"
            },
            {
                "question": "Which country is known as the Land of the Rising Sun?",
                "type": "Multiple Choice",
                "options": [
                    "China",
                    "Japan",
                    "South Korea",
                    "India"
                ],
                "correctAnswer": "Japan",
                "score": "10"
            },
            {
                "question": "The Great Wall of China is located in which country?",
                "type": "Multiple Choice",
                "options": [
                    "China",
                    "India",
                    "Russia",
                    "Vietnam"
                ],
                "correctAnswer": "China",
                "score": "10"
            }
        ],
        "assignedClasses": [],
        "studentsAttempted": 0,
        "assignedTo": []
    },
    {
        "id": "a7289f1b-28c9-4569-927b-9cf34ed5c1f2",
        "name": "math-test",
        "duration": "30",
        "evaluationType": "Manual",
        "totalScore": "40",
        "questions": [
            {
                "question": "What is 9 * 7?",
                "type": "Multiple Choice",
                "options": [
                    "56",
                    "63",
                    "72",
                    "77"
                ],
                "correctAnswer": "63",
                "score": "10"
            },
            {
                "question": "What is the square root of 144?",
                "type": "Multiple Choice",
                "options": [
                    "12",
                    "14",
                    "16",
                    "18"
                ],
                "correctAnswer": "12",
                "score": "10"
            },
            {
                "question": "Is 21 a prime number?",
                "type": "True/False",
                "options": [
                    "",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "False",
                "score": "10"
            },
            {
                "question": "What is 15 + 25?",
                "type": "Multiple Choice",
                "options": [
                    "35",
                    "40",
                    "45",
                    "50"
                ],
                "correctAnswer": "40",
                "score": "10"
            }
        ],
        "assignedClasses": [],
        "studentsAttempted": 0,
        "assignedTo": []
    },
    {
        "id": "bc9a7851-b340-4cdb-b12f-e4bfe2676b7d",
        "name": "science-test",
        "duration": "45",
        "totalScore": "40",
        "evaluationType": "AI",
        "questions": [
            {
                "question": "What is the chemical symbol for water?",
                "type": "Multiple Choice",
                "options": [
                    "H2O",
                    "O2",
                    "CO2",
                    "HO"
                ],
                "correctAnswer": "H2O",
                "score": "10"
            },
            {
                "question": "Is the Sun a star?",
                "type": "True/False",
                "options": [
                    "",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "True",
                "score": "10"
            },
            {
                "question": "What is the center of an atom called?",
                "type": "Multiple Choice",
                "options": [
                    "Nucleus",
                    "Proton",
                    "Electron",
                    "Neutron"
                ],
                "correctAnswer": "Nucleus",
                "score": "10"
            },
            {
                "question": "Which gas do plants primarily absorb from the atmosphere for photosynthesis?",
                "type": "Multiple Choice",
                "options": [
                    "Oxygen",
                    "Carbon Dioxide",
                    "Nitrogen",
                    "Hydrogen"
                ],
                "correctAnswer": "Carbon Dioxide",
                "score": "10"
            }
        ],
        "assignedClasses": [],
        "studentsAttempted": 0,
        "assignedTo": []
    },
    {
        "id": "abf1a2ff-b33a-4710-8a28-1ef073563bd2",
        "name": "coding-test",
        "evaluationType": "Automated",
        "duration": "60",
        "totalScore": "40",
        "questions": [
            {
                "question": "Which of the following is the correct syntax to define a function in Python?",
                "type": "Multiple Choice",
                "options": [
                    "function myFunction() {}",
                    "def myFunction():",
                    "def myFunction[]",
                    "function:myFunction()"
                ],
                "correctAnswer": "def myFunction():",
                "score": "10"
            },
            {
                "question": "What is the output of the following Python code: print(2 + 3 * 2)?",
                "type": "Multiple Choice",
                "options": [
                    "8",
                    "10",
                    "12",
                    "6"
                ],
                "correctAnswer": "8",
                "score": "10"
            },
            {
                "question": "What keyword is used to define a class in Python?",
                "type": "Multiple Choice",
                "options": [
                    "class",
                    "def",
                    "struct",
                    "object"
                ],
                "correctAnswer": "class",
                "score": "10"
            },
            {
                "question": "Which of the following is a Python collection type?",
                "type": "Multiple Choice",
                "options": [
                    "List",
                    "Array",
                    "Set",
                    "Both List and Set"
                ],
                "correctAnswer": "Both List and Set",
                "score": "10"
            }
        ],
        "assignedClasses": [],
        "studentsAttempted": 0,
        "assignedTo": []
    },
    {
        "id": "d497dbf5-d953-49d9-b070-bb7226fa08be",
        "name": "chemistry-test",
        "duration": "45",
        "evaluationType": "Manual",
        "totalScore": "40",
        "questions": [
            {
                "question": "What is the chemical symbol for Sodium?",
                "type": "Multiple Choice",
                "options": [
                    "Na",
                    "So",
                    "S",
                    "Ne"
                ],
                "correctAnswer": "Na",
                "score": "10"
            },
            {
                "question": "What is the atomic number of Carbon?",
                "type": "Multiple Choice",
                "options": [
                    "6",
                    "12",
                    "8",
                    "14"
                ],
                "correctAnswer": "6",
                "score": "10"
            },
            {
                "question": "Is water a good conductor of electricity?",
                "type": "True/False",
                "options": [
                    "",
                    "",
                    "",
                    ""
                ],
                "correctAnswer": "False",
                "score": "10"
            },
            {
                "question": "Which of these elements is a noble gas?",
                "type": "Multiple Choice",
                "options": [
                    "Oxygen",
                    "Argon",
                    "Nitrogen",
                    "Hydrogen"
                ],
                "correctAnswer": "Argon",
                "score": "10"
            }
        ],
        "assignedClasses": [],
        "studentsAttempted": 0,
        "assignedTo": []
    }
]


  sessionStorage.setItem('testsData', JSON.stringify(testsData));
}

    

    if (role === 'student') {
      navigate('/student-home');
    } else if (role === 'teacher') {
      navigate('/teacher-home');
    }
  };

  const handleSignUp = () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email.');
      return;
    }

    if (!validatePhone(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userId = generateUserId();
    const commonData = {
      userId,
      name,
      email,
      phone,
      password,
      role
    };

    let newUser;

    if (role === 'student') {
      if (!rollNumber || !branch || !semester) {
        alert('All student fields are required.');
        return;
      }

      newUser = {
        ...commonData,
        rollNumber,
        branch,
        semester,
        dateOfBirth
      };
    } else if (role === 'teacher') {
      if (!employeeId || !department || !designation) {
        alert('All teacher fields are required.');
        return;
      }

      newUser = {
        ...commonData,
        employeeId,
        department,
        designation
      };
    }

    const existingUsers = JSON.parse(sessionStorage.getItem('users')) || [];
    existingUsers.push(newUser);
    sessionStorage.setItem('users', JSON.stringify(existingUsers));

    alert('User registered successfully!');
    setIsSignUp(false);
  };

  const generateUserId = () => `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  return (
    <div className="login-container">
      <div className="form-box">
           <div className="watermark">
  <p>Project : Exam Management System</p>
   <p>University : KLE Technological University</p>
      <p>Course : Bsc Industrial Track</p>

</div>

        {!isSignUp && <h3>Login</h3>}

        <div className="role-selection">
          <label>
            <input type="radio" value="student" checked={role === 'student'} onChange={() => setRole('student')} />
            Student
          </label>
          <label>
            <input type="radio" value="teacher" checked={role === 'teacher'} onChange={() => setRole('teacher')} />
            Teacher
          </label>
          {!isSignUp &&
          (   <label>
            <input type="radio" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
            Admin
          </label>)}
       
        </div>

        {isSignUp && role !== 'admin' && (
          <>
            <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </>
        )}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {isSignUp && role !== 'admin' && (
          <>
            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            {role === 'student' && (
              <div className="form-row">
                <input type="text" placeholder="Roll Number" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} />
                <input type="text" placeholder="Branch" value={branch} onChange={(e) => setBranch(e.target.value)} />
                <input type="text" placeholder="Semester" value={semester} onChange={(e) => setSemester(e.target.value)} />
              </div>
            )}

            {role === 'teacher' && (
              <div className="form-row">
                <input type="text" placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
                <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} />
              </div>
            )}
          </>
        )}

        <button onClick={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        {role !== 'admin' && (
          <p className="toggle-text">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? ' Login' : ' Sign Up'}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
