document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".follow-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const userId = event.target.getAttribute("data-id");
      const action = event.target.classList.contains("follow") ? "follow" : "unfollow";

      const response = await fetch(`/api/follow/${action}`, {
        method: action === "follow" ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ following_id: userId }),
      });

      if (response.ok) {
        document.location.reload();
      } else {
        alert(`Failed to ${action} user`);
      }
    });
  });
});


// // function for follow button color and text switch
// // DOES NOT WORK
// const followBtn = document.getElementById('followBtn');

// // Add a click event listener
// followBtn.addEventListener('click', function() {
//   // Add the class 'is-outlined'
//   followBtn.classList.add('is-outlined');

//   // Toggle the button text content
//   if (followBtn.classList.contains('is-outlined')) {
//     followBtn.textContent = `follow '${username}'`;
//   } else {
//     followBtn.textContent = `following '${username}'`;
//   }
// });

