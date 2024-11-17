// utils/checkAuth.js

// Function to validate the token's expiration
export const isTokenValid = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;
  
    try {
      // Decode the token (assuming it's a JWT) and check expiry
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      // Check if the token has expired
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Invalid token format', error);
      return false;
    }
  };
  