import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SettingsComponent.css'; // Include any specific CSS for the settings

const SettingsComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    fullName: '',
    address: '',
    phone: '',
    education: '',
    profilePhoto: '', // URL or file
  });
  const [profilePhotoPreview, setProfilePhotoPreview] = useState('');
  const [message, setMessage] = useState('');

  // Fetch admin profile data on component mount
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store token in localStorage
        const response = await axios.get('/api/admin/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(response.data);
        setProfilePhotoPreview(response.data.profilePhoto); // Set the existing profile photo URL for display
      } catch (error) {
        console.error('Error fetching admin profile:', error);
      }
    };

    fetchAdminProfile();
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPhotoURL = URL.createObjectURL(file); // Preview the selected file
      setProfilePhotoPreview(newPhotoURL);
      setAdminData((prevData) => ({
        ...prevData,
        profilePhoto: file, // Save the file in state for upload
      }));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    setMessage('');

    // Basic validation
    if (!adminData.fullName || !adminData.phone || !adminData.address || !adminData.education) {
      setMessage('Please fill in all the required fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData(); // Prepare FormData for file and text fields

      formData.append('fullName', adminData.fullName);
      formData.append('address', adminData.address);
      formData.append('phone', adminData.phone);
      formData.append('education', adminData.education);

      // Append profile photo only if a new file is selected
      if (adminData.profilePhoto instanceof File) {
        formData.append('profilePhoto', adminData.profilePhoto);
      }

      const response = await axios.put('/api/admin/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Indicate that we are sending a file
        },
      });

      console.log(response);

      setMessage('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode after save
    } catch (error) {
      console.error('Error updating admin profile:', error);
      setMessage('There was an error updating your profile.');
    }
  };

  return (
    <div className="settings-dashboard-card fade-in">
      <h2>Admin Profile</h2>
      <div className="settings-profile">
        {/* Profile Photo */}
        <img
          src={profilePhotoPreview || '/path-to-default-avatar.png'}
          alt="Admin Profile"
          className="settings-profile-photo"
        />

        {/* Profile Details */}
        <h3>{adminData.fullName}</h3>
        <p><strong>Address:</strong> {adminData.address}</p>
        <p><strong>Phone:</strong> {adminData.phone}</p>
        <p><strong>Education:</strong> {adminData.education}</p>

        {/* Message for success/error */}
        {message && <p className="settings-message">{message}</p>}

        {/* Edit Profile Button */}
        {!isEditing && (
          <button className="settings-edit-profile-button" onClick={handleEditToggle}>
            Edit Profile
          </button>
        )}

        {/* Edit Form */}
        {isEditing && (
          <form className="settings-edit-form" onSubmit={handleSaveChanges}>
            {/* Full Name */}
            <div className="settings-form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={adminData.fullName}
                onChange={handleInputChange}
              />
            </div>

            {/* Address */}
            <div className="settings-form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={adminData.address}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone */}
            <div className="settings-form-group">
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={adminData.phone}
                onChange={handleInputChange}
              />
            </div>

            {/* Education */}
            <div className="settings-form-group">
              <label>Education Qualification:</label>
              <input
                type="text"
                name="education"
                value={adminData.education}
                onChange={handleInputChange}
              />
            </div>

            {/* Profile Photo */}
            <div className="settings-form-group">
              <label>Change Profile Photo:</label>
              <input type="file" onChange={handleProfilePhotoChange} />
            </div>

            {/* Form Actions */}
            <div className="settings-form-actions">
              <button type="button" onClick={handleEditToggle}>
                Cancel
              </button>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsComponent;
