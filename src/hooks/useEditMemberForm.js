import { useState, useEffect } from 'react';

export const useEditMemberForm = (member, onUpdateMember, onSuccess) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        id: member.id || member._id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        role: member.role
      });
    }
  }, [member]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.firstName || !formData.email) return;
    
    try {
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role
      };
      
      await onUpdateMember(formData.id, updateData);
      onSuccess();
    } catch (error) {
      console.error('Error updating team member:', error);
    }
  };

  return { formData, handleInputChange, handleSubmit };
};