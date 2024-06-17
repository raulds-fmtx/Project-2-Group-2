const updateUserPicInput = document.getElementById('updateUserPicInput');
const dashUserPic = document.getElementById('dashUserPic').querySelector('img');

updateUserPicInput.addEventListener('change', async function () {
  const file = updateUserPicInput.files[0];
  const formData = new FormData();
  formData.append('userpic', file);

  try {
    const response = await fetch('/api/users/updateUserPic', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload profile picture.');
    }

    const data = await response.json();

    if (data.success) {
      dashUserPic.src = data.userpicUrl; // Update the profile picture preview
      console.log('User profile picture updated successfully.');
      window.location.reload(); // Reload the page
    } else {
      console.error('Failed to update user profile picture:', data.error);
    }
  } catch (err) {
    console.error('Error updating user profile picture:', err.message);
  }
});