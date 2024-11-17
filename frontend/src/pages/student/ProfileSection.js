import React, { useState } from "react";
import api from "../../services/api";
import './ProfileSection.css';

// Define the backend URL - you can move this to an environment variable
const BACKEND_URL = process.env.REACT_APP_BACK_URL;

const ProfileSection = ({ studentData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: studentData.fullName || "",
    profession: studentData.profession || "",
    address: studentData.address || "",
    phone: studentData.phone || "",
    profilePicture: studentData.profilePicture || "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to get the complete image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return "/api/placeholder/128/128"; // Default placeholder
    if (imageUrl.startsWith('http')) return imageUrl; // Already complete URL
    if (imageUrl.startsWith('/uploads')) return `${BACKEND_URL}${imageUrl}`; // Append backend URL
    return imageUrl; // Return as is for other cases
  };

  const toggleEdit = () => {
    if (isEditing) {
      setProfileData({
        fullName: studentData.fullName || "",
        profession: studentData.profession || "",
        address: studentData.address || "",
        phone: studentData.phone || "",
        profilePicture: studentData.profilePicture || "",
      });
    }
    setIsEditing(!isEditing);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setProfileImage(file);
      // Create a local preview URL
      const previewUrl = URL.createObjectURL(file);
      setProfileData({
        ...profileData,
        profilePicture: previewUrl,
      });
    } else {
      setErrorMessage("Please select a valid image file.");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", profileData.fullName);
    formData.append("profession", profileData.profession);
    formData.append("address", profileData.address);
    formData.append("phone", profileData.phone);

    if (profileImage) {
      formData.append("profilePicture", profileImage);
    }

    try {
      const response = await api.put(
        `/student/profile/${studentData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Update the profile data with the correct image URL
      setProfileData({
        ...response.data,
        profilePicture: getImageUrl(response.data.profilePicture),
      });
      setIsEditing(false);
      setErrorMessage("");
      
      // Cleanup the temporary preview URL
      if (profileImage) {
        URL.revokeObjectURL(profileData.profilePicture);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    }
  };

  return (
    <div className="profile-section-container fade-in">
      <h2>Profile</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <img
        src={getImageUrl(profileData.profilePicture)}
        alt="Profile"
        className="profile-section-photo"
        
      />
      {/* Rest of your component remains the same */}  
      {!isEditing ? (
        <div className="profile-section-details">
          <p>
            <strong>Name:</strong> {profileData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {studentData.email}
          </p>
          <p>
            <strong>Profession:</strong> {profileData.profession}
          </p>
          <p>
            <strong>Address:</strong> {profileData.address}
          </p>
          <p>
            <strong>Phone:</strong> {profileData.phone}
          </p>
          <button className="profile-section-edit-btn" onClick={toggleEdit}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form
          className="profile-section-edit-form"
          onSubmit={handleSaveProfile}
        >
          <div className="profile-section-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={profileData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="profile-section-form-group">
            <label>Profession</label>
            <input
              type="text"
              name="profession"
              value={profileData.profession}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="profile-section-form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="profile-section-form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="profile-section-form-group">
            <label>Profile Photo</label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="profile-section-save-btn">
            Save Profile
          </button>
          <button
            type="button"
            className="profile-section-cancel-btn"
            onClick={toggleEdit}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileSection;
