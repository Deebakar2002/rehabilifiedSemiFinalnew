import React from 'react';
import { ClipLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className="spinner-container">
      <ClipLoader color="#4A90E2" loading={true} size={50} />
    </div>
  );
}

export default Spinner;
