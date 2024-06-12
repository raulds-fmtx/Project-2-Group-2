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
