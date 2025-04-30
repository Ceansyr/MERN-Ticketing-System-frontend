import React from 'react';

function UserInfoForm({ userInfo, onChange, onSubmit, settings = {} }) {
  const {
    nameField = true,
    phoneField = true,
    emailField = true,
    buttonText = 'Thank You!'
  } = settings;

  return (
    <div className="chat-message bot">
      <div className="chat-message-avatar"></div>
      <div className="chat-message-content">
        <div className="chat-form">
          <h3>Introduction Yourself</h3>
          <form onSubmit={onSubmit}>
            {nameField && (
              <div className="form-group">
                <label>Your name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={userInfo.name} 
                  onChange={onChange} 
                  placeholder="Your name"
                  required
                />
              </div>
            )}
            {phoneField && (
              <div className="form-group">
                <label>Your Phone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={userInfo.phone} 
                  onChange={onChange} 
                  placeholder="+1 (000) 000-0000"
                  required
                />
              </div>
            )}
            {emailField && (
              <div className="form-group">
                <label>Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={userInfo.email} 
                  onChange={onChange} 
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            )}
            <button type="submit" className="submit-btn">{buttonText}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInfoForm;