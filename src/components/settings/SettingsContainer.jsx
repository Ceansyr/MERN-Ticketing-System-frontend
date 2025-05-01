import React from 'react';
import ProfileForm from './ProfileForm';
import { useCurrentUserInfo } from '../../hooks/useCurrentUserInfo';
import { useProfileForm } from '../../hooks/useProfileForm';

const SettingsContainer = () => {
  const { currentUser, loading, error: userError, fetchUser } = useCurrentUserInfo();
  const {
    formData,
    passwordStrength,
    error,
    success,
    handleInputChange,
    handleSubmit
  } = useProfileForm(currentUser, fetchUser);

  return (
    <div className="usersetting-container">
      <div className="usersetting-section">
        <h2>Edit Profile</h2>
        
        {loading ? (
          <div className="usersetting-loading">Loading user data...</div>
        ) : userError ? (
          <div className="usersetting-error">{userError}</div>
        ) : (
          <ProfileForm
            formData={formData}
            passwordStrength={passwordStrength}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            error={error}
            success={success}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsContainer;