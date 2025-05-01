import React from 'react';
import { useAddMemberForm } from '../../hooks/useAddMemberForm';

const AddMemberModal = ({ onClose, onAddMember, onSuccess }) => {
  const { formData, handleInputChange, handleSubmit } = useAddMemberForm(onAddMember, onSuccess);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Team members</h2>
        <p className="modal-description">
          Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.
        </p>
        
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email ID</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email ID"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <div className="select-wrapper">
            <select 
              id="designation" 
              name="designation" 
              value={formData.designation}
              onChange={handleInputChange}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <span className="select-arrow"></span>
          </div>
        </div>
        
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;