import React from 'react';
import { useEditMemberForm } from '../../hooks/useEditMemberForm';

const EditMemberModal = ({ member, onClose, onUpdateMember, onSuccess }) => {
  const { formData, handleInputChange, handleSubmit } = useEditMemberForm(member, onUpdateMember, onSuccess);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Team Member</h2>
        
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
            disabled
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <div className="select-wrapper">
            <select 
              id="role" 
              name="role" 
              value={formData.role}
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

export default EditMemberModal;