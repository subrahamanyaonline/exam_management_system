import React, { useState } from 'react';

function AssignTest() {
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleAssign = () => {
    // Logic to assign the test
    console.log('Test assigned:', selectedTest, 'to class:', selectedClass);
  };

  return (
    <div className="assign-test-page">
      <h2>Assign Test</h2>
      <select onChange={(e) => setSelectedTest(e.target.value)}>
        <option value="">Select Test</option>
        {/* Populate with test options */}
      </select>
      <select onChange={(e) => setSelectedClass(e.target.value)}>
        <option value="">Select Class</option>
        {/* Populate with class options */}
      </select>
      <button onClick={handleAssign}>Assign Test</button>
    </div>
  );
}

export default AssignTest;
