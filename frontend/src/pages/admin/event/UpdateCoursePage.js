// src/pages/admin/courses/UpdateCoursePage.js
import React, { useState } from 'react';
import './UpdateCoursePage.css';

const UpdateCoursePage = ({ course, onUpdateCourse }) => {
  const [title, setTitle] = useState(course?.title || '');
  const [subtitle, setSubtitle] = useState(course?.subtitle || '');
  const [description, setDescription] = useState(course?.description || '');
  const [learningPoints, setLearningPoints] = useState(course?.learningPoints || []);
  const [courseContent, setCourseContent] = useState(course?.content || []);
  const [lectures, setLectures] = useState(course?.lectures || []);
  const [notes, setNotes] = useState(course?.notes || []);
  const [coverPhoto, setCoverPhoto] = useState(course?.coverPhoto || '');

  const handleAddLearningPoint = () => setLearningPoints([...learningPoints, '']);
  const handleAddContentItem = () => setCourseContent([...courseContent, { title: '', subContent: [] }]);
  const handleAddLecture = () => setLectures([...lectures, { title: '', videos: [] }]);
  const handleAddNote = () => setNotes([...notes, '']);

  const handleUpdateCourse = () => {
    const updatedCourse = {
      title,
      subtitle,
      description,
      learningPoints,
      content: courseContent,
      lectures,
      notes,
      coverPhoto,
    };
    onUpdateCourse(updatedCourse);
  };

  return (
    <div className="update-course-page">
      <h2 className="update-course-page__title">Update Course</h2>

      {/* Basic Information Section */}
      <div className="update-course-page__section">
        <label className="update-course-page__label">Course Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        
        <label className="update-course-page__label">Subtitle</label>
        <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        
        <label className="update-course-page__label">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      {/* What You Will Learn Section */}
      <div className="update-course-page__section">
        <h3 className="update-course-page__section-title">What You Will Learn</h3>
        {learningPoints.map((point, index) => (
          <input
            key={index}
            className="update-course-page__input"
            type="text"
            value={point}
            onChange={(e) => {
              const updatedPoints = [...learningPoints];
              updatedPoints[index] = e.target.value;
              setLearningPoints(updatedPoints);
            }}
          />
        ))}
        <button onClick={handleAddLearningPoint}>Add Learning Point</button>
      </div>

      {/* Course Content Section */}
      <div className="update-course-page__section">
        <h3 className="update-course-page__section-title">Course Content</h3>
        {courseContent.map((content, index) => (
          <div key={index} className="update-course-page__content-item">
            <label className="update-course-page__label">Content Title</label>
            <input
              className="update-course-page__input"
              type="text"
              value={content.title}
              onChange={(e) => {
                const updatedContent = [...courseContent];
                updatedContent[index].title = e.target.value;
                setCourseContent(updatedContent);
              }}
            />
            <h4 className="update-course-page__subcontent-title">Sub-Content</h4>
            {content.subContent.map((sub, subIndex) => (
              <input
                key={subIndex}
                className="update-course-page__input"
                type="text"
                value={sub}
                onChange={(e) => {
                  const updatedContent = [...courseContent];
                  updatedContent[index].subContent[subIndex] = e.target.value;
                  setCourseContent(updatedContent);
                }}
              />
            ))}
            <button onClick={() => {
              const updatedContent = [...courseContent];
              updatedContent[index].subContent.push('');
              setCourseContent(updatedContent);
            }}>Add Sub-Content</button>
          </div>
        ))}
        <button onClick={handleAddContentItem}>Add Content Item</button>
      </div>

      {/* Lecture Section */}
      <div className="update-course-page__section">
        <h3 className="update-course-page__section-title">Lectures</h3>
        {lectures.map((lecture, index) => (
          <div key={index} className="update-course-page__lecture-item">
            <label className="update-course-page__label">Lecture Title</label>
            <input
              className="update-course-page__input"
              type="text"
              value={lecture.title}
              onChange={(e) => {
                const updatedLectures = [...lectures];
                updatedLectures[index].title = e.target.value;
                setLectures(updatedLectures);
              }}
            />
            <h4 className="update-course-page__subcontent-title">Lecture Videos</h4>
            {lecture.videos.map((video, videoIndex) => (
              <div key={videoIndex} className="update-course-page__video-item">
                <input
                  className="update-course-page__input"
                  type="text"
                  value={video.description}
                  onChange={(e) => {
                    const updatedLectures = [...lectures];
                    updatedLectures[index].videos[videoIndex].description = e.target.value;
                    setLectures(updatedLectures);
                  }}
                />
              </div>
            ))}
            <button onClick={() => {
              const updatedLectures = [...lectures];
              updatedLectures[index].videos.push({ description: '' });
              setLectures(updatedLectures);
            }}>Add Video</button>
          </div>
        ))}
        <button onClick={handleAddLecture}>Add Lecture</button>
      </div>

      {/* Notes Section */}
      <div className="update-course-page__section">
        <h3 className="update-course-page__section-title">Notes</h3>
        {notes.map((note, index) => (
          <textarea
            key={index}
            className="update-course-page__textarea"
            value={note}
            onChange={(e) => {
              const updatedNotes = [...notes];
              updatedNotes[index] = e.target.value;
              setNotes(updatedNotes);
            }}
          />
        ))}
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      {/* Cover Photo Section */}
      <div className="update-course-page__section">
        <h3 className="update-course-page__section-title">Cover Photo</h3>
        <input
          className="update-course-page__input"
          type="text"
          value={coverPhoto}
          placeholder="Enter cover photo URL"
          onChange={(e) => setCoverPhoto(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <button className="update-course-page__submit-btn" onClick={handleUpdateCourse}>Save Changes</button>
    </div>
  );
};

export default UpdateCoursePage;
