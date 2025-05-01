import { useState } from 'react';

export const useAddMemberForm = (onAddMember, onSuccess) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: 'member'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return;
    
    try {
      await onAddMember(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        designation: 'member'
      });
      onSuccess();
    } catch (error) {
      console.error('Error adding team member:', error);
    }
  };

  return { formData, handleInputChange, handleSubmit };
};