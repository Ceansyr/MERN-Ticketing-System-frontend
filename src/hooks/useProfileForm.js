import { useState, useEffect } from 'react';
import { updateUserProfile } from '../api/userApi';

export const useProfileForm = (currentUser, fetchUser) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [passwordStrength, setPasswordStrength] = useState('Weak');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        password: '',
        confirmPassword: '',
        phone: currentUser.phone || ''
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength('Weak');
      return;
    }

    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    const strength = [
      hasLowerCase,
      hasUpperCase,
      hasNumbers,
      hasSpecialChars,
      isLongEnough
    ].filter(Boolean).length;

    if (strength <= 2) setPasswordStrength('Weak');
    else if (strength <= 4) setPasswordStrength('Medium');
    else setPasswordStrength('Strong');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      await updateUserProfile(userData);
      setSuccess('Profile updated successfully');
      
      fetchUser();
      
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: ''
      }));
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    }
  };

  return {
    formData,
    passwordStrength,
    error,
    success,
    handleInputChange,
    handleSubmit
  };
};