// ConfirmDeleteModal.js
import React from 'react';

const ConfirmDeleteModal = ({ show, onClose, onConfirm, testName }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete the test "{testName}"?</p>
        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={onConfirm} className="danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
