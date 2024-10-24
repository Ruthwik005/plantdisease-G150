import React from 'react';

function Profile() {
  const userInfoString = localStorage.getItem('loggedInUser'); // Retrieve user info from localStorage
  let userInfo;

  // Check if userInfoString is not null and parse it
  if (userInfoString) {
    try {
      userInfo = JSON.parse(userInfoString); // Attempt to parse the user info
      console.log(userInfo);
    } catch (error) {
      console.error("Error parsing user info:", error);
      userInfo = null; // If parsing fails, set userInfo to null
    }
  }

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      {userInfo ? (
        <div>
          <p><strong>Username:</strong> {userInfo.username}</p> {/* Access username from the parsed object */}
          {/* Add more user details here */}
        </div>
      ) : (
        <p>No user information available. Please log in.</p>
      )}
    </div>
  );
}

export default Profile;
