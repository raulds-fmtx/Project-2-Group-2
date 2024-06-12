document.querySelectorAll(".delete-post-btn").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to delete post.");
    }
  });
});
